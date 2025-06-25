import { LoginCredentials, AuthUser, User } from '@/types/user';

// Datos de ejemplo para usuarios (simula base de datos)
const mockUsers: User[] = [
  {
    id: 1,
    nombre: 'Laura',
    apellido: 'Ortiz',
    email: 'laura.ortiz@sena.edu.co',
    telefono: '3001234567',
    rol: 'administrador',
    centro: 'Centro de Tecnologías Agroindustriales',
    sede: 'Sede Principal',
    estado: 'activo',
    fechaCreacion: '2024-01-15',
    ultimoAcceso: '2024-04-18T10:30:00'
  },
  {
    id: 2,
    nombre: 'María',
    apellido: 'García',
    email: 'maria.garcia@sena.edu.co',
    telefono: '3002345678',
    rol: 'supervisor',
    centro: 'Centro de Tecnologías Agroindustriales',
    sede: 'Sede Principal',
    estado: 'activo',
    fechaCreacion: '2024-02-20',
    ultimoAcceso: '2024-04-18T09:15:00'
  },
  {
    id: 3,
    nombre: 'Carlos',
    apellido: 'López',
    email: 'carlos.lopez@sena.edu.co',
    telefono: '3003456789',
    rol: 'operador',
    centro: 'Centro de Tecnologías Agroindustriales',
    sede: 'Sede Secundaria',
    estado: 'activo',
    fechaCreacion: '2024-03-10',
    ultimoAcceso: '2024-04-17T16:45:00'
  },
  {
    id: 4,
    nombre: 'Ana',
    apellido: 'Rodríguez',
    email: 'ana.rodriguez@sena.edu.co',
    telefono: '3004567890',
    rol: 'invitado',
    centro: 'Centro de Tecnologías Agroindustriales',
    sede: 'Sede Principal',
    estado: 'activo',
    fechaCreacion: '2024-01-25',
    ultimoAcceso: '2024-04-16T14:20:00'
  }
];

export const authService = {
  // Login con email y contraseña
  login: async (credentials: LoginCredentials): Promise<AuthUser> => {
    try {
      // Simular llamada a API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Buscar usuario por email
      const user = mockUsers.find(u => u.email === credentials.email);
      
      if (!user) {
        throw new Error('Usuario no encontrado');
      }
      
      // Simular validación de contraseña (en producción sería hash)
      if (credentials.password !== '123456') {
        throw new Error('Contraseña incorrecta');
      }
      
      // Verificar que el usuario esté activo
      if (user.estado !== 'activo') {
        throw new Error('Usuario inactivo');
      }
      
      // Validar que el rol seleccionado coincida con el del usuario
      if (user.rol !== credentials.rol) {
        throw new Error('El rol seleccionado no coincide con el usuario.');
      }
      
      // Generar token simulado
      const token = `token_${user.id}_${Date.now()}`;
      
      // Actualizar último acceso
      user.ultimoAcceso = new Date().toISOString();
      
      // Guardar en localStorage
      localStorage.setItem('authToken', token);
      localStorage.setItem('user', JSON.stringify(user));
      
      return {
        user,
        token,
        isAuthenticated: true
      };
    } catch (error) {
      throw error;
    }
  },

  // Logout
  logout: async (): Promise<void> => {
    try {
      // Simular llamada a API
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Limpiar localStorage
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
    } catch (error) {
      console.error('Error en logout:', error);
    }
  },

  // Verificar si el usuario está autenticado
  checkAuth: (): AuthUser | null => {
    const token = localStorage.getItem('authToken');
    const userStr = localStorage.getItem('user');
    
    if (!token || !userStr) {
      return null;
    }
    
    try {
      const user = JSON.parse(userStr);
      return {
        user,
        token,
        isAuthenticated: true
      };
    } catch (error) {
      console.error('Error parsing user data:', error);
      return null;
    }
  },

  // Obtener usuario actual
  getCurrentUser: (): User | null => {
    const userStr = localStorage.getItem('user');
    if (!userStr) return null;
    
    try {
      return JSON.parse(userStr);
    } catch (error) {
      console.error('Error parsing user data:', error);
      return null;
    }
  },

  // Validar token
  validateToken: async (): Promise<boolean> => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) return false;
      
      // Simular validación de token
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // En producción, aquí se validaría el token con el backend
      return true;
    } catch (error) {
      return false;
    }
  }
}; 