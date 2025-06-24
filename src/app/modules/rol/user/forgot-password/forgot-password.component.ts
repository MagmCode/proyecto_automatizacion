import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, QueryList, ViewChildren } from "@angular/core";
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatStepper } from '@angular/material/stepper';

@Component({
  selector: "app-forgot-password",
  templateUrl: "./forgot-password.component.html",
  styleUrls: ["./forgot-password.component.scss"],
})
export class ForgotPasswordComponent implements OnInit {
  recoveryForm!: FormGroup;
  passwordForm!: FormGroup;
  hide = true;
  hide2 = true;
  isLoading = false;

  @ViewChildren('inputField') inputFields!: QueryList<any>;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _snackBar: MatSnackBar,
    private http: HttpClient
  ) {}

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  ngOnInit(): void {
    this.recoveryForm = this.fb.group({
      cedula: new FormControl("", Validators.required),
      email: new FormControl("", [Validators.required, Validators.email]),
    });

    this.passwordForm = this.fb.group({
      newPassword: new FormControl("", Validators.required),
      confirmPassword: new FormControl("", Validators.required),
    });
  }

  onSubmit(stepper: MatStepper) {
    const cedulaControl = this.recoveryForm.get("cedula");
    const emailControl = this.recoveryForm.get("email");

    if (this.recoveryForm.valid && this.validateEmail(emailControl?.value)) {
      const requestData = {
        cedula: cedulaControl?.value,
        email: emailControl?.value
      };

      // console.log('Datos enviados al backend:', requestData); // Log para depuración

      // Configura los encabezados de la solicitud
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      };

      this.http.post('http://localhost:8000/api/validate-cedula-email/', requestData, httpOptions)
        .subscribe(
          (response: any) => {
            if (response.valid) {
              stepper.next(); // Avanzar al siguiente paso
            } else {
              if (response.error === 'Usuario no registrado') {
                cedulaControl?.setErrors({ notRegistered: true });
              } else if (response.error === 'Correo incorrecto') {
                emailControl?.setErrors({ emailMismatch: true });
              } else {
                this._snackBar.open("Error en la validación", "Cerrar", {
                  duration: 3000,
                });
              }
            }
          },
          (error) => {
            console.error('Error en la solicitud:', error); // Log del error
            if (error.status === 400) {
              // Manejar errores específicos del backend
              if (error.error.error === 'Usuario no registrado') {
                cedulaControl?.setErrors({ notRegistered: true });
              } else if (error.error.error === 'Correo incorrecto') {
                emailControl?.setErrors({ emailMismatch: true });
              } else {
                this._snackBar.open("Error en la validación", "Cerrar", {
                  duration: 3000,
                });
              }
            } else {
              this._snackBar.open("Error en el servidor", "Cerrar", {
                duration: 3000,
              });
            }
          }
        );
    } else {
      if (emailControl) {
        emailControl.markAsTouched();
      }
    }
  }

  ngAfterViewInit() {
    this.inputFields.forEach(input =>{
      input.nativeElement.addEventListener('copy', this.disableCopyPaste);
      input.nativeElement.addEventListener('paste', this.disableCopyPaste);
      input.nativeElement.addEventListener('cut', this.disableCopyPaste);
    });
  }

  disableCopyPaste(event: Event): void {
    event.preventDefault();
  }

  onPasswordSubmit() {
    const newPassword = this.passwordForm.get("newPassword");
    const confirmPassword = this.passwordForm.get("confirmPassword");
  
    // Verifica si las contraseñas coinciden
    if (newPassword?.value !== confirmPassword?.value) {
      newPassword?.setErrors({ passwordMismatch: true });
      confirmPassword?.setErrors({ passwordMismatch: true });
      return; // Detiene la ejecución si las contraseñas no coinciden
    }
  
    // Si las contraseñas coinciden, procede con la actualización
    if (this.passwordForm.valid) {
      this.isLoading = true;
      const cedulaControl = this.recoveryForm.get("cedula");
      this.http.post('http://localhost:8000/api/update-password/', {
        cedula: cedulaControl?.value,
        newPassword: newPassword?.value
      }).subscribe(
        (response: any) => {
          this.isLoading = false;
          if (response.success) {
            this._snackBar.open("Contraseña Actualizada", "cerrar", {
              duration: 3000,
            });
            this.router.navigate(["/Login"]);
          } else {
            // Manejar errores específicos del backend
            if (response.error === 'La nueva contraseña no puede ser igual a la actual') {
              this._snackBar.open("La nueva contraseña no puede ser igual a la actual", "Cerrar", {
                duration: 3000,
              });
            } else {
              this._snackBar.open("Error al actualizar la contraseña", "Cerrar", {
                duration: 3000,
              });
            }
          }
        },
        (error) => {
          this.isLoading = false;
          console.error('Error en la solicitud:', error);
          if (error.status === 400 && error.error.error === 'La nueva contraseña no puede ser igual a la actual') {
            // Mostrar snack bar si la nueva contraseña es igual a la actual
            this._snackBar.open("La nueva contraseña no puede ser igual a la actual", "Cerrar", {
              duration: 3000,
            });
          } else {
            // Mostrar error genérico solo si no es el error específico
            this._snackBar.open("Error en el servidor", "Cerrar", {
              duration: 3000,
            });
          }
        }
      );
    } else {
      this.passwordForm.markAllAsTouched();
    }
  
  }

  validateEmail(email: string | null): boolean {
    if (!email) return false;
    const emailPattern = /^[^@]+@[^@]+\.[^@]+$/;
    return emailPattern.test(email);
  }

  togglePasswordVisibility() {
    this.hide = !this.hide;
  }

  togglePasswordVisibility2() {
    this.hide2 = !this.hide2;
  }

  getErrorMessage(controlName: string) {
    const control =
      this.recoveryForm.get(controlName) || this.passwordForm.get(controlName);
    if (control?.hasError("required")) {
      return "Por favor rellene el campo";
    } else if (controlName === "email" && control?.hasError("email")) {
      return "Correo no válido";
    } else if (controlName === "email" && control?.hasError("emailMismatch")) {
      return "Correo incorrecto";
    } else if (controlName === "cedula" && control?.hasError("notRegistered")) {
      return "Usuario no registrado";
    } else if (
      controlName === "newPassword" &&
      control?.value !== this.passwordForm.get("confirmPassword")?.value
    ) {
      return "Las contraseñas no coinciden";
    }
    return "";
  }

  signIn() {
    this.router.navigate(["/Login"]);
  }

  forgotPassword() {
    this.router.navigate(["/forgot-password"]);
  }
}