import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';

// 1. Definir esquema Zod
const loginSchema = z.object({
  nombre: z.string().min(1, 'El nombre es obligatorio'),
  contraseña: z.string().min(1, 'La contraseña es obligatoria'),
  rol: z.enum(['administrador', 'supervisor', 'operador', 'invitado'], {
    errorMap: () => ({ message: 'Debe seleccionar un rol válido' }),
  }),
});

// 2. Tipo TypeScript inferido automáticamente
type LoginData = z.infer<typeof loginSchema>;

const Login = () => {
  const navigate = useNavigate();
  
  // 3. Usar useForm con Zod
  const { register, handleSubmit, formState: { errors } } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginData) => {
    console.log('Datos validados:', data);
    navigate('/dashboard');
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

        <h2 className="text-2xl font-bold text-center text-white mb-6">INGRESAR</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Nombre"
              {...register('nombre')}
              className="w-full px-4 py-2 rounded bg-white bg-opacity-90 border border-gray-300 focus:outline-none focus:border-blue-500"
            />
            {errors.nombre && <p className="text-red-500 text-sm">{errors.nombre.message}</p>}
          </div>

          <div>
            <input
              type="password"
              placeholder="Contraseña"
              {...register('contraseña')}
              className="w-full px-4 py-2 rounded bg-white bg-opacity-90 border border-gray-300 focus:outline-none focus:border-blue-500"
            />
            {errors.contraseña && <p className="text-red-500 text-sm">{errors.contraseña.message}</p>}
          </div>

          <div>
            <select
              {...register('rol')}
              className="w-full px-4 py-2 rounded bg-white bg-opacity-90 border border-gray-300 focus:outline-none focus:border-blue-500"
            >
              <option value="">Seleccione un rol</option>
              <option value="administrador">Administrador</option>
              <option value="supervisor">Supervisor</option>
              <option value="operador">Operador</option>
              <option value="invitado">Invitado</option>
            </select>
            {errors.rol && <p className="text-red-500 text-sm">{errors.rol.message}</p>}
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-[#5D0F1D] hover:bg-[#4A0C17] text-white font-semibold rounded transition duration-200"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
