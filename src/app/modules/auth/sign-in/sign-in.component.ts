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
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, this.noExponentNotation]],
      password: ['', Validators.required]
    });

    this.username = this.loginForm.get('username') as FormControl;
    this.password = this.loginForm.get('password') as FormControl;
  }

  noExponentNotation(control: AbstractControl): { [key: string]: boolean } | null {
    const value = control.value;
    if (value && value.toString().toLowerCase().includes('e')) {
      return { 'noExponentNotation': true };
    }
    return null;
  }

  // login.component.ts
// Método para manejar el envío del formulario de inicio de sesión
onSubmit() {
  // // Marca todos los campos como "touched" para forzar la validación
  // this.loginForm.markAllAsTouched();

  // // Si el formulario no es válido, no continúes
  // if (this.loginForm.invalid) {
  //   return;
  // }

  // // Si el formulario es válido, procede con el inicio de sesión
  // this.isLoading = true;

  // const { username, password } = this.loginForm.value;

  // this.authService.login(username, password).subscribe(
  //   (response: any) => {
  //     this.isLoading = false;
  //     const token = response.access;
  //     const rol = response.rol;  // Obtener el rol del usuario

  //     // Guardar el token y el rol en la sesión
  //     this.authService.setSession(token, rol === 'admin');

  //     // Redirigir según el rol del usuario
  //     if (rol === 'admin') {
  //       this.router.navigate(['/admin/dashboard']);
  //     } else if (rol === 'analista') {
  //       this.router.navigate(['/analist/home-page']);
  //     } else if (rol === 'cliente') {
  //       this.router.navigate(['/user/home-page']);
  //     } else {
  //       this.router.navigate(['/Login']); // Redirigir a login si el rol no es válido
  //     }
  //   },
  //   (error) => {
  //     this.isLoading = false;
  //     this.showSnackBar(error);
  //   }
  // );

  localStorage.setItem('access_token', 'fake-token');
  localStorage.setItem('rol', 'admin');
  this.authService.updateUserData({ role: 'admin' });
  this.router.navigate(['/admin/dashboard']);
}



ngAfterViewInit() {
  this.inputFields.forEach(input => {
    input.nativeElement.addEventListener('copy', this.disableCopyPaste);
    input.nativeElement.addEventListener('paste', this.disableCopyPaste);
    input.nativeElement.addEventListener('cut', this.disableCopyPaste);
  });
}

disableCopyPaste(event: Event): void {
  event.preventDefault();
}

  

  showSnackBar(message: string) {
    this._snackBar.open(message, 'Cerrar', {
      duration: 5000,  // Duración del mensaje en milisegundos (5 segundos)
      horizontalPosition: 'center',  // Posición horizontal
      verticalPosition: 'bottom',    // Posición vertical
      panelClass: ['error-snackbar']  // Clase CSS personalizada (opcional)
    });
  }

  
  togglePasswordVisibility() {
    this.hide = !this.hide;
  }

  getErrorMessage(controlName: string): string {
    const control = this.loginForm.get(controlName);
  
    if (control?.hasError('required')) {
      return 'Este campo es requerido.';
    }
  
    if (controlName === 'username' && control?.hasError('noExponentNotation')) {
      return 'No se permite la notación científica (e).';
    }
  
    return 'Campo inválido';
  }


  signUp() {
    this.router.navigate(['/sign-up']);
  }

  forgotPassword(){
    this.router.navigate(['/forgot-password'])
  }
  
}