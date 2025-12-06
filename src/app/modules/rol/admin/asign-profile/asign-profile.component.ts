import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-asign-profile',
  templateUrl: './asign-profile.component.html',
  styleUrls: ['./asign-profile.component.scss']
})
export class AsignProfileComponent implements OnInit {

  asignForm: FormGroup;
  hidePassword: boolean = true;

  // Lista de roles disponibles
  roles = [
    { value: 'admin', viewValue: 'Administrador' },
    { value: 'analista', viewValue: 'Analista' } 
  ];

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router
  ) { 
    this.asignForm = this.fb.group({
      codigoUsuario: ['', Validators.required], // Cédula (username)
      rol: ['', Validators.required],
      nombrePerfil: ['', Validators.required],  // Nombre (first_name)
      clave: ['', [Validators.required, Validators.minLength(6)]],
      // email: ['', [Validators.email]] // Opcional si tu modelo lo requiere
    });
  }

  ngOnInit(): void {
  }

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }

  onSubmit(): void {
    if (this.asignForm.invalid) {
      this.snackBar.open('Por favor completa todos los campos requeridos', 'Cerrar', { duration: 3000 });
      return;
    }

    // Mapeamos los datos del formulario a lo que espera Django (UserSerializer)
    const formData = this.asignForm.value;
    const userPayload = {
      username: formData.codigoUsuario, // La cédula es el username
      first_name: formData.nombrePerfil, // El nombre de perfil es el first_name
      password: formData.clave,
      rol: formData.rol,
      email: `${formData.codigoUsuario}@seguros.com`, // Generamos un email dummy si es obligatorio en BD
      is_active: true
    };

    this.authService.registerUser(userPayload).subscribe({
      next: (response) => {
        this.snackBar.open('Usuario creado exitosamente', 'Cerrar', { duration: 3000 });
        // Opcional: limpiar formulario o redirigir
        this.asignForm.reset();
        // this.router.navigate(['/admin/home']); 
      },
      error: (error) => {
        console.error('Error al crear usuario:', error);
        let mensaje = 'Error al crear usuario';
        
        // Manejo básico de errores de validación del backend (ej. usuario ya existe)
        if (error.error && error.error.username) {
          mensaje = 'El código de usuario (cédula) ya existe.';
        }
        
        this.snackBar.open(mensaje, 'Cerrar', { duration: 5000 });
      }
    });
  }
}