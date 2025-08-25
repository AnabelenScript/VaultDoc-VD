export interface UserData {
  id: number;
  nombre: string;
  apellidos: string;
  email: string;
  id_rol: number;
}

export interface LoginResponse {
  message: string;
  token: string;
  user: UserData;
}