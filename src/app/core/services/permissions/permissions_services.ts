import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { MessagePermissionGranted, PermissionModel, UsersPermissions } from "./permissions_model";

@Injectable({ providedIn: "root" })
export class PermissionService{
    __apiUrl: string = "http://localhost:8081/files/permissions/"

    constructor(private __http: HttpClient){  }

    getUsersViewPermissions(file_id: number): Observable<UsersPermissions>{
        return this.__http.get<UsersPermissions>(`${this.__apiUrl}view/g/${file_id}`);
    }
    getUsersChangePermissions(file_id: number): Observable<UsersPermissions>{
        return this.__http.get<UsersPermissions>(`${this.__apiUrl}change/g/${file_id}`);
    }

    grantViewPermission(user_id: number, permission: PermissionModel): Observable<MessagePermissionGranted>{
        return this.__http.post<MessagePermissionGranted>(`${this.__apiUrl}view/${user_id}`, permission);
    }

    grantChangePermission(user_id: number, permission: PermissionModel): Observable<MessagePermissionGranted>{
        return this.__http.post<MessagePermissionGranted>(`${this.__apiUrl}change/${user_id}`, permission);
    }

    revokeViewPermission(permission: PermissionModel): Observable<{message: string}>{
        return this.__http.delete<{message: string}>(`${this.__apiUrl}view/${permission.id_user}/${permission.id_file}`);
    }

    revokeChangePermission(permission: PermissionModel): Observable<{message: string}>{
        return this.__http.delete<{message: string}>(`${this.__apiUrl}change/${permission.id_user}/${permission.id_file}`);
    }
}