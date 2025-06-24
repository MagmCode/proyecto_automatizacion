import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service'; 

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  changePasswordForm: FormGroup;
  hideCurrentPassword = true;
  hideNewPassword = true;
  hideConfirmPassword = true;
  isLoading = false;
  username: string | null = null; // Variable para almacenar el username del usuario logeado

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private snackBar: MatSnackBar,
    private router: Router,
    private authService: AuthService // Inyecta el servicio de autenticación
  ) {
    this.changePasswordForm = this.fb.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });
  }

  ngOnInit(): void {
    // Obtener el username del usuario logeado
    this.username = this.authService.getUsername(); // Asegúrate de que el servicio tenga un método para obtener el username
  }

  // Validador personalizado para verificar que las contraseñas coincidan
  passwordMatchValidator(formGroup: FormGroup) {
    const newPassword = formGroup.get('newPassword')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;

    if (newPassword !== confirmPassword) {
      formGroup.get('confirmPassword')?.setErrors({ passwordMismatch: true });
    } else {
      formGroup.get('confirmPassword')?.setErrors(null);
    }
  }

  onSubmit() {
    if (this.changePasswordForm.invalid) {
      return;
    }

    const { currentPassword, newPassword, confirmPassword } = this.changePasswordForm.value;

    // Verificar si las contraseñas nuevas coinciden
    if (newPassword !== confirmPassword) {
      this.changePasswordForm.get('confirmPassword')?.setErrors({ passwordMismatch: true });
      this.snackBar.open("Las contraseñas no coinciden", "Cerrar", {
        duration: 3000,
      });
      return;
    }

    this.isLoading = true;

    // Datos que se envían al backend
    const requestData = {
      cedula: this.username, // Usar el username del usuario logeado
      currentPassword: currentPassword,
      newPassword: newPassword
    };

    console.log('Datos enviados al backend:', requestData); // Log para depuración

    // Configura los encabezados de la solicitud
    const token = localStorage.getItem('token'); // Obtener el token del localStorage
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` // Agregar el token de autenticación
      })
    };

    // Enviar la solicitud al backend
    this.http.post('http://localhost:8000/api/update-password/', requestData, httpOptions)
      .subscribe(
        (response: any) => {
          this.isLoading = false;
          if (response.success) {
            this.snackBar.open("Contraseña actualizada correctamente", "Cerrar", {
              duration: 3000,
            });
            this.router.navigate(["/user/home-page"]);
          } else {
            // Manejar errores específicos del backend
            if (response.error === 'La nueva contraseña no puede ser igual a la actual') {
              this.changePasswordForm.get('newPassword')?.setErrors({ sameAsCurrent: true });
              // this.snackBar.open("La nueva contraseña no puede ser igual a la actual", "Cerrar", {
              //   duration: 3000,
              // });
            } else if (response.error === 'Contraseña actual incorrecta') {
              this.changePasswordForm.get('currentPassword')?.setErrors({ incorrectPassword: true });
              // this.snackBar.open("Contraseña actual incorrecta", "Cerrar", {
              //   duration: 3000,
              // });
            } else {
              this.snackBar.open("Error al actualizar la contraseña", "Cerrar", {
                duration: 3000,
              });
            }
          }
        },
        (error) => {
          this.isLoading = false;
          console.error('Error en la solicitud:', error);
          if (error.status === 400 && error.error.error === 'La nueva contraseña no puede ser igual a la actual') {
            this.changePasswordForm.get('newPassword')?.setErrors({ sameAsCurrent: true });
            // this.snackBar.open("La nueva contraseña no puede ser igual a la actual", "Cerrar", {
            //   duration: 3000,
            // });
          } else if (error.status === 400 && error.error.error === 'Contraseña actual incorrecta') {
            this.changePasswordForm.get('currentPassword')?.setErrors({ incorrectPassword: true });
            // this.snackBar.open("Contraseña actual incorrecta", "Cerrar", {
            //   duration: 3000,
            // });
          } else {
            this.snackBar.open("Error en el servidor", "Cerrar", {
              duration: 3000,
            });
          }
        }
      );
  }

  getErrorMessage(controlName: string) {
    const control = this.changePasswordForm.get(controlName);
    if (control?.hasError('required')) {
      return 'Este campo es requerido';
    } else if (control?.hasError('minlength')) {
      return 'La contraseña debe tener al menos 6 caracteres';
    } else if (control?.hasError('passwordMismatch')) {
      return 'Las contraseñas no coinciden';
    } else if (control?.hasError('sameAsCurrent')) {
      return 'La nueva contraseña no puede ser igual a la actual';
    } else if (control?.hasError('incorrectPassword')) {
      return 'Contraseña actual incorrecta';
    }
    return '';
  }
}