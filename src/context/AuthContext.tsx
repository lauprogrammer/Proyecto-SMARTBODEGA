import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AuthContextType, User, LoginCredentials } from '@/types/user';
import { authService } from '@/api/authService';
import { toast } from 'react-hot-toast';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Verificar autenticación al cargar la aplicación
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const authData = authService.checkAuth();
        if (authData) {
          const isValid = await authService.validateToken();
          if (isValid) {
            setUser(authData.user);
            setIsAuthenticated(true);
          } else {
            // Token inválido, limpiar datos
            await authService.logout();
          }
        }
      } catch (error) {
        console.error('Error checking auth:', error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (credentials: LoginCredentials): Promise<boolean> => {
    try {
      setLoading(true);
      const authData = await authService.login(credentials);
      setUser(authData.user);
      setIsAuthenticated(true);
      toast.success(`Bienvenido, ${authData.user.nombre} ${authData.user.apellido}`);
      return true;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error en el login';
      
      // Mostrar mensaje específico para acceso denegado
      if (errorMessage.includes('Acceso denegado')) {
        toast.error('Acceso denegado. Solo los administradores pueden acceder al sistema.', {
          duration: 5000,
          style: {
            background: '#dc2626',
            color: '#fff',
          },
        });
      } else {
        toast.error(errorMessage);
      }
      
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      await authService.logout();
      setUser(null);
      setIsAuthenticated(false);
      toast.success('Sesión cerrada exitosamente');
    } catch (error) {
      console.error('Error en logout:', error);
      toast.error('Error al cerrar sesión');
    } finally {
      setLoading(false);
    }
  };

  const value: AuthContextType = {
    user,
    isAuthenticated,
    login,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 