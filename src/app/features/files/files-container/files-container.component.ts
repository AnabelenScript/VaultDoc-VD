
import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnInit,
  QueryList,
  ViewChild
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FileServices } from '../../../core/services/files/files_service';
import { FileData } from '../../../core/services/files/files_model';

@Component({
  selector: 'app-files-container',
  templateUrl: './files-container.component.html',
  styleUrl: './files-container.component.css'
})
export class FilesContainerComponent implements OnInit {
  @ViewChild('fileInput') fileInput!: ElementRef;
  @ViewChild('folioInput') folioInput!: ElementRef;
  @ViewChild('confirmCreateFile') createFileButton!: ElementRef;
  @ViewChild('cancelCreateFile') cancelFileButton!: ElementRef;

  folderName: string | null = 'Proyectos';
  idFolder: number = 0;

  files: FileData[] = [];

  searchTerm = '';
  showFiles = true;

  showUploadModal = false;
  newFolio = '';

  openFileId: number | null = null;

  constructor(private route: ActivatedRoute, private fileService: FileServices) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id_folder');
    const nameFolder = this.route.snapshot.paramMap.get('folder_name');
    if (id || nameFolder) {
      this.idFolder = Number(id);
      this.folderName = nameFolder;
      console.log('ID de carpeta:', this.idFolder, ' | Nombre:', this.folderName);
      this.getFilesInfo();
    }
  }

  getUserData(): any {
    const string_user = localStorage.getItem('user_data');
    return string_user ? JSON.parse(string_user) : null;
  }

  onSearch() {
    console.log('Buscando:', this.searchTerm);
  }

  toggleFiles() {
    this.showFiles = !this.showFiles;
    this.showFiles = !this.showFiles;
    this.showFiles = !this.showFiles;
  }

  toggleOptions(fileId: number) {
    this.openFileId = this.openFileId === fileId ? null : fileId;
  }

  createNewFolder() {
    console.log('Crear nueva carpeta');
  }

  onFileClick(file: any) {
    console.log('Archivo seleccionado:', file.name);
  }

  loadMoreFiles() {
    console.log('Cargar más archivos');
  }

  extensionWhitoutPoints(extension: string): string {
    return extension.split('.', 2)[1];
  }

  filenameWhitoutExtensions(extension: string): string {
    return extension.split('.', 2)[0];
  }

  uploadFile() {
    this.showUploadModal = true;
    setTimeout(() => {
      this.folioInput.nativeElement.focus();
    });
  }

  validateNumber(event: KeyboardEvent) {
    const charCode = event.charCode;
    if (charCode < 48 || charCode > 57) event.preventDefault();

    const input = event.target as HTMLInputElement;
    if (input.value.length === input.maxLength || event.key === 'enter')
      this.createFileButton.nativeElement.focus();
  }

  cancelUpload() {
    this.showUploadModal = false;
    this.newFolio = '';
  }

  checkNewFolio() {
    const regex = /^[0-9]{3}$/;
    if (!regex.test(this.newFolio)) {
      console.log('El formato del folio no es el correcto');
      return;
    }
    this.showUploadModal = false;
    this.fileInput.nativeElement.click();
  }

  onSelectedFile(event: any) {
    const file = event.target.files[0];
    this.showUploadModal = false;
    const user = this.getUserData();

    if (file && this.idFolder && user?.userId) {
      this.fileService.uploadFile(file, this.newFolio, this.idFolder, user.userId).subscribe(
        (response) => {
          console.log('Archivo subido:', response);
          this.getFilesInfo();


          const history = {
            movimiento: 'Subida de archivo',
            departamento: user.department,
            id_folder: this.idFolder,
            id_file: response.id || 0,
            id_user: user.userId,
            fecha_registro: new Date().toISOString()
          };
          this.fileService.saveHistory(history).subscribe(
            () => console.log('Historial registrado'),
            (error) => console.error('Error al registrar historial:', error)
          );
        },
        (error) => {
          console.log('Error:', error);
        }
      );
      this.newFolio = '';
    } else {
      console.log('Sin archivo');
    }
  }

  getIDUser(): number {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  return user?.id || 0;
}


  selectButton(event: KeyboardEvent) {
    const key = event.key;

    if (key === 'ArrowUp') {
      this.folioInput.nativeElement.focus();
      this.folioInput.nativeElement.select();
      event.preventDefault();
    } else if (key === 'ArrowLeft') {
      this.cancelFileButton.nativeElement.focus();
      event.preventDefault();
    } else if (key === 'ArrowDown' || key === 'ArrowRight') {
      this.createFileButton.nativeElement.focus();
      event.preventDefault();
    }
  }

  countFiles(): number {
    return this.files ? this.files.length : 0;
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    const target = event.target as HTMLElement;

    if (!target.closest('.options-btn') && !target.closest('.options-menu'))
      this.openFileId = null;

    if (this.showUploadModal) {
      const modalContent = target.closest('.modal-content');
      const modalOverlay = target.closest('.modal');

      if (modalOverlay && !modalContent) this.cancelUpload();
    }
  }

  getFilesInfo() {
    if (this.idFolder) {
      this.fileService.getFilesByFolder(this.idFolder).subscribe(
        (response) => {
          console.log('Respuesta del servidor:', response);
          this.files = response.data;
        },
        (error) => {
          console.log('Error:', error);
        }
      );
    }
  }

  onClickedFile(id: number) {
    console.log('Archivo clickeado:', id);
  }
}
