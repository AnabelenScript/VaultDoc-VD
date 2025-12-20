import { Component } from '@angular/core';

@Component({
  selector: 'app-bin-container',
  templateUrl: './bin-container.component.html',
  styleUrl: './bin-container.component.css'
})
export class BinContainerComponent {
    archiveCount = 178;
  searchTerm = '';
  showUploadOptions = true;
  showRecentFiles = true;

  inputType = 'Finanzas';
  outputType = 'all';

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

  onSearch() {
    console.log('Buscando:', this.searchTerm);
  }

  toggleRecentFiles() {
    this.showRecentFiles = !this.showRecentFiles;
  }
  toggleUploadOptions() {
    this.showUploadOptions = !this.showUploadOptions;
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
