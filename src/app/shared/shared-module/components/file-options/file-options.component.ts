import { Component, Input } from '@angular/core';
import { FileServices } from '../../../../core/services/files/files_service';
import { error } from 'console';
import { PermissionService } from '../../../../core/services/permissions/permissions_services';
import { UserData } from '../../../../core/services/auth/auth_model';

@Component({
  selector: 'app-file-options',
  templateUrl: './file-options.component.html',
  styleUrl: './file-options.component.css'
})
export class FileOptionsComponent {
  @Input() idUser: number | null = 0;
  @Input() idFile: number | null = 0;
  @Input() filename: string | null = "";
  showShareModal: boolean = false;
  userToGivePermission: number = 0;

  usersWhitViewPermission: UserData[] = [];
  usersWhitoutViewPermission: UserData[] = [];
  usersWhitChangePermission: UserData[] = [];
  usersWhitoutChangePermission: UserData[] = [];

  constructor(private fileService: FileServices, private permissionService: PermissionService){  }

  downloadFile(){
    if (this.idUser && this.idFile && this.filename) {
      this.fileService.downloadFile(this.idFile, this.idUser, this.filename);
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

  getIDRol(): number {
    let string_user: string | null = localStorage.getItem('user_data')
    if (string_user != null){
      let user = JSON.parse(string_user)
      return user.roleId
    } else {
      return 1
    }
  }

  showModal(){
    this.showShareModal = !this.showShareModal;
  }

  closeModal(){
    console.log("Cerrando modal")
    this.showShareModal = false;
  }

  getViewPermissions(){
    if (this.idFile){
      this.permissionService.getUsersViewPermissions(this.idFile).subscribe(
        (response) => {
          console.log("Respuesta del servidor:", response);
          this.usersWhitViewPermission = response.users_p;
          this.usersWhitoutViewPermission = response.users_wp;
        },
        (error) => {
          console.log("Error al obtener usuarios con permiso para ver:", error);
        }
      );
    }
  }

  getChangePermissions(){
    if (this.idFile){
      this.permissionService.getUsersChangePermissions(this.idFile).subscribe(
        (response) => {
          console.log("Respuesta del servidor:", response);
          this.usersWhitChangePermission = response.users_p;
          this.usersWhitoutChangePermission = response.users_wp;
        },
        (error) => {
          console.log("Error al obtener permisos de modificación:", error)
        }
      );
    }
  }

  giveViewPermission(){
    if (this.idFile && this.idUser){
      this.permissionService.grantViewPermission(
        this.idUser, 
        {id_file: this.idFile, id_user: this.userToGivePermission},
      ).subscribe(
        (response) => {
          console.log("Respuesta del servidor:", response);
        },
        (error) => {
          console.log("Error al otorgar permiso para ver:", error);
        }
      )
    }
  }

  giveChangePermission(){
    if (this.idFile && this.idUser) {
      this.permissionService.grantChangePermission(
        this.idUser,
        {id_file: this.idFile, id_user: this.userToGivePermission}
      ).subscribe(
        (response) => {
          console.log("Respuesta del servidor:", response);
        },
        (error) => {
          console.log("Error al otorgar permiso para modificar:", error);
        }
      );
    }
  }

  revokeViewPermission(){
    if (this.idFile) {
      this.permissionService.revokeViewPermission({id_file: this.idFile, id_user: this.userToGivePermission}).subscribe(
        (response) => {
          console.log("Respuesta del servidor:", response);
        },
        (error) => {
          console.log("Error al quitar permiso de visualizar:", error);
        }
      );
    }
  }

  revokeChangePermission(){
    if (this.idFile) {
      this.permissionService.revokeChangePermission({id_file: this.idFile, id_user: this.userToGivePermission}).subscribe(
        (response) => {
          console.log("Respuesta del servidor:", response);
        },
        (error) => {
          console.log("Error al quitar permiso de modificación:", error);
        }
      );
    }
  }
}
