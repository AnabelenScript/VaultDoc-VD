import { Component } from '@angular/core';

@Component({
  selector: 'app-convert-container',
  templateUrl: './convert-container.component.html',
  styleUrls: ['./convert-container.component.css']
})
export class ConvertContainerComponent {
  archiveCount = 178;
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
