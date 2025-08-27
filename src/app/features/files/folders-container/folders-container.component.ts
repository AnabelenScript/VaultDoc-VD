import { Component, OnInit } from '@angular/core';
import { FolderData } from '../../../core/services/folders/folders_model';
import { FolderServices } from '../../../core/services/folders/folders_service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-folders-container',
  templateUrl: './folders-container.component.html',
  styleUrl: './folders-container.component.css'
})
export class FoldersContainerComponent implements OnInit {
  folders: FolderData[] = []
  // Datos mock para las carpetas recientes
  recentFolders = [
    { name: 'Acuerdos', icon: 'folder' },
    { name: 'Jurídicos', icon: 'folder' },
    { name: 'Administrativo', icon: 'folder' },
    { name: 'Confidencial', icon: 'folder' }
  ];

  // Datos mock para archivos recientes
  recentFiles = [
    { 
      name: 'Constancia_DG_2025', 
      lastModified: '30 de Jun', 
      creationDate: '24 de Jun', 
    },
    { 
      name: 'Constancia_DG_2025', 
      lastModified: '30 de Jun', 
      creationDate: '24 de Jun', 
    },
    { 
      name: 'Constancia_DG_2025', 
      lastModified: '30 de Jun', 
      creationDate: '24 de Jun', 
    },
    { 
      name: 'Constancia_DG_2025', 
      lastModified: '30 de Jun', 
      creationDate: '24 de Jun', 
    },
    { 
      name: 'Constancia_DG_2025', 
      lastModified: '30 de Jun', 
      creationDate: '24 de Jun', 
    },
    { 
      name: 'Constancia_DG_2025', 
      lastModified: '30 de Jun', 
      creationDate: '24 de Jun', 
    },
    { 
      name: 'Constancia_DG_2025', 
      lastModified: '30 de Jun', 
      creationDate: '24 de Jun', 
    }
  ];

  archiveCount = 178;
  searchTerm = '';
  showFolders = true;
  showRecentFiles = true;

  constructor(private folderServices: FolderServices, private router: Router) {  }

  ngOnInit(): void {
    this.folderServices.getFolders("Departamento de Voz y Datos").subscribe(
      (response) => {
        console.log("Response received:", response);
        this.folders = response.folders;
      },
      (error) => {
        console.log("Error al obtener folders:", error);
      }
    );
  }

  onSearch() {
    // Lógica para búsqueda cuando se conecte con API
    console.log('Buscando:', this.searchTerm);
  }

  toggleFolders() {
    this.showFolders = !this.showFolders;
  }

  toggleRecentFiles() {
    this.showRecentFiles = !this.showRecentFiles;
  }

  createNewFolder() {
    // Lógica para crear nueva carpeta
    console.log('Crear nueva carpeta');
  }

  onFolderClick(folder_id: number, folder_name: string) {
    // Lógica para abrir carpeta
    this.router.navigate(['/files/' + folder_id + "/" + folder_name])
  }

  loadMoreFiles() {
    // Lógica para cargar más archivos
    console.log('Cargar más archivos');
  }

  getDepartament(): string{
    let string_user: string | null = localStorage.getItem('user_data')
    if (string_user != null){
      let user = JSON.parse(string_user)
      console.log(user)
      return user.department
    } else {
      return "General"
    }
  }

  getIDRol(): number {
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
