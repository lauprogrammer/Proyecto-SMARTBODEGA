export interface User {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  rol: 'administrador' | 'supervisor' | 'operador' | 'invitado' | 'instructor';
  centro: string;
  sede: string;
  estado: 'activo' | 'inactivo';
  fechaCreacion: string;
  ultimoAcceso?: string;
}

export interface UserFormData {
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  password: string;
  rol: 'administrador' | 'supervisor' | 'operador' | 'invitado' | 'instructor';
  centro: string;
  sede: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
  rol: 'administrador' | 'supervisor' | 'operador' | 'invitado' | 'instructor';
}

export interface AuthUser {
  user: User;
  token: string;
  isAuthenticated: boolean;
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (credentials: LoginCredentials) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
} 