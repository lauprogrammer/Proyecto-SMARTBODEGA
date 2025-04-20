import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: '',
    contraseña: '',
    rol: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleDirectAccess = () => {
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative">
      {/* Imagen de fondo */}
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: 'url("/img/imagen sena.jpg")',
          filter: 'brightness(0.9)'
        }}
      />
      
      {/* Overlay para mejorar la legibilidad */}
      <div className="absolute inset-0 bg-black opacity-40" />

      {/* Contenido del formulario */}
      <div className="relative z-10 bg-black bg-opacity-70 p-8 rounded-lg shadow-xl w-96">
        {/* Logo SENA */}
        <div className="flex justify-center mb-8">
          <img 
            src="/img/logo SENA.png" 
            alt="SENA Logo" 
            className="w-32 h-auto filter brightness-0 invert transform transition-all duration-500 hover:scale-105"
          />
        </div>

        <h2 className="text-2xl font-bold text-center text-white mb-6">INGRESAR</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              name="nombre"
              placeholder="Nombre"
              value={formData.nombre}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded bg-white bg-opacity-90 border border-gray-300 focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          
          <div>
            <input
              type="password"
              name="contraseña"
              placeholder="Contraseña"
              value={formData.contraseña}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded bg-white bg-opacity-90 border border-gray-300 focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          
          <div>
            <input
              type="text"
              name="rol"
              placeholder="Rol"
              value={formData.rol}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded bg-white bg-opacity-90 border border-gray-300 focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          
          <button
            type="submit"
            className="w-full py-2 px-4 bg-[#5D0F1D] hover:bg-[#4A0C17] text-white font-semibold rounded transition duration-200"
          >
            Login
          </button>
        </form>

        {/* Botón de acceso directo */}
        <div className="mt-4 text-center">
          <button
            onClick={handleDirectAccess}
            className="text-white hover:text-gray-300 text-sm underline transition duration-200"
          >
            Acceder directamente al Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login; 