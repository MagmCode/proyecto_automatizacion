import { Injectable, NgZone } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";
import { catchError, tap } from "rxjs/operators";
import { BehaviorSubject, Observable, throwError } from "rxjs";
import { Reembolso } from 'src/app/models/reembolso.model';
import { CartaAval } from "src/app/models/carta-aval.model";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private inactivityTimer: any;
  private readonly inactivityDuration = 30 * 60 * 1000; // 5 minutes
  private tokenKey = 'access_token';
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  // URL de conexión
  private apiUrl = "http://180.183.66.248:8000/api/"; // URL de tu API en Django local
  // private apiUrl = "http://127.0.0.1:8000/api/"; // URL de tu API en Django local
  // private apiUrl = 'https://reembolso-backend.onrender.com/api/';  // URL de tu API en Django Producción

  constructor(
    private http: HttpClient,
    private router: Router,
    private _ngZone: NgZone
  ) {
    // Si no existe user, se inicia con un objeto vacío.
    const storedUser = localStorage.getItem('currentUser') || '{}';
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(storedUser));
    this.currentUser = this.currentUserSubject.asObservable();
    this.resetInactivityTimer();
    this.setupActivityListeners();
  }

// En tu AuthService (método login)
// En auth.service.ts

login(username: string, password: string) {
  return this.http.post(`${this.apiUrl}login/`, { username, password }).pipe(
    tap((response: any) => {
      console.log('Respuesta del login:', response); // Debug
      
      localStorage.setItem("access_token", response.access);
      localStorage.setItem("username", response.username);
      localStorage.setItem("first_name", response.first_name);
      localStorage.setItem("last_name", response.last_name);
      localStorage.setItem("tipo_cedula", response.tipo_cedula);
      localStorage.setItem("telefono", response.telefono);
      localStorage.setItem("aseguradora", response.aseguradora);
      localStorage.setItem("nroPoliza", response.nroPoliza);
      localStorage.setItem("rol", response.rol); // Store the role in localStorage
      
      console.log('Datos guardados en localStorage:', { // Debug
        username: localStorage.getItem('username'),
        first_name: localStorage.getItem('first_name'),
        last_name: localStorage.getItem('last_name'),
        tipo_cedula: localStorage.getItem('tipo_cedula'),
        telefono: localStorage.getItem('telefono'),
        aseguradora: localStorage.getItem('aseguradora'),
        nroPoliza: localStorage.getItem('nroPoliza'),
        rol: localStorage.getItem('rol')
      });
      
      // Update the BehaviorSubject
      this.currentUserSubject.next({
        nombreCompleto: `${response.first_name} ${response.last_name}`,
        tipoCedula: response.tipo_cedula,
        cedula: response.username,
        telefono: response.telefono,
        aseguradora: response.aseguradora,
        nroPoliza: response.nroPoliza,
        role: response.rol // Update the role in the BehaviorSubject
      });
    }),
    catchError(this.handleError)
  );
}


  
  private generateSessionId(): string {
    return 'session_' + Math.random().toString(36).substr(2, 9);
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = "Ocurrió un error. Inténtalo de nuevo más tarde.";
    if (error.status === 404) {
      errorMessage = "Usuario no encontrado";
    } else if (error.status === 401) {
      errorMessage = "Contraseña inválida";
    }
    return throwError(errorMessage);
  }

  // Guarda el token y (opcionalmente) el rol
  setSession(token: string, isAdmin: boolean): void {
    localStorage.setItem(this.tokenKey, token);
    localStorage.setItem('is_admin', JSON.stringify(isAdmin));

    // Retrieve the role from localStorage
    const storedRole = localStorage.getItem('rol');

    // Update currentUserSubject with the correct role
    const currentUser = this.currentUserSubject.value || {};
    currentUser.role = storedRole || (isAdmin ? 'admin' : 'client'); // Use stored role if available
    this.currentUserSubject.next(currentUser);
  }

  register(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}register/`, userData).pipe(
      catchError(this.handleError) 
    );
  }

  logout() {
    // Limpia localStorage
    localStorage.clear();
  
    // Actualiza currentUserSubject
    this.currentUserSubject.next(null);
  
    // Realiza la solicitud de logout
    this.http.post<any>(`${this.apiUrl}logout/`, {}).subscribe(
      () => {
        this.router.navigate(["/Login"]);
      },
      (error) => {
        console.error('Error during logout:', error);
        this.router.navigate(["/Login"]);  // Redirige incluso si hay un error
      }
    );
  }

  verifyToken() {
    const token = this.getToken();
    if (!token) {
      return false;
    }
    return this.http.get(`${this.apiUrl}verify-token/`, {
      headers: { Authorization: `Bearer ${token}` },
    }).pipe(
      catchError(() => {
        this.logout();
        return throwError("Token inválido");
      })
    );
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem("access_token");
  }

  isAdmin(): boolean {
    return this.getUserRole() === 'admin';
  }
  
  isAnalist(): boolean {
    return this.getUserRole() === 'analist';
  }

  // Actualizado para usar el BehaviorSubject (currentUserSubject)
  getUserRole(): string {
    const currentUser = this.currentUserSubject.value;
    console.log('Debug: Current user from BehaviorSubject:', currentUser); // Debug
    if (currentUser && currentUser.role) {
      console.log('Debug: Role retrieved from BehaviorSubject:', currentUser.role); // Debug
      return currentUser.role;
    }

    // If not in BehaviorSubject, try localStorage
    const storedRole = localStorage.getItem('rol');
    console.log('Debug: Role retrieved from localStorage:', storedRole); // Debug
    if (storedRole) {
      return storedRole;
    }

    console.warn('Debug: Defaulting to client role'); // Debug
    return 'client';
  }

  getFirstName(): string {
    const currentUser = this.currentUserSubject.value;
    if (currentUser && currentUser.first_name) {
      return currentUser.first_name;
    }
    return '';
  }

  // Retorna el usuario completo (sincrónicamente)
  getUser(): any {
    return this.currentUserSubject.value;
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  getUsername(): string {
    return localStorage.getItem('username') || '';
  }

  getFullName(): string {
    const firstName = localStorage.getItem('first_name') || '';
    const lastName = localStorage.getItem('last_name') || '';
    return `${firstName} ${lastName}`.trim();
  }

  getName(): string {
    return localStorage.getItem('first_name') || '';
  }

  // Métodos basados en localStorage para roles (opcional si se concentra en currentUserSubject)
  getRol(): string {
    return localStorage.getItem("rol") || '';
  }


  isUser(): boolean {
    return this.getRol() === 'cliente';
  }

  getTelefono(): string {
    return localStorage.getItem('telefono') || '';
  }

  getAseguradora(): string {
    return localStorage.getItem('aseguradora') || '';
  }

  getNroPoliza(): string {
    return localStorage.getItem('nroPoliza') || '';
  }

  getTipoCedula(): string {
    return localStorage.getItem('tipo_cedula') || 'V';
  }

  getUserProfile(): Observable<any> {
    const token = this.getToken();
    return this.http.get(`${this.apiUrl}user-profile/`, {
      headers: { Authorization: `Bearer ${token}` },
    }).pipe(
      catchError(this.handleError)
    );
  }

  updateUserData(updatedData: any): void {
    this.currentUserSubject.next(updatedData);
  }

  updateUserProfile(userData: any): Observable<any> {
    const token = this.getToken();
    return this.http.put(`${this.apiUrl}user-profile/`, userData, {
      headers: { Authorization: `Bearer ${token}` },
    }).pipe(
      catchError(this.handleError)
    );
  }

  private resetInactivityTimer() {
    this._ngZone.runOutsideAngular(() => {
      clearTimeout(this.inactivityTimer);
      this.inactivityTimer = setTimeout(() => {
        this._ngZone.run(() => {
          if (this.isLoggedIn()) {
            this.logout();
          }
        });
      }, this.inactivityDuration);
    });
  }

  private setupActivityListeners() {
    window.addEventListener("mousemove", () => this.resetInactivityTimer());
    window.addEventListener("keypress", () => this.resetInactivityTimer());
    window.addEventListener("scroll", () => this.resetInactivityTimer());
    window.addEventListener("click", () => this.resetInactivityTimer());
  }

  // Métodos para Reembolso
  getReembolsos(): Observable<Reembolso[]> {
    const token = this.getToken();
    return this.http.get<Reembolso[]>(`${this.apiUrl}reembolsos/`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  addReembolso(reembolso: FormData): Observable<Reembolso> {
    const token = this.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post<Reembolso>(`${this.apiUrl}reembolsos/`, reembolso, { headers });
  }

  uploadFiles(files: FormData): Observable<any> {
    const token = this.getToken();
    return this.http.post(`${this.apiUrl}upload-files/`, files, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  // Métodos para Carta Aval
  getCartaAval(): Observable<CartaAval[]> {
    const token = this.getToken();
    return this.http.get<CartaAval[]>(`${this.apiUrl}cartaaval/`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  addCartaAval(cartaAval: FormData): Observable<CartaAval> {
    const token = this.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post<CartaAval>(`${this.apiUrl}cartaaval/`, cartaAval, { headers });
  }

  uploadFilesCartaAval(files: FormData): Observable<any> {
    const token = this.getToken();
    return this.http.post(`${this.apiUrl}upload-files/`, files, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }
}
