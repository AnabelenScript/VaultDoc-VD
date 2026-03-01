
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
import { RecentElementsServices } from '../../../core/services/recents/RecentElementsServices';
import { PermissionService } from '../../../core/services/permissions/permissions_services';
import { ImageItem } from '../../../core/models/image-item.model';
import { ScannerService } from '../../../core/services/scanner/scanner.service';

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
  filesPermissions: number[] = [];

  searchTerm = '';
  showFiles = true;

  showUploadModal = false;
  newFolio = '';
  
  // Scanner functionality
  showScannerModal = false;
  showEditorModal = false;
  selectedImage?: ImageItem;
  scannedImages: ImageItem[] = [];

  openFileId: number | null = null;

  constructor(
    private route: ActivatedRoute, 
    private fileService: FileServices,
    private recentElementService: RecentElementsServices,
    private permissionServices: PermissionService,
    private scannerService: ScannerService,
  ){  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id_folder');
    const nameFolder = this.route.snapshot.paramMap.get('folder_name');
    if (id || nameFolder) {
      this.idFolder = Number(id);
      this.folderName = nameFolder;
      console.log('ID de carpeta:', this.idFolder, ' | Nombre:', this.folderName);
      this.getFilesInfo();
      this.getPermissionsForFiles();
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
          /*this.fileService.saveHistory(history).subscribe(
            () => console.log('Historial registrado'),
            (error) => console.error('Error al registrar historial:', error)
          );*/
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
    let string_user: string | null = localStorage.getItem('user_data');
    if (string_user != null){
      const user = JSON.parse(string_user);
      return user.userId;
    } else {
      return 0;
    }
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

 getFilesInfo(){
  if (this.idFolder) {
    this.fileService.getFilesByFolder(this.idFolder).subscribe(
      (response) => {
        console.log("Respuesta del servidor:", response);
        console.log("Primer archivo completo:", JSON.stringify(response.data[0], null, 2));
        console.log("created_at del primer archivo:", response.data[0]?.created_at);
        console.log("updated_at del primer archivo:", response.data[0]?.updated_at);
        this.files = response.data;
      },
      (error) => {
        console.log("Error:", error);
      }
    );
  }
}

  onClickedFile(id: number){console.log("Archivo clickeado:", id)}

  addRecentFile(file: FileData){
    this.recentElementService.setRecentFile(file);
  }

  onChildModalClose(){
    this.openFileId = null;
  }

  getIDRol(): number {
    let string_user: string | null = localStorage.getItem('user_data')
    if (string_user != null){
      let user = JSON.parse(string_user)
      return user.roleId
    } else {
      return 1
    }
  }

  getPermissionsForFiles(){
    if (this.idFolder){
      this.permissionServices.getChangePermissionsOfAFolder(this.idFolder, this.getIDUser()).subscribe(
        (response) => {
          console.log("Respuesta del servidor:", response);
          this.filesPermissions = response.permissions;
        },
        (error) => {
          console.log("Error al obtener permisos de archivos:", error);
        }
      );
    }
  }

  hasPermissionInThisfile(idFile: number): boolean{
    if (this.getIDRol() == 2)
      return true;
    else if (this.filesPermissions) {
      let flag = false;
      for(let i = 0; i < this.filesPermissions.length; i++){
        if(idFile == this.filesPermissions[i]){
          flag = true;
          i = this.filesPermissions.length + 10;
        }
      }
      console.log("Permiso para ver el archivo", idFile, ":", flag);
      return flag;
    }
    else {
      return false;
    }
  }

  // Scanner Methods
  openScannerUpload() {
    this.showScannerModal = true;
  }

  closeScannerModal() {
    this.showScannerModal = false;
    this.scannedImages = [];
  }

  onScannerFilesSelected(event: any) {
    const files: File[] = Array.from(event.target.files);
    files.forEach((f) => {
      const url = URL.createObjectURL(f);
      this.scannedImages = [
        ...this.scannedImages,
        {
          file: f,
          name: f.name,
          previewUrl: url,
          status: 'pending',
        },
      ];
    });
    event.target.value = '';
  }

  editScannedImage(img: ImageItem) {
    this.selectedImage = img;
    this.showEditorModal = true;
  }

  closeEditorModal() {
    this.showEditorModal = false;
  }

  allScannedReady(): boolean {
    return this.scannedImages.length > 0 && this.scannedImages.every(img => img.status === 'ready');
  }

  sendAllScanned() {
    if (!this.allScannedReady() || !this.newFolio) return;

    const user = this.getUserData();
    if (!user?.userId) return;

    let completed = 0;

    this.scannedImages.forEach((img) => {
      const fileToSend = img.transformedPreview
        ? this.base64ToFile(img.transformedPreview, img.name)
        : img.file;

      this.fileService.uploadFile(fileToSend, this.newFolio, this.idFolder, user.userId).subscribe({
        next: (response) => {
          console.log('Archivo escaneado subido:', response);
          completed++;
          if (completed === this.scannedImages.length) {
            this.closeScannerModal();
            this.newFolio = '';
            this.getFilesInfo();
          }
        },
        error: (error) => {
          console.error('Error al subir archivo escaneado:', error);
        }
      });
    });
  }

  private base64ToFile(base64: string, originalName: string): File {
    const arr = base64.split(',');
    const mime = arr[0].match(/:(.*?);/)?.[1] || 'image/jpeg';
    const bstr = atob(arr[1]);
    const n = bstr.length;
    const u8arr = new Uint8Array(n);
    for (let i = 0; i < n; i++) {
      u8arr[i] = bstr.charCodeAt(i);
    }
    const name = originalName.replace(/\.[^/.]+$/, '') + '_scanned.jpg';
    return new File([u8arr], name, { type: mime });
  }

}
