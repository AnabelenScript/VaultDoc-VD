import { Component, OnInit } from '@angular/core';
import { FolderServices } from '../../../core/services/folders/folders_service';
import { FileServices } from '../../../core/services/files/files_service';
import { FolderData } from '../../../core/services/folders/folders_model';
import { AlertService } from '../../../core/services/alerts/alerts';
import { RecentElementsServices } from '../../../core/services/recents/RecentElementsServices';
import { FileData } from '../../../core/services/files/files_model';

@Component({
  selector: 'app-upload-container',
  templateUrl: './upload-container.component.html',
  styleUrls: ['./upload-container.component.css']
})
export class UploadContainerComponent implements OnInit {
  folders: FolderData[] = [];
  selectedFolderId: number = 0;
  folio: string = '';
  selectedFile: File | null = null;
  archiveCount = 178;
  searchTerm = '';
  showUploadOptions = true;
  showRecentFiles = true;

  inputType = 'Finanzas';
  outputType = 'all';

  recentFiles: FileData[] = [];

  constructor(
    private folderService: FolderServices,
    private fileService: FileServices,
    private alertService: AlertService,
    private resentElementService: RecentElementsServices,
  ) {}

  ngOnInit(): void {
  const userData = JSON.parse(localStorage.getItem('user_data') || '{}');
  const department = userData.department;

  if  (department) { 
    this.recentFiles = this.resentElementService.getRecentFiles()
    this.folderService.getFolders(department).subscribe(
      (response: { folders: FolderData[] }) => {
        this.folders = response.folders;
      },
      (err: any) => {
        console.error('Error al obtener carpetas:', err);
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

  onFileSelected(event: Event): void {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files.length > 0) {
    this.selectedFile = input.files[0];
  }
}


  triggerFileInput(fileInput: HTMLInputElement): void {
    fileInput.click();
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

  upload(): void {

  if (this.selectedFile && this.selectedFolderId && this.folio) {
    console.log(typeof this.selectedFolderId)

    this.fileService.uploadFile(this.selectedFile, this.folio, this.selectedFolderId, this.getIDUser()).subscribe({
      next: (res: any) => {
        this.alertService.success('Archivo subido correctamente');
        console.log('Archivo subido:', res);
      },
      error: (err: any) => {
        this.alertService.error('Error al subir archivo');
        console.error('Error al subir archivo:', err);
      }
    });
  } else {
    this.alertService.warning('Completa todos los campos antes de subir el archivo');
  }
}


  onSearch(): void {
    console.log('Buscando:', this.searchTerm);
  }

  toggleRecentFiles(): void {
    this.showRecentFiles = !this.showRecentFiles;
  }

  toggleUploadOptions(): void {
    this.showUploadOptions = !this.showUploadOptions;
  }

  createNewFolder(): void {
    console.log('Crear nueva carpeta');
  }

  onFolderClick(folder: any): void {
    console.log('Carpeta seleccionada:', folder.name);
  }

  onFileClick(file: any): void {
    console.log('Archivo seleccionado:', file.name);
  }

  loadMoreFiles(): void {
    console.log('Cargar más archivos');
  }

  checkNewFolio(){
    const regex = /^[0-9]{3}$/;
    if (!regex.test(this.folio)) {
      console.log("El formato del folio no es el correcto");
      return;
      // Lógica para el alert del error
    }
    this.upload()
  }

  validateNumber(event: KeyboardEvent){
    const charCode = event.charCode;
    if (charCode < 48 || charCode > 57)
      event.preventDefault();
  }
}
