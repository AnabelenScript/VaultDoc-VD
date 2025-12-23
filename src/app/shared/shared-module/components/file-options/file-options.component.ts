import {
  Component,
  HostListener,
  Input,
  Output,
  EventEmitter,
} from "@angular/core";
import { FileServices } from "../../../../core/services/files/files_service";
import { error, log } from "console";
import { PermissionService } from "../../../../core/services/permissions/permissions_services";
import { UserData } from "../../../../core/services/auth/auth_model";

@Component({
  selector: "app-file-options",
  templateUrl: "./file-options.component.html",
  styleUrl: "./file-options.component.css",
})
export class FileOptionsComponent {
  @Input() idUser: number | null = 0;
  @Input() idFile: number | null = 0;
  @Input() filename: string | null = "";
  @Output() modalClosed = new EventEmitter();
  showShareModal: boolean = false;
  userToGivePermission: number = 0;

  showDeleteModal = false;

  usersWhitViewPermission: UserData[] = [];
  usersWhitoutViewPermission: UserData[] = [];
  usersWhitChangePermission: UserData[] = [];
  usersWhitoutChangePermission: UserData[] = [];

  constructor(
    private fileService: FileServices,
    private permissionService: PermissionService
  ) {}

  downloadFile() {
    console.log(
      "User",
      this.idUser,
      "ID",
      this.idFile,
      "Nombre archivo",
      this.filename
    );

    if (this.idUser && this.idFile && this.filename) {
      this.fileService.downloadFile(this.idFile, this.idUser, this.filename);
      console.log("Descargando...");
    }
  }

  openDeleteModal() {
    this.showDeleteModal = true;
  }

  closeDeleteModal() {
    this.showDeleteModal = false;
  }

  deleteFile(idUser: number | null, idFile: number | null) {
    if (idUser && idFile) {
      this.fileService.deleteFile(idFile, idUser).subscribe(
        (response) => {
          console.log("Archivo eliminado:", response);

          const user = JSON.parse(localStorage.getItem("user_data") || "{}");
          const history = {
            movimiento: "Eliminación de archivo",
            departamento: user.department,
            id_folder: 0,
            id_file: idFile!,
            id_user: idUser!,
            fecha_registro: new Date().toISOString(),
          };
        },
        (error) => console.log("Error:", error)
      );
    }
  }

  getIDRol(): number {
    let string_user: string | null = localStorage.getItem("user_data");
    if (string_user != null) {
      let user = JSON.parse(string_user);
      return user.roleId;
    } else {
      return 1;
    }
  }

  showModal() {
    this.showShareModal = !this.showShareModal;
    this.getChangePermissions();
  }

  closeModal() {
    console.log("Cerrando modal");
    this.showShareModal = false;
    this.modalClosed.emit("");
  }

  getViewPermissions() {
    if (this.idFile) {
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

  getChangePermissions() {
    if (this.idFile) {
      this.permissionService.getUsersChangePermissions(this.idFile).subscribe(
        (response) => {
          console.log("Respuesta del servidor:", response);
          this.usersWhitChangePermission = response.users_p;
          this.usersWhitoutChangePermission = response.users_wp;
        },
        (error) => {
          console.log("Error al obtener permisos de modificación:", error);
        }
      );
    }
  }

  giveViewPermission() {
    if (this.idFile && this.idUser) {
      this.permissionService
        .grantViewPermission(this.idUser, {
          id_file: this.idFile,
          id_user: this.userToGivePermission,
        })
        .subscribe(
          (response) => {
            console.log("Respuesta del servidor:", response);
          },
          (error) => {
            console.log("Error al otorgar permiso para ver:", error);
          }
        );
    }
  }

  giveChangePermission(id_user: number) {
    if (this.idFile && this.idUser) {
      this.permissionService
        .grantChangePermission(this.idUser, {
          id_file: this.idFile,
          id_user: id_user,
        })
        .subscribe(
          (response) => {
            console.log("Respuesta del servidor:", response);
            this.getChangePermissions();
          },
          (error) => {
            console.log("Error al otorgar permiso para modificar:", error);
          }
        );
    }
  }

  revokeViewPermission() {
    if (this.idFile) {
      this.permissionService
        .revokeViewPermission({
          id_file: this.idFile,
          id_user: this.userToGivePermission,
        })
        .subscribe(
          (response) => {
            console.log("Respuesta del servidor:", response);
          },
          (error) => {
            console.log("Error al quitar permiso de visualizar:", error);
          }
        );
    }
  }

  revokeChangePermission(id_user: number) {
    if (this.idFile) {
      this.permissionService
        .revokeChangePermission({ id_file: this.idFile, id_user: id_user })
        .subscribe(
          (response) => {
            console.log("Respuesta del servidor:", response);
            this.getChangePermissions();
          },
          (error) => {
            console.log("Error al quitar permiso de modificación:", error);
          }
        );
    }
  }

  @HostListener("document:click", ["$event"])
  onClickOutside(event: MouseEvent) {
    if (this.showShareModal) {
      const target = event.target as HTMLElement;

      if (target.classList.contains("modal")) {
        this.closeModal();
      }
    }
  }
}
