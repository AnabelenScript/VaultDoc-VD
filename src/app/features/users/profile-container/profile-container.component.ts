import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../../core/services/user/user_service';
import { AlertService } from '../../../core/services/alerts/alerts';
@Component({
  selector: 'app-profile-container',
  templateUrl: './profile-container.component.html',
  styleUrl: './profile-container.component.css'
})
export class ProfileContainerComponent implements OnInit {
  showRecentFiles = true;
  showGenerateOptions = true;
  profileData: any = {};
  editMode = false;
  originalData: any = {};
  showPassword = false;


  constructor(
    private profileService: ProfileService,
    private alertService: AlertService 
) {}

  ngOnInit(): void {
  this.profileService.getProfile().subscribe({
    next: (response) => {
      this.profileData = {
        ...response.user,
        password: '••••••••••••••••••••••••' 
      };
      this.originalData = { ...this.profileData }; 
    },
    error: (err) => {
      console.error('Error al obtener perfil:', err);
    }
  });
}

  toggleEdit(): void {
    this.editMode = true;
    if (this.profileData.password === '••••••••••••••••••••••••') {
    this.profileData.password = '';
    }
  }

  cancelEdit(): void {
    this.profileData = { ...this.originalData };
    this.editMode = false;
    this.showPassword = false;
  }

  saveChanges(): void {
  const passwordToSend =
    this.profileData.password === '••••••••••••••••••••••••' ? '' : this.profileData.password;

  const payload = {
    nombre: this.profileData.nombre,
    apellidos: this.profileData.apellidos,
    email: this.profileData.email,
    password: passwordToSend,
  };

  this.profileService.updateProfile(payload).subscribe({
    next: () => {
      this.editMode = false;
      this.profileData.password = '••••••••••••••••••••••••';
      this.originalData = { ...this.profileData };

      this.alertService.success('Tu perfil ha sido actualizado correctamente.');
    },
    error: (err) => {
      console.error('Error al actualizar perfil:', err);
      this.alertService.error('Hubo un problema al actualizar tu perfil. Intenta nuevamente.');
    },
  });
}
  toggleRecentFiles() {
    this.showRecentFiles = !this.showRecentFiles;
  }

  toggleGenerateOptions() {
    this.showGenerateOptions = !this.showGenerateOptions;
  }
}
