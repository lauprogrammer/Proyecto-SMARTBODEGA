
import React, { useState } from 'react';
import { UserPlus, User, Mail, Phone, Building2, MapPin, ChevronDown, ChevronUp, Edit, Trash2, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const UsersList = () => {
  const navigate = useNavigate();
  const [expandedRows, setExpandedRows] = useState<number[]>([]);
  const [showCreateForm, setShowCreateForm] = useState(false);

  // Datos de ejemplo para la tabla
  const users = [
    {
      id: 1,
      nombre: 'Juan',
      apellido: 'Pérez',
      email: 'juan@example.com',
      telefono: '1234567890',
      rol: 'Administrador',
      centro: 'Centro 1',
      sede: 'Sede 1',
      detalles: {
        fechaCreacion: '2024-01-01',
        ultimoAcceso: '2024-04-18',
        estado: 'Activo'
      }
    },
    {
      id: 2,
      nombre: 'María',
      apellido: 'González',
      email: 'maria@example.com',
      telefono: '0987654321',
      rol: 'Usuario',
      centro: 'Centro 2',
      sede: 'Sede 2',
      detalles: {
        fechaCreacion: '2024-02-15',
        ultimoAcceso: '2024-04-17',
        estado: 'Activo'
      }
    },
    {
      id: 3,
      nombre: 'Carlos',
      apellido: 'Rodríguez',
      email: 'carlos@example.com',
      telefono: '5551234567',
      rol: 'Gerente',
      centro: 'Centro 1',
      sede: 'Sede 1',
      detalles: {
        fechaCreacion: '2024-03-10',
        ultimoAcceso: '2024-04-18',
        estado: 'Inactivo'
      }
    }
  ];

  const toggleRow = (id: number) => {
    setExpandedRows(prev => 
      prev.includes(id) 
        ? prev.filter(rowId => rowId !== id)
        : [...prev, id]
    );
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate('/dashboard')}
              className="flex items-center space-x-2 text-[#5D0F1D] hover:text-[#7A1E2E]"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div className="flex items-center">
              <User className="w-8 h-8 text-[#5D0F1D] mr-2" />
              <h1 className="text-2xl font-bold text-[#5D0F1D]">Usuarios</h1>
            </div>
          </div>
          <button
            onClick={() => setShowCreateForm(!showCreateForm)}
            className="flex items-center space-x-2 px-4 py-2 bg-[#5D0F1D] text-white rounded-lg hover:bg-[#7A1E2E] transition-colors"
          >
            <UserPlus className="w-5 h-5" />
            <span>{showCreateForm ? 'Ver Lista' : 'Nuevo Usuario'}</span>
          </button>
        </div>

        {showCreateForm ? (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-[#5D0F1D]">Crear Nuevo Usuario</h2>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Nombre</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#5D0F1D] focus:border-transparent"
                  placeholder="Ingrese el nombre"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Apellido</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#5D0F1D] focus:border-transparent"
                  placeholder="Ingrese el apellido"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#5D0F1D] focus:border-transparent"
                  placeholder="Ingrese el email"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Teléfono</label>
                <input
                  type="tel"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#5D0F1D] focus:border-transparent"
                  placeholder="Ingrese el teléfono"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Rol</label>
                <select className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#5D0F1D] focus:border-transparent">
                  <option value="">Seleccione un rol</option>
                  <option value="admin">Administrador</option>
                  <option value="user">Usuario</option>
                  <option value="manager">Gerente</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Centro</label>
                <select className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#5D0F1D] focus:border-transparent">
                  <option value="">Seleccione un centro</option>
                  <option value="centro1">Centro 1</option>
                  <option value="centro2">Centro 2</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Sede</label>
                <select className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#5D0F1D] focus:border-transparent">
                  <option value="">Seleccione una sede</option>
                  <option value="sede1">Sede 1</option>
                  <option value="sede2">Sede 2</option>
                </select>
              </div>
              <div className="flex items-end space-x-4">
                <button
                  type="button"
                  onClick={() => setShowCreateForm(false)}
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
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <div className="flex items-center">
                      <User className="w-4 h-4 mr-2" />
                      Nombre
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <div className="flex items-center">
                      <Mail className="w-4 h-4 mr-2" />
                      Email
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <div className="flex items-center">
                      <Phone className="w-4 h-4 mr-2" />
                      Teléfono
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rol
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <div className="flex items-center">
                      <Building2 className="w-4 h-4 mr-2" />
                      Centro
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-2" />
                      Sede
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users.map((user) => (
                  <React.Fragment key={user.id}>
                    <tr className="hover:bg-gray-50 cursor-pointer" onClick={() => toggleRow(user.id)}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="text-sm font-medium text-gray-900">
                            {user.nombre} {user.apellido}
                          </div>
                          <button className="ml-2">
                            {expandedRows.includes(user.id) ? (
                              <ChevronUp className="w-4 h-4 text-gray-500" />
                            ) : (
                              <ChevronDown className="w-4 h-4 text-gray-500" />
                            )}
                          </button>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{user.email}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{user.telefono}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          {user.rol}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{user.centro}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{user.sede}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button className="text-[#5D0F1D] hover:text-[#7A1E2E] mr-3">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="text-red-600 hover:text-red-900">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                    {expandedRows.includes(user.id) && (
                      <tr className="bg-gray-50">
                        <td colSpan={7} className="px-6 py-4">
                          <div className="grid grid-cols-3 gap-4">
                            <div>
                              <h3 className="text-sm font-medium text-gray-500">Fecha de Creación</h3>
                              <p className="text-sm text-gray-900">{user.detalles.fechaCreacion}</p>
                            </div>
                            <div>
                              <h3 className="text-sm font-medium text-gray-500">Último Acceso</h3>
                              <p className="text-sm text-gray-900">{user.detalles.ultimoAcceso}</p>
                            </div>
                            <div>
                              <h3 className="text-sm font-medium text-gray-500">Estado</h3>
                              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                user.detalles.estado === 'Activo' 
                                  ? 'bg-green-100 text-green-800' 
                                  : 'bg-red-100 text-red-800'
                              }`}>
                                {user.detalles.estado}
                              </span>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default UsersList; 