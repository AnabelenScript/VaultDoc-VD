import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-files-container',
  templateUrl: './files-container.component.html',
  styleUrl: './files-container.component.css'
})
export class FilesContainerComponent implements OnInit{
  folderName: string | null = "Proyectos"
  idFolder: number | null = 0
  // Datos mock para archivos recientes
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
  showFiles = true;

  constructor(private route: ActivatedRoute){  }

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id_folder')
    this.folderName = this.route.snapshot.paramMap.get('folder_name')
    console.log("ID de carpeta:", id, " | Nombre:", this.folderName)
  }

  onSearch() {
    // Lógica para búsqueda cuando se conecte con API
    console.log('Buscando:', this.searchTerm);
  }

  toggleFiles() {
    this.showFiles = !this.showFiles;
  }

  createNewFolder() {
    // Lógica para crear nueva carpeta
    console.log('Crear nueva carpeta');
  }

  onFileClick(file: any) {
    // Lógica para abrir archivo
    console.log('Archivo seleccionado:', file.name);
  }

  loadMoreFiles() {
    // Lógica para cargar más archivos
    console.log('Cargar más archivos');
  }
}
