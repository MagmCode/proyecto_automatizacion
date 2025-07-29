import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service';
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  loginForm!: FormGroup;
  username!: FormControl;
  password!: FormControl;
  hide = true;
  errorMessage: string | null = null;
  isLoading = false;

  @ViewChildren('inputField') inputFields!: QueryList<any>;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private _snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.loginForm = this.fb.group({
      username: ['', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(10),
        this.onlyNumbersValidator
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(6)
      ]]
    });

    this.username = this.loginForm.get('username') as FormControl;
    this.password = this.loginForm.get('password') as FormControl;
  }

  // Validador personalizado para solo números (cédula)
  onlyNumbersValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const value = control.value;
    if (value && !/^\d+$/.test(value)) {
      return { 'onlyNumbers': true };
    }
    return null;
  }

  // Método para manejar el envío del formulario
  onSubmit(): void {
    this.loginForm.markAllAsTouched();

    if (this.loginForm.invalid) {
      return;
    }

    this.isLoading = true;
    this.errorMessage = null;

    const { username, password } = this.loginForm.value;

    this.authService.login(username, password).subscribe({
      next: () => {
        this.isLoading = false;
        
        // Redirigir según el rol
        if (this.authService.isAdmin()) {
          this.router.navigate(['/admin/dashboard']);
        } else if (this.authService.isAnalista()) {
          this.router.navigate(['/analist/home-page']);
        } else {
          this.router.navigate(['/acceso-denegado']);
        }
      },
      error: (error) => {
        this.isLoading = false;
        this.handleLoginError(error);
      }
    });
  }

  // Manejo de errores de login
  private handleLoginError(error: any): void {
    let errorMessage = "Error en el inicio de sesión";
    
    if (error.includes("Credenciales incorrectas")) {
      errorMessage = "Cédula o contraseña incorrectos";
    } else if (error.includes("Sesión expirada")) {
      errorMessage = "Sesión expirada, por favor ingrese nuevamente";
    }

    this.showSnackBar(errorMessage);
  }

  // Mostrar notificación
  showSnackBar(message: string): void {
    this._snackBar.open(message, 'Cerrar', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass: ['error-snackbar']
    });
  }

  // Alternar visibilidad de contraseña
  togglePasswordVisibility(): void {
    this.hide = !this.hide;
  }

  // Mensajes de error para formularios
  getErrorMessage(controlName: string): string {
    const control = this.loginForm.get(controlName);

    if (control?.hasError('required')) {
      return 'Este campo es requerido';
    }

    if (controlName === 'username') {
      if (control?.hasError('minlength') || control?.hasError('maxlength')) {
        return 'La cédula debe tener entre 6 y 10 dígitos';
      }
      if (control?.hasError('onlyNumbers')) {
        return 'Solo se permiten números';
      }
    }

    if (controlName === 'password' && control?.hasError('minlength')) {
      return 'La contraseña debe tener al menos 6 caracteres';
    }

    return '';
  }

  // Navegación
  forgotPassword(): void {
    this.router.navigate(['/forgot-password']);
  }

  // Prevenir copiar/pegar en campos
  ngAfterViewInit(): void {
    this.inputFields.forEach(input => {
      input.nativeElement.addEventListener('copy', this.disableCopyPaste);
      input.nativeElement.addEventListener('paste', this.disableCopyPaste);
      input.nativeElement.addEventListener('cut', this.disableCopyPaste);
    });
  }

  disableCopyPaste(event: Event): void {
    event.preventDefault();
  }
}