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

  // URL de conexión - ajusta según tu entorno
  private apiUrl = `${environment.apiUrl}`; // Desarrollo local
  // private apiUrl = "http://tu-servidor-produccion:8000/api/"; // Producción

  // Logout sin Observable, para usar desde el interceptor
  logoutSync(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
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

  // Método de login adaptado para tu sistema
  login(username: string, password: string) {
    return this.http.post(`${this.apiUrl}auth/login/`, { username, password }).pipe(
      tap((response: any) => {
        // Guarda el token JWT
        localStorage.setItem("access_token", response.access);
        localStorage.setItem("refresh_token", response.refresh);
        
        // Obtiene y guarda los datos del usuario
        this.getUserProfile().subscribe(profile => {
          localStorage.setItem("username", profile.username);
          localStorage.setItem("first_name", profile.first_name || '');
          localStorage.setItem("last_name", profile.last_name || '');
          localStorage.setItem("rol", profile.rol);
          
          // Actualiza el BehaviorSubject
          this.currentUserSubject.next({
            username: profile.username,
            firstName: profile.first_name,
            lastName: profile.last_name,
            rol: profile.rol
          });
        });
      }),
      catchError(this.handleError)
    );
  }

  // Manejo de errores mejorado
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

  // Método de logout
logout(): Observable<any> {
  const refreshToken = localStorage.getItem('refresh_token');
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('access_token')}`  // ¡Token en header!
  });
  
  // Limpiar tokens locales primero
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
  localStorage.removeItem('currentUser');
  
  // Opcional: Invalida el token en el backend
  return this.http.post(`${this.apiUrl}auth/logout/`, { refresh: refreshToken }, {headers}).pipe(
    tap(() => {
      // Redirigir después de logout
      this.router.navigate(['/auth/login']);
    }),
    catchError(error => {
      console.error('Error durante logout:', error);
      this.router.navigate(['/auth/login']);  // Redirigir incluso si hay error
      return throwError(error);
    })
  );
}

  // Métodos de verificación de roles
  isAdmin(): boolean {
    return this.getUserRole() === 'admin';
  }

  isAnalista(): boolean {
    return this.getUserRole() === 'analista';
  }

  // Obtiene el rol del usuario
  getUserRole(): string {
    const currentUser = this.currentUserSubject.value;
    return currentUser?.rol || localStorage.getItem('rol') || '';
  }

  // Obtiene información del usuario
  getUserProfile(): Observable<any> {
    return this.http.get(`${this.apiUrl}usuarios/perfil/`, {
      headers: this.getAuthHeaders()
    });
  }

  // Headers de autenticación
  private getAuthHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  // Métodos auxiliares
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  // Manejo de inactividad
  private resetInactivityTimer() {
    clearTimeout(this.inactivityTimer);
    this.inactivityTimer = setTimeout(() => {
      if (this.isLoggedIn()) {
        this.logout();
        this.router.navigate(['/login'], { queryParams: { sessionExpired: true } });
      }
    }, this.inactivityDuration);
  }

  private setupActivityListeners() {
    ['mousemove', 'keypress', 'scroll', 'click'].forEach(event => {
      window.addEventListener(event, () => this.resetInactivityTimer());
    });
  }
}