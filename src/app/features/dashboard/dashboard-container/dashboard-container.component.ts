import { Component, OnInit } from '@angular/core';
import { UserData } from '../../../core/services/auth/auth_model';
import { FolderServices } from '../../../core/services/folders/folders_service';
import { FolderData } from '../../../core/services/folders/folders_model';


@Component({
  selector: 'app-dashboard-container',
  templateUrl: './dashboard-container.component.html',
  styleUrl: './dashboard-container.component.css'
})
export class DashboardContainerComponent implements OnInit {
  id_rol: number = 1

  constructor(private folderService: FolderServices) {}

  recentFolders: FolderData[] = [];


  recentFiles = [
    { 
      name: 'Constancia_DG_2025', 
      lastModified: '30 de Jun', 
      creationDate: '24 de Jun', 
      type: 'PDF' 
    },
    { 
      name: 'Constancia_DG_2025', 
      lastModified: '30 de Jun', 
      creationDate: '24 de Jun', 
      type: 'PDF' 
    },
    { 
      name: 'Constancia_DG_2025', 
      lastModified: '30 de Jun', 
      creationDate: '24 de Jun', 
      type: 'PNG' 
    },
    { 
      name: 'Constancia_DG_2025', 
      lastModified: '30 de Jun', 
      creationDate: '24 de Jun', 
      type: 'PDF' 
    },
    { 
      name: 'Constancia_DG_2025', 
      lastModified: '30 de Jun', 
      creationDate: '24 de Jun', 
      type: 'PNG' 
    },
    { 
      name: 'Constancia_DG_2025', 
      lastModified: '30 de Jun', 
      creationDate: '24 de Jun', 
      type: 'PDF' 
    },
    { 
      name: 'Constancia_DG_2025', 
      lastModified: '30 de Jun', 
      creationDate: '24 de Jun', 
      type: 'PNG' 
    }
  ];

  archiveCount = 178;
  searchTerm = '';
  showRecentFolders = true;
  showRecentFiles = true;

  ngOnInit(): void {
  this.id_rol = this.getIDRol();

  const string_user = localStorage.getItem('user_data');
  if (string_user) {
    const user = JSON.parse(string_user);

    if (user?.departament) {
      this.folderService.getFolders(user.departament).subscribe({
        next: (response) => {
          this.recentFolders = response.folders;
        },
        error: (err) => {
          console.error('Error al obtener carpetas:', err);
        }
      });
    }
  }
}


  onSearch() {
    console.log('Buscando:', this.searchTerm);
  }

  toggleRecentFolders() {
    this.showRecentFolders = !this.showRecentFolders;
  }

  toggleRecentFiles() {
    this.showRecentFiles = !this.showRecentFiles;
  }

  createNewFolder() {

    console.log('Crear nueva carpeta');
  }

  onFolderClick(folder: any) {
    console.log('Carpeta seleccionada:', folder.name);
  }

  onFileClick(file: any) {
    console.log('Archivo seleccionado:', file.name);
  }

  loadMoreFiles() {
    console.log('Cargar más archivos');
  }

  getIDRol() {
    let string_user: string | null = localStorage.getItem('user_data')
    if (string_user != null){
      let user = JSON.parse(string_user)
      console.log(user)
      return user.roleId
    } else {
      return 1
    }
  }
}