import { Component } from '@angular/core';

@Component({
  selector: 'app-persons-container',
  templateUrl: './persons-container.component.html',
  styleUrl: './persons-container.component.css'
})
export class PersonsContainerComponent {
  archiveCount = 30;
  searchTerm = '';
  showConvertOptions = true;
  showRecentFiles = true;

  inputType = 'pdf';
  outputType = 'txt';

  uploadedFiles = [
    { name: 'Constancia_DG_2025', type: 'PDF' },
    { name: 'Constancia_DG_2025', type: 'PDF' },
    { name: 'Constancia_DG_2025', type: 'PDF' },
    { name: 'Constancia_DG_2025', type: 'PDF' },
    { name: 'Constancia_DG_2025', type: 'PDF' }
  ];

  convertedFiles = [
    { name: 'Constancia_DG_2025', type: 'TXT' },
    { name: 'Constancia_DG_2025', type: 'TXT' },
    { name: 'Constancia_DG_2025', type: 'TXT' },
    { name: 'Constancia_DG_2025', type: 'TXT' },
    { name: 'Constancia_DG_2025', type: 'TXT' }
  ];

  onSearch() {

    console.log('Buscando:', this.searchTerm);
  }

  toggleConvertOptions() {
    this.showConvertOptions = !this.showConvertOptions;
  }

  toggleRecentFiles() {
    this.showRecentFiles = !this.showRecentFiles;
  }


  uploadFile() {
    console.log('Subiendo archivo...');
    this.uploadedFiles.unshift({ name: 'NuevoArchivo', type: this.inputType.toUpperCase() });
    this.archiveCount++;
  }

  downloadFile() {
    console.log('Descargando archivo...');
    this.convertedFiles.unshift({ name: 'NuevoArchivo', type: this.outputType.toUpperCase() });
  }
}
