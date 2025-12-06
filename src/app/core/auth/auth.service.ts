import { Injectable, NgZone } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";
import { catchError, tap } from "rxjs/operators";
import { BehaviorSubject, Observable, throwError } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private inactivityTimer: any;
  private readonly inactivityDuration = 30 * 60 * 1000; // 30 minutos de inactividad
  private tokenKey = 'access_token';
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  // URL de conexión
  // Asegúrate de que environment.apiUrl sea 'http://localhost:8085/api/'
  private apiUrl = `${environment.apiUrl}`; 

  constructor(
    private http: HttpClient,
    private router: Router,
    private _ngZone: NgZone
  ) {
    const storedUser = localStorage.getItem('currentUser') || '{}';
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(storedUser));
    this.currentUser = this.currentUserSubject.asObservable();
    this.resetInactivityTimer();
    this.setupActivityListeners();
  }

  // --- MÉTODOS DE AUTENTICACIÓN ---

  login(username: string, password: string) {
    return this.http.post(`${this.apiUrl}auth/login/`, { username, password }).pipe(
      tap((response: any) => {
        // Guarda los tokens
        localStorage.setItem("access_token", response.access);
        localStorage.setItem("refresh_token", response.refresh);
        
        // Obtiene y guarda los datos del usuario
        this.getUserProfile().subscribe(profile => {
          localStorage.setItem("username", profile.username);
          localStorage.setItem("first_name", profile.first_name || '');
          localStorage.setItem("last_name", profile.last_name || '');
          localStorage.setItem("rol", profile.rol);
          
          const userPayload = {
            username: profile.username,
            firstName: profile.first_name,
            lastName: profile.last_name,
            rol: profile.rol
          };

          localStorage.setItem('currentUser', JSON.stringify(userPayload));
          this.currentUserSubject.next(userPayload);
        });
      }),
      catchError(this.handleError)
    );
  }

  logout(): Observable<any> {
    const refreshToken = localStorage.getItem('refresh_token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('access_token')}`
    });
    
    // Limpieza local inmediata
    this.logoutSync();
    
    // Intento de invalidación en servidor
    return this.http.post(`${this.apiUrl}auth/logout/`, { refresh: refreshToken }, {headers}).pipe(
      tap(() => {
        this.router.navigate(['/auth/login']);
      }),
      catchError(error => {
        console.error('Error durante logout:', error);
        this.router.navigate(['/auth/login']); 
        return throwError(error);
      })
    );
  }

  // Logout síncrono para limpieza local
  logoutSync(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('currentUser');
    localStorage.removeItem('username');
    localStorage.removeItem('first_name');
    localStorage.removeItem('last_name');
    localStorage.removeItem('rol');
    this.currentUserSubject.next(null);
  }

  // --- MÉTODOS DE USUARIOS Y PERFILES ---

  /**
   * Crea un nuevo usuario en el sistema.
   * Endpoint: POST /api/usuarios/
   */
  registerUser(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}usuarios/`, userData, {
      headers: this.getAuthHeaders()
    });
  }

  /**
   * Obtiene el perfil del usuario autenticado.
   * Endpoint: GET /api/usuarios/perfil/
   */
  getUserProfile(): Observable<any> {
    return this.http.get(`${this.apiUrl}usuarios/perfil/`, {
      headers: this.getAuthHeaders()
    });
  }

  /**
   * Actualiza el perfil del usuario autenticado.
   * Endpoint: PATCH /api/usuarios/perfil/
   */
  updateUserProfile(data: any): Observable<any> {
    return this.http.patch(`${this.apiUrl}usuarios/perfil/`, data, {
      headers: this.getAuthHeaders()
    });
  }

  /**
   * Actualiza los datos locales del usuario (BehaviorSubject y LocalStorage)
   * para reflejar cambios en la UI sin recargar.
   */
  updateUserData(data: any) {
    if (data.first_name) localStorage.setItem('first_name', data.first_name);
    if (data.last_name) localStorage.setItem('last_name', data.last_name);
    if (data.email) localStorage.setItem('email', data.email);

    const currentUser = this.currentUserSubject.value;
    const updatedUser = { 
        ...currentUser, 
        ...data,
        firstName: data.first_name || currentUser.firstName,
        lastName: data.last_name || currentUser.lastName
    };
    
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    this.currentUserSubject.next(updatedUser);
  }

  // --- UTILIDADES Y ROLES ---

  isAdmin(): boolean {
    return this.getUserRole() === 'admin';
  }

  isAnalista(): boolean {
    return this.getUserRole() === 'analista';
  }

  getUserRole(): string {
    const currentUser = this.currentUserSubject.value;
    return currentUser?.rol || localStorage.getItem('rol') || '';
  }

  private getAuthHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = "Error en la autenticación";
    if (error.status === 400) {
      errorMessage = "Credenciales incorrectas";
    } else if (error.status === 401) {
      errorMessage = "Sesión expirada";
    } else if (error.status >= 500) {
      errorMessage = "Error en el servidor";
    }
    return throwError(errorMessage);
  }

  // --- MANEJO DE INACTIVIDAD ---

  private resetInactivityTimer() {
    clearTimeout(this.inactivityTimer);
    this.inactivityTimer = setTimeout(() => {
      if (this.isLoggedIn()) {
        this.logoutSync(); // Usar versión síncrona para forzar salida
        this.router.navigate(['/auth/login'], { queryParams: { sessionExpired: true } });
      }
    }, this.inactivityDuration);
  }

  private setupActivityListeners() {
    ['mousemove', 'keypress', 'scroll', 'click'].forEach(event => {
      window.addEventListener(event, () => this.resetInactivityTimer());
    });
  }
}