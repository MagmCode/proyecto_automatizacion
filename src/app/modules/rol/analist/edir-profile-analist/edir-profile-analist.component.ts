import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/core/auth/auth.service'; 
@Component({
  selector: 'app-edir-profile-analist',
  templateUrl: './edir-profile-analist.component.html',
  styleUrls: ['./edir-profile-analist.component.scss']
})
export class EdirProfileAnalistComponent implements OnInit {
 profileForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.profileForm = this.fb.group({
      first_name: [''],
      last_name: [''],
      email: [''],
      telefono: [''],
      telefono_opcional: [''],
    });
  }

  ngOnInit(): void {
    this.loadUserData();
  }

  loadUserData(): void {
    this.authService.getUserProfile().subscribe(
      (data) => {
        // Precargar los datos en el formulario
        this.profileForm.patchValue({
          first_name: data.first_name,
          last_name: data.last_name,
          email: data.email,
          telefono: data.telefono,
          telefono_opcional: data.telefono_opcional,
        });
      },
      (error) => {
        console.error('Error al cargar los datos del usuario', error);
      }
    );
  }

  onSubmit(): void {
    // if (this.profileForm.valid) {
    //   this.authService.updateUserProfile(this.profileForm.value).subscribe(
    //     (response) => {
    //       console.log('Perfil actualizado correctamente', response);
  
    //       // Actualizar el localStorage con los nuevos datos
    //       const updatedData = this.profileForm.value;
    //       localStorage.setItem('first_name', updatedData.first_name);
    //       localStorage.setItem('last_name', updatedData.last_name);
    //       localStorage.setItem('email', updatedData.email);
    //       localStorage.setItem('telefono', updatedData.telefono);
    //       localStorage.setItem('telefono_opcional', updatedData.telefono_opcional || '');
  
    //       // Actualizar el estado en el AuthService
    //       this.authService.updateUserData(updatedData);
  
    //       alert('Perfil actualizado correctamente');
    //     },
    //     (error) => {
    //       console.error('Error al actualizar el perfil', error);
    //     }
    //   );
    // }
  }
}