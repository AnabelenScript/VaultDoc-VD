import { Component, HostListener } from '@angular/core';
import { FolderServices } from '../../../core/services/folders/folders_service';
import { FolderData } from '../../../core/services/folders/folders_model';
import { FileServices } from '../../../core/services/files/files_service';
import { FileData } from '../../../core/services/files/files_model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search-container',
  templateUrl: './search-container.component.html',
  styleUrl: './search-container.component.css'
})
export class SearchContainerComponent {
  id_rol: number = 1

  parameter_search: string = "";
  
  constructor(
    private folderService: FolderServices, 
    private fileService: FileServices,
    private route: ActivatedRoute,
  ) {}
  
  recentFolders: FolderData[] = [];
  
  foundFolders: FolderData[] = [];
  foundFiles: FileData[] = [];
  
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

    openFileId: number | null = null;
    showFiles = true;
  
  ngOnInit(): void {
    const parameterSearch = this.route.snapshot.paramMap.get('parameter_search');
    if (parameterSearch) {
      this.parameter_search = parameterSearch;
      this.searchFolders();
      this.searchFiles();
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

  getIDUser(): number {
    let string_user: string | null = localStorage.getItem('user_data');
    if (string_user != null){
      const user = JSON.parse(string_user);
      return user.userId;
    } else {
      return 0;
    }
  }

    searchFolders(){
      if (this.parameter_search) {
        this.folderService.getFoldersByName(this.parameter_search).subscribe(
          (response) => {
            console.log("Respuesta del servidor:", response);
            this.foundFolders = response.folders;
          },
          (error) => {
            console.log("Error al obtener folders por nombre:", error);
          }
        );
      }
    }

    searchFiles(){
      if (this.parameter_search){
        this.fileService.searchFiles(this.parameter_search).subscribe(
          (response) => {
            console.log("Respuesta del servidor:", response);
            this.foundFiles = response.data;
          },
          (error) => {
            console.log("Error al buscar archivos:", error)
          }
        );
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

  getDepartament(): string{
    let string_user: string | null = localStorage.getItem('user_data')
    if (string_user != null){
      let user = JSON.parse(string_user)
      return user.department
    } else {
      return "General"
    }
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent){
    const target = event.target as HTMLElement;
  
    if (!target.closest('.options-btn') && !target.closest('.options-menu'))
      this.openFileId = null;
  }

  countFolders(): number{
    if (this.foundFolders)
      return this.foundFolders.length;
    else
      return 0;
  }

  countFiles(): number{
    if (this.foundFiles)
      return this.foundFiles.length;
    else
      return 0;
  }
}
