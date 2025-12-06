import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/auth/auth.service'; 
import { MatSnackBar } from '@angular/material/snack-bar'; // Importar para mensajes más bonitos

@Component({
  selector: 'app-edit-profile-admin',
  templateUrl: './edit-profile-admin.component.html',
  styleUrls: ['./edit-profile-admin.component.scss']
})
export class EditProfileAdminComponent implements OnInit {
  profileForm: FormGroup;

  constructor(
    private fb: FormBuilder, 
    private authService: AuthService,
    private snackBar: MatSnackBar // Inyectar SnackBar
  ) {
    this.profileForm = this.fb.group({
      first_name: ['', Validators.required], // Es bueno agregar validadores
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefono: [''],
      // telefono_opcional: [''], // Asegúrate que tu backend acepte este campo si lo envías
    });
  }

  ngOnInit(): void {
    this.loadUserData();
  }

  loadUserData(): void {
    this.authService.getUserProfile().subscribe({
      next: (data) => {
        this.profileForm.patchValue({
          first_name: data.first_name,
          last_name: data.last_name,
          email: data.email,
          telefono: data.telefono,
          // telefono_opcional: data.telefono_opcional,
        });
      },
      error: (error) => {
        console.error('Error al cargar los datos del usuario', error);
      }
    });
  }

  onSubmit(): void {
    if (this.profileForm.invalid) {
      this.snackBar.open('Por favor verifica los campos requeridos', 'Cerrar', { duration: 3000 });
      return;
    }

    // 1. Preguntar confirmación
    if (confirm('¿Estás seguro de que deseas actualizar tu perfil?')) {
      
      const formValues = this.profileForm.value;

      // 2. Llamar al servicio para actualizar en Backend
      this.authService.updateUserProfile(formValues).subscribe({
        next: (response) => {
          console.log('Perfil actualizado en servidor:', response);

          // 3. Actualizar datos locales para reflejar cambios automáticamente (Header, etc.)
          this.authService.updateUserData(formValues);

          this.snackBar.open('Perfil actualizado correctamente', 'Cerrar', { duration: 3000 });
        },
        error: (error) => {
          console.error('Error al actualizar el perfil', error);
          this.snackBar.open('Error al actualizar el perfil', 'Cerrar', { duration: 3000 });
        }
      });
    }
  }
}