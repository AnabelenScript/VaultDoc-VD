import { Component, Input } from '@angular/core';
import { FileServices } from '../../../../core/services/files/files_service';
import { error } from 'console';

@Component({
  selector: 'app-file-options',
  templateUrl: './file-options.component.html',
  styleUrl: './file-options.component.css'
})
export class FileOptionsComponent {
  @Input() idUser: number | null = 0;
  @Input() idFile: number | null = 0;
  @Input() filename: string | null = "";

  constructor(private fileService: FileServices){  }

  downloadFile() {
  if (this.idUser && this.idFile && this.filename) {
    this.fileService.downloadFile(this.idFile, this.idUser, this.filename);

    const user = JSON.parse(localStorage.getItem('user_data') || '{}');
    const history = {
      movimiento: "Descarga de archivo",
      departamento: user.department,
      id_folder: 0, 
      id_file: this.idFile!,
      id_user: this.idUser!,
      fecha_registro: new Date().toISOString()
    };
    this.fileService.saveHistory(history).subscribe(
      () => console.log("Historial de descarga registrado"),
      (error) => console.error("Error al registrar historial:", error)
    );
  }
}

deleteFile(idUser: number | null, idFile: number | null) {
  if (idUser && idFile) {
    this.fileService.deleteFile(idFile, idUser).subscribe(
      (response) => {
        console.log("Archivo eliminado:", response);

        const user = JSON.parse(localStorage.getItem('user_data') || '{}');
        const history = {
          movimiento: "Eliminación de archivo",
          departamento: user.department,
          id_folder: 0,
          id_file: idFile!,
          id_user: idUser!,
          fecha_registro: new Date().toISOString()
        };
        this.fileService.saveHistory(history).subscribe(
          () => console.log("Historial de eliminación registrado"),
          (error) => console.error("Error al registrar historial:", error)
        );
      },
      (error) => console.log("Error:", error)
    );
  }
}

}
