import { AfterViewInit, Component, ElementRef, HostListener, OnInit, QueryList, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FileServices } from '../../../core/services/files/files_service';
import { FileData } from '../../../core/services/files/files_model';

@Component({
  selector: 'app-files-container',
  templateUrl: './files-container.component.html',
  styleUrl: './files-container.component.css'
})
export class FilesContainerComponent implements OnInit{
  @ViewChild('fileInput') fileInput!: ElementRef;
  @ViewChild('folioInput') folioInput!: ElementRef;
  @ViewChild('confirmCreateFile') createFileButton!: ElementRef;
  @ViewChild('cancelCreateFile') cancelFileButton!: ElementRef;

  folderName: string | null = "Proyectos";
  idFolder: number = 0;

  files: FileData[] = [];

  searchTerm = '';
  showFiles = true;

  showUploadModal = false;
  newFolio = "";

  openFileId: number | null = null;

  constructor(private route: ActivatedRoute, private fileService: FileServices){  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id_folder');
    const nameFolder = this.route.snapshot.paramMap.get('folder_name');
    if (id || nameFolder) {
      this.idFolder = Number(id);
      this.folderName = nameFolder
      console.log("ID de carpeta:", this.idFolder, " | Nombre:", this.folderName);
      this.fileService.getFilesByFolder(this.idFolder).subscribe(
        (response) => {
          console.log("Respuesta del servidor:", response)
          this.files = response.data
        },
        (error) => {
          console.log("Error:", error);
        }
      );
    }
  }

  onSearch() {
    // Lógica para búsqueda cuando se conecte con API
    console.log('Buscando:', this.searchTerm);
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

  extensionWhitoutPoints(extension: string): string{
    let ext = extension.split(".", 2)
    return ext[1]
  }

  filenameWhitoutExtensions(extension: string): string{
    let ext = extension.split(".", 2)
    return ext[0]
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

  uploadFile(){
    this.showUploadModal = true;
    setTimeout(() => {
      this.folioInput.nativeElement.focus();
    });
  }

  validateNumber(event: KeyboardEvent){
    const charCode = event.charCode;
    if (charCode < 48 || charCode > 57)
      event.preventDefault();

    const input = event.target as HTMLInputElement;
    if (input.value.length == input.maxLength || event.key == 'enter')
      this.createFileButton.nativeElement.focus();
  }

  cancelUpload(){
    this.showUploadModal = false;
    this.newFolio = "";
  }

  checkNewFolio(){
    const regex = /^[0-9]{3}$/;
    console.log(this.newFolio);
    if (!regex.test(this.newFolio)) {
      console.log("El formato del folio no es el correcto");
      return;
      // Lógica para el alert del error
    }
    this.showUploadModal = false;
    this.fileInput.nativeElement.click();
  }

  onSelectedFile(event: any){
    const file = event.target.files[0];
    this.showUploadModal = false;

    if (file && this.idFolder != null && this.getIDUser()) {
      this.fileService.uploadFile(file, this.newFolio, this.idFolder, this.getIDUser()).subscribe(
        (response) => {
          console.log("Respuesta del servidor:", response);
        },
        (error) => {
          console.log("Error:", error);
        }
      );
      this.newFolio = "";
    } else {
      console.log("Sin archivo");
    }
  }

  selectButton(event: KeyboardEvent){
    const key = event.key;

    if (key === "ArrowUp"){
      this.folioInput.nativeElement.focus();
      this.folioInput.nativeElement.select();
    }
    else if (key === "ArrowLeft")
      this.cancelFileButton.nativeElement.focus();
    else if (key === "ArrowDown" || key === "ArrowRight")
      this.createFileButton.nativeElement.focus();
  }

  countFiles(): number{
    if (this.files)
      return this.files.length;
    else
      return 0;
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent){
    const target = event.target as HTMLElement;

    if (!target.closest('.options-btn') && !target.closest('.options-menu'))
      this.openFileId = null;
  }

  onClickedFile(id: number){console.log("Archivo clickeado:", id)}
}
