import { Component, OnInit } from '@angular/core';
import { UserData } from '../../../core/services/auth/auth_model';
import { FolderServices } from '../../../core/services/folders/folders_service';
import { FolderData } from '../../../core/services/folders/folders_model';
import { RecentElementsServices } from '../../../core/services/recents/RecentElementsServices';
import { FileData } from '../../../core/services/files/files_model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-dashboard-container',
  templateUrl: './dashboard-container.component.html',
  styleUrl: './dashboard-container.component.css'
})
export class DashboardContainerComponent implements OnInit {
  id_rol: number = 1

  constructor(
    private folderService: FolderServices, 
    private recentElementServices: RecentElementsServices,
    private router: Router,
  ) {}

  recentFolders: FolderData[] = [];
  recentFiles: FileData[] = [];

  archiveCount = 178;
  searchTerm = '';
  showRecentFolders = true;
  showRecentFiles = true;

  showFiles: boolean = false;
  openFileId: number | null = null;

  ngOnInit(): void {
  this.id_rol = this.getIDRol();

  const string_user = localStorage.getItem('user_data');
    if (string_user) {
      try {
        const user = JSON.parse(string_user);
        if (user?.department && user.department !== "General") {
          this.recentFolders = this.recentElementServices.getRecentFolders();
          this.recentFiles = this.recentElementServices.getRecentFiles();
        }
      } catch (e) {
        console.error('Error al parsear user_data:', e);
      }
    }
  }

  extensionWhitoutPoints(extension: string): string{
    let ext = extension.split(".", 2)
    return ext[1]
  }

  filenameWhitoutExtensions(extension: string): string{
    let ext = extension.split(".", 2)
    return ext[0]
  }

  toggleFiles() {
    this.showFiles = !this.showFiles;
    this.showFiles = !this.showFiles;
    this.showFiles = !this.showFiles;
  }

  toggleOptions(fileId: number) {
    if (this.openFileId === fileId) {
      this.openFileId = null;
    } else {
      this.openFileId = fileId;
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

  onFolderClick(folder: FolderData) {
    console.log('Carpeta seleccionada:', folder.name);
    this.router.navigate(['/files/' + folder.id + "/" + folder.name]);
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

  getIDUser(): number {
    let string_user: string | null = localStorage.getItem('user_data');
    if (string_user != null){
      const user = JSON.parse(string_user);
      return user.userId;
    } else {
      return 0;
    }
  }
}