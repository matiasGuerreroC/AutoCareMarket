// Define las interfaces que tu frontend enviará y recibirá del backend
export interface AuthCredentials {
  email: string;
  password: string;
  username?: string; // Solo necesario para registro
}

export interface UserData {
  id: string;
  username: string;
  email: string;
}

export interface AuthResponse {
  message: string;
  token: string; // El JWT que recibimos del backend
  user: UserData; // Datos básicos del usuario logueado
}
export interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    role: 'user' | 'admin'; // Añade el campo de rol
    createdAt: Date;
    comparePassword(candidatePassword: string): Promise<boolean>;
}
