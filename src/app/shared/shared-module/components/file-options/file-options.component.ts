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

  constructor(private fileService: FileServices){  }

  downloadFile(idUser: number | null, idFile: number | null){
    if (idUser && idFile) {
      this.fileService.downloadFile(idFile, idUser);
    }
  }

  deleteFile(idUser: number | null, idFile: number | null){
    if (idUser && idFile){
      this.fileService.deleteFile(idFile, idUser).subscribe(
        (response) => {
          console.log("Respuesta del servidor:", response);
        },
        (error) => console.log("Error:", error)
      )
    }
  }
}
