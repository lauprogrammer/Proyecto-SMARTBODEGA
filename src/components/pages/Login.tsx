import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { LoginCredentials } from '@/types/user';

// 1. Definir esquema Zod para login con email
const loginSchema = z.object({
  email: z.string().email('Email inválido').min(1, 'El email es obligatorio'),
  password: z.string().min(1, 'La contraseña es obligatoria').min(6, 'La contraseña debe tener al menos 6 caracteres'),
  rol: z.enum(['administrador', 'supervisor', 'operador', 'invitado', 'instructor'], {
    required_error: 'El rol es obligatorio',
    invalid_type_error: 'Rol inválido'
  })
});

// 2. Tipo TypeScript inferido automáticamente
type LoginData = z.infer<typeof loginSchema>;

const Login = () => {
  const navigate = useNavigate();
  const { login, loading } = useAuth();
  
  // 3. Usar useForm con Zod
  const { register, handleSubmit, formState: { errors }, setError } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginData) => {
    const credentials: LoginCredentials = {
      email: data.email,
      password: data.password,
      rol: data.rol
    };

    const success = await login(credentials);
    if (success) {
      navigate('/dashboard');
    } else {
      setError('rol', { type: 'manual', message: 'El rol no coincide con el usuario o no tiene acceso.' });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative">
      {/* Imagen de fondo */}
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: 'url("/src/img/imagen sena.jpg")',
          filter: 'brightness(0.9)'
        }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-40" />

      {/* Formulario */}
      <div className="relative z-10 bg-black bg-opacity-70 p-8 rounded-lg shadow-xl w-96">
        <div className="flex justify-center mb-8">
          <img 
            src="/src/img/logo SENA.png" 
            alt="SENA Logo" 
            className="w-32 h-auto filter brightness-0 invert transform transition-all duration-500 hover:scale-105"
          />
        </div>

        <h2 className="text-2xl font-bold text-center text-white mb-6">INGRESAR AL SISTEMA</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <input
              type="email"
              placeholder="Correo electrónico"
              {...register('email')}
              className="w-full px-4 py-2 rounded bg-white bg-opacity-90 border border-gray-300 focus:outline-none focus:border-blue-500"
              disabled={loading}
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>

          <div>
            <input
              type="password"
              placeholder="Contraseña"
              {...register('password')}
              className="w-full px-4 py-2 rounded bg-white bg-opacity-90 border border-gray-300 focus:outline-none focus:border-blue-500"
              disabled={loading}
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>

          <div>
            <select
              {...register('rol')}
              className="w-full px-4 py-2 rounded bg-white bg-opacity-90 border border-gray-300 focus:outline-none focus:border-blue-500"
              disabled={loading}
              defaultValue=""
            >
              <option value="" disabled>Seleccione un rol</option>
              <option value="administrador">Administrador</option>
              <option value="supervisor">Supervisor</option>
              <option value="operador">Operador</option>
              <option value="invitado">Invitado</option>
              <option value="instructor">Instructor</option>
            </select>
            {errors.rol && <p className="text-red-500 text-sm">{errors.rol.message}</p>}
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 px-4 text-white font-semibold rounded transition duration-200 ${
              loading 
                ? 'bg-gray-500 cursor-not-allowed' 
                : 'bg-[#5D0F1D] hover:bg-[#4A0C17]'
            }`}
          >
            {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
          </button>
        </form>

        {/* Información de prueba */}
        <div className="mt-6 p-4 bg-white bg-opacity-10 rounded-lg">
          <h3 className="text-white text-sm font-semibold mb-2">Acceso Restringido:</h3>
          <div className="text-xs text-gray-300 space-y-1">
            <p className="text-yellow-300 font-medium">Solo administradores pueden acceder</p>
            <p><strong>Administrador:</strong> laura.ortiz@sena.edu.co / 123456</p>
            <p><strong>Supervisor:</strong> maria.garcia@sena.edu.co / 123456</p>
            <p><strong>Operador:</strong> carlos.lopez@sena.edu.co / 123456</p>
            <p><strong>Invitado:</strong> ana.rodriguez@sena.edu.co / 123456</p>
            <p><strong>Instructor:</strong> pedro.martinez@sena.edu.co / 123456</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
