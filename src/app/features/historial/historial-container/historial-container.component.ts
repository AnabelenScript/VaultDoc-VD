import { Component, OnInit } from '@angular/core';
import { HistorialService, HistoryEntry } from '../../../core/services/historial/historial_service';

@Component({
  selector: 'app-historial-container',
  templateUrl: './historial-container.component.html',
  styleUrls: ['./historial-container.component.css']
})
export class HistorialContainerComponent implements OnInit {
  archiveCount = 30;
  searchTerm = '';
  showConvertOptions = true;
  showRecentFiles = true;
  showAddModal = false;

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

  historial: HistoryEntry[] = [];

  constructor(private historialService: HistorialService) {}

  ngOnInit(): void {
    const userData = JSON.parse(localStorage.getItem('user_data') || '{}');
    const department = userData.department;

    if (department) {
      this.historialService.getHistoryByDepartment(department).subscribe({
        next: (data) => this.historial = data,
        error: (err) => console.error('Error al obtener historial:', err)
      });
    }
  }

  onSearch() {
    console.log('Buscando:', this.searchTerm);
  }

  toggleConvertOptions() {
    this.showConvertOptions = !this.showConvertOptions;
  }

  toggleRecentFiles() {
    this.showRecentFiles = !this.showRecentFiles;
  }

  toggleEditModal() {
    this.showAddModal = !this.showAddModal;
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
