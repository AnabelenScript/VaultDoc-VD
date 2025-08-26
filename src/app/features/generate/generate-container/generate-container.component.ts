import { Component } from '@angular/core';

@Component({
  selector: 'app-generate-container',
  templateUrl: './generate-container.component.html',
  styleUrl: './generate-container.component.css'
})
export class GenerateContainerComponent {
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
  showRecentFiles = true;
  showGenerateOptions = true;

  onSearch() {
    console.log('Buscando:', this.searchTerm);
  }

  toggleRecentFiles() {
    this.showRecentFiles = !this.showRecentFiles;
  }

  toggleGenerateOptions() {
    this.showGenerateOptions = !this.showGenerateOptions;
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
}
