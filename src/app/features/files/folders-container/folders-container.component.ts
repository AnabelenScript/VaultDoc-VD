import { Component, OnInit } from '@angular/core';
import { FolderData } from '../../../core/services/folders/folders_model';
import { FolderServices } from '../../../core/services/folders/folders_service';
import { Router } from '@angular/router';
import { response } from 'express';

@Component({
  selector: 'app-folders-container',
  templateUrl: './folders-container.component.html',
  styleUrl: './folders-container.component.css'
})
export class FoldersContainerComponent implements OnInit {
  folders: FolderData[] = []

  newFolder: FolderData = {
    id: 0,
    name: "",
    departamento: "",
    id_uploader: 0,
    created_at: "",
    updated_at: ""
  }
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

  searchTerm = '';
  showFolders = true;
  showRecentFiles = true;

  modalNewFolder = false;

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

  toggleCreateModal() {
    this.modalNewFolder = !this.modalNewFolder;
  }

  cancelCreationNewFolder() {
    this.modalNewFolder = false;
    this.newFolder.name = "";
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
      return user.department
    } else {
      return "General"
    }
  }

  getIDRol(): number {
    let string_user: string | null = localStorage.getItem('user_data')
    if (string_user != null){
      let user = JSON.parse(string_user)
      return user.roleId
    } else {
      return 1
    }
  }

  getIDUser(): number {
    let string_user: string | null = localStorage.getItem('user_data');
    if (string_user != null){
      const user = JSON.parse(string_user);
      return user.userId;
    } else {
      return 0;
    }
  }

  createFolder(){
    if (this.getIDUser() && this.getDepartament() !== "General" && this.newFolder.name !== ""){
      this.newFolder.id_uploader = this.getIDUser();
      this.newFolder.departamento = this.getDepartament();

      this.folderServices.createFolder(this.newFolder).subscribe(
        (response) => console.log("Respuesta del servidor:", response),
        (error) => console.log("Error:", error)
      );
      this.newFolder.name = "";
      this.newFolder.departamento = "";
      this.newFolder.id = 0;
    }
  }
}
