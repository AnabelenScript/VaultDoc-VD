import { UserData } from "../auth/auth_model";

export interface UsersPermissions {
    message: string,
    users_p: UserData[],
    users_wp: UserData[],
}

export interface PermissionModel {
    id_file: number,
    id_user: number,
}

export interface MessagePermissionGranted {
    message: string,
    id_file: number,
    id_user: number,
}