import React, { useState } from 'react';
import { Shield, UserCog, Check, X, Plus, Trash2, Edit, ChevronDown, ChevronUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const RolesAndPermissions = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [selectedRole, setSelectedRole] = useState<any>(null);
  const [expandedRole, setExpandedRole] = useState<number | null>(null);

  // Datos de ejemplo para roles y permisos
  const roles = [
    {
      id: 1,
      name: 'Administrador',
      description: 'Acceso total al sistema',
      permissions: [
        'Gestionar usuarios',
        'Gestionar roles',
        'Gestionar centros',
        'Gestionar sedes',
        'Gestionar inventario',
        'Ver reportes'
      ]
    },
    {
      id: 2,
      name: 'Supervisor',
      description: 'Acceso a gestión y reportes',
      permissions: [
        'Gestionar inventario',
        'Ver reportes',
        'Gestionar entradas/salidas'
      ]
    },
    {
      id: 3,
      name: 'Usuario',
      description: 'Acceso básico al sistema',
      permissions: [
        'Ver inventario',
        'Solicitar productos',
        'Ver reportes básicos'
      ]
    }
  ];

  const handleRoleClick = (roleId: number) => {
    setExpandedRole(expandedRole === roleId ? null : roleId);
  };

  const handleEditRole = (role: any) => {
    setSelectedRole(role);
    setShowModal(true);
  };

  const handleDeleteRole = (role: any) => {
    // Aquí iría la lógica para eliminar el rol
    console.log(`Eliminando rol: ${role.name}`);
  };

  return (
    <div className="bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold text-[#5D0F1D]">Roles y Permisos</h1>
              <button 
                className="flex items-center space-x-2 bg-[#5D0F1D] text-white px-4 py-2 rounded-lg hover:bg-[#7A1E2E] transition-colors duration-200"
                onClick={() => setShowModal(true)}
              >
                <Plus className="w-5 h-5" />
                <span>Nuevo Rol</span>
              </button>
            </div>
          </div>
        </div>

        {/* Lista de Roles */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {roles.map((role) => (
            <div key={role.id} className="border-b last:border-b-0">
              <div
                className="p-4 hover:bg-gray-50 cursor-pointer transition-colors duration-200"
                onClick={() => handleRoleClick(role.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-[#5D0F1D] rounded-full flex items-center justify-center text-white">
                      <Shield className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-medium">{role.name}</h3>
                      <p className="text-sm text-gray-500">{role.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex space-x-2">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEditRole(role);
                        }}
                        className="p-1 hover:bg-gray-200 rounded-full transition-colors"
                      >
                        <Edit className="w-4 h-4 text-gray-600" />
                      </button>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteRole(role);
                        }}
                        className="p-1 hover:bg-gray-200 rounded-full transition-colors"
                      >
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </button>
                    </div>
                    {expandedRole === role.id ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </div>
                </div>
              </div>

              {/* Permisos Expandidos */}
              {expandedRole === role.id && (
                <div className="bg-gray-50 p-4 animate-fadeIn">
                  <h4 className="font-medium text-gray-700 mb-3">Permisos</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {role.permissions.map((permission, index) => (
                      <div key={index} className="flex items-center space-x-2 bg-white p-3 rounded-lg shadow-sm">
                        <Check className="w-4 h-4 text-green-500" />
                        <span className="text-sm text-gray-700">{permission}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Modal de Crear/Editar Rol */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-[#5D0F1D]">
                {selectedRole ? 'Editar Rol' : 'Nuevo Rol'}
              </h2>
              <button 
                onClick={() => {
                  setShowModal(false);
                  setSelectedRole(null);
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Nombre del Rol</label>
                <input
                  type="text"
                  defaultValue={selectedRole?.name}
                  className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#5D0F1D]"
                  placeholder="Ej: Administrador"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Descripción</label>
                <textarea
                  defaultValue={selectedRole?.description}
                  className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#5D0F1D]"
                  rows={3}
                  placeholder="Describe las funciones y responsabilidades de este rol"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Permisos</label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="manageUsers" className="rounded text-[#5D0F1D] focus:ring-[#5D0F1D]" />
                    <label htmlFor="manageUsers">Gestionar usuarios</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="manageRoles" className="rounded text-[#5D0F1D] focus:ring-[#5D0F1D]" />
                    <label htmlFor="manageRoles">Gestionar roles</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="manageInventory" className="rounded text-[#5D0F1D] focus:ring-[#5D0F1D]" />
                    <label htmlFor="manageInventory">Gestionar inventario</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="viewReports" className="rounded text-[#5D0F1D] focus:ring-[#5D0F1D]" />
                    <label htmlFor="viewReports">Ver reportes</label>
                  </div>
                </div>
              </div>
              <div className="flex justify-end space-x-4 mt-6">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setSelectedRole(null);
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#5D0F1D] text-white rounded-lg hover:bg-[#7A1E2E]"
                >
                  {selectedRole ? 'Actualizar' : 'Crear'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default RolesAndPermissions; 