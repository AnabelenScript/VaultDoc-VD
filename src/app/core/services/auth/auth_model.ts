export interface UserData {
  id: number;
  nombre: string;
  apellidos: string;
  email: string;
  roleID: number;
  departament: string;
}

export interface LoginResponse {
  message: string;
  token: string;
  user: UserData;
}