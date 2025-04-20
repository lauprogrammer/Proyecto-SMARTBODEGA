import React, { useState } from 'react';
import { UserPlus, Mail, Lock, User, Phone, Building2, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CreateUser = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    password: '',
    confirmPassword: '',
    rol: '',
    centro: '',
    sede: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí irá la lógica para enviar los datos
    console.log(formData);
    navigate('/users');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center mb-6">
          <UserPlus className="w-8 h-8 text-[#5D0F1D] mr-2" />
          <h1 className="text-2xl font-bold text-[#5D0F1D]">Crear Nuevo Usuario</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Nombre */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Nombre</label>
              <div className="relative">
                <User className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#5D0F1D] focus:border-transparent"
                  placeholder="Ingrese el nombre"
                  required
                />
              </div>
            </div>

            {/* Apellido */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Apellido</label>
              <div className="relative">
                <User className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  name="apellido"
                  value={formData.apellido}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#5D0F1D] focus:border-transparent"
                  placeholder="Ingrese el apellido"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#5D0F1D] focus:border-transparent"
                  placeholder="Ingrese el email"
                  required
                />
              </div>
            </div>

            {/* Teléfono */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Teléfono</label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="tel"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#5D0F1D] focus:border-transparent"
                  placeholder="Ingrese el teléfono"
                  required
                />
              </div>
            </div>

            {/* Contraseña */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Contraseña</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#5D0F1D] focus:border-transparent"
                  placeholder="Ingrese la contraseña"
                  required
                />
              </div>
            </div>

            {/* Confirmar Contraseña */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Confirmar Contraseña</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#5D0F1D] focus:border-transparent"
                  placeholder="Confirme la contraseña"
                  required
                />
              </div>
            </div>

            {/* Rol */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Rol</label>
              <select
                name="rol"
                value={formData.rol}
                onChange={handleChange}
                className="w-full pl-4 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#5D0F1D] focus:border-transparent"
                required
              >
                <option value="">Seleccione un rol</option>
                <option value="admin">Administrador</option>
                <option value="user">Usuario</option>
                <option value="manager">Gerente</option>
              </select>
            </div>

            {/* Centro */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Centro</label>
              <div className="relative">
                <Building2 className="absolute left-3 top-3 text-gray-400" />
                <select
                  name="centro"
                  value={formData.centro}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#5D0F1D] focus:border-transparent"
                  required
                >
                  <option value="">Seleccione un centro</option>
                  <option value="centro1">Centro 1</option>
                  <option value="centro2">Centro 2</option>
                </select>
              </div>
            </div>

            {/* Sede */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Sede</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 text-gray-400" />
                <select
                  name="sede"
                  value={formData.sede}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#5D0F1D] focus:border-transparent"
                  required
                >
                  <option value="">Seleccione una sede</option>
                  <option value="sede1">Sede 1</option>
                  <option value="sede2">Sede 2</option>
                </select>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => navigate('/users')}
              className="px-6 py-2 border border-[#5D0F1D] text-[#5D0F1D] rounded-lg hover:bg-gray-100 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-[#5D0F1D] text-white rounded-lg hover:bg-[#7A1E2E] transition-colors"
            >
              Crear Usuario
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateUser; 