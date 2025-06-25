import React, { useState } from 'react';
import { Shield, Check, X, Plus, Trash2, Edit, ChevronDown, ChevronUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-hot-toast';

// Esquema de validación con zod
const RoleSchema = z.object({
  name: z.string().min(1, 'El nombre del rol es requerido'),
  description: z.string().min(1, 'La descripción es requerida'),
  permissions: z.array(z.string()).min(1, 'Debes seleccionar al menos un permiso')
});

type RoleFormValues = z.infer<typeof RoleSchema>;

const RolesAndPermissions = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [selectedRole, setSelectedRole] = useState<any>(null);
  const [expandedRole, setExpandedRole] = useState<number | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [roleToDelete, setRoleToDelete] = useState<any>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const [roles, setRoles] = useState([
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
  ]);

  const allPermissions = [
    'Gestionar usuarios',
    'Gestionar roles',
    'Gestionar centros',
    'Gestionar sedes',
    'Gestionar inventario',
    'Gestionar entradas/salidas',
    'Ver inventario',
    'Solicitar productos',
    'Ver reportes',
    'Ver reportes básicos'
  ];

  const { register, handleSubmit, formState: { errors }, reset, setValue, watch } = useForm<RoleFormValues>({
    resolver: zodResolver(RoleSchema),
    defaultValues: {
      name: '',
      description: '',
      permissions: []
    }
  });

  const watchedPermissions = watch('permissions');

  const handleRoleClick = (roleId: number) => {
    setExpandedRole(expandedRole === roleId ? null : roleId);
  };

  const handleEditRole = (role: any) => {
    setSelectedRole(role);
    setShowModal(true);

    reset({
      name: role.name,
      description: role.description,
      permissions: role.permissions
    });
  };

  const handleDeleteRole = (role: any) => {
    setRoleToDelete(role);
    setShowDeleteConfirm(true);
  };

  const confirmDeleteRole = async () => {
    if (!roleToDelete) return;
    
    setIsDeleting(true);
    try {
      // Simular llamada a API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Eliminar el rol de la lista local
      setRoles(prevRoles => prevRoles.filter(role => role.id !== roleToDelete.id));
      
      toast.success(`Rol "${roleToDelete.name}" eliminado exitosamente`);
      setShowDeleteConfirm(false);
      setRoleToDelete(null);
    } catch (error) {
      toast.error('Error al eliminar el rol');
    } finally {
      setIsDeleting(false);
    }
  };

  const onSubmit = (data: RoleFormValues) => {
    if (selectedRole) {
      // Actualizar rol existente
      setRoles(prevRoles => 
        prevRoles.map(role => 
          role.id === selectedRole.id 
            ? { ...role, ...data }
            : role
        )
      );
      toast.success(`Rol "${data.name}" actualizado exitosamente`);
    } else {
      // Crear nuevo rol
      const newRole = {
        id: Math.max(...roles.map(r => r.id)) + 1,
        ...data
      };
      setRoles(prevRoles => [...prevRoles, newRole]);
      toast.success(`Rol "${data.name}" creado exitosamente`);
    }
    
    setShowModal(false);
    setSelectedRole(null);
    reset();
  };

  const handleCheckboxChange = (permission: string) => {
    const currentPermissions = watch('permissions');
    if (currentPermissions.includes(permission)) {
      setValue('permissions', currentPermissions.filter(p => p !== permission));
    } else {
      setValue('permissions', [...currentPermissions, permission]);
    }
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
                onClick={() => {
                  setShowModal(true);
                  reset();
                  setSelectedRole(null);
                }}
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
                        title="Editar rol"
                      >
                        <Edit className="w-4 h-4 text-gray-600" />
                      </button>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteRole(role);
                        }}
                        className="p-1 hover:bg-gray-200 rounded-full transition-colors"
                        title="Eliminar rol"
                      >
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </button>
                    </div>
                    {expandedRole === role.id ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </div>
                </div>
              </div>

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

      {/* Modal */}
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

            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label className="block text-sm font-medium text-gray-700">Nombre del Rol</label>
                <input
                  {...register('name')}
                  className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#5D0F1D]"
                  placeholder="Ej: Administrador"
                />
                {errors.name && (
                  <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Descripción</label>
                <textarea
                  {...register('description')}
                  className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#5D0F1D]"
                  rows={3}
                  placeholder="Describe las funciones y responsabilidades de este rol"
                />
                {errors.description && (
                  <p className="text-sm text-red-500 mt-1">{errors.description.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Permisos</label>
                <div className="space-y-2">
                  {allPermissions.map((permission) => (
                    <div key={permission} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={watchedPermissions.includes(permission)}
                        onChange={() => handleCheckboxChange(permission)}
                        className="rounded text-[#5D0F1D] focus:ring-[#5D0F1D]"
                      />
                      <label>{permission}</label>
                    </div>
                  ))}
                </div>
                {errors.permissions && (
                  <p className="text-sm text-red-500 mt-1">{errors.permissions.message}</p>
                )}
              </div>

              <div className="flex justify-end space-x-4 mt-6">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setSelectedRole(null);
                    reset();
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

      {/* Modal de confirmación de eliminación */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <div className="flex items-center space-x-4 mb-4">
              <Trash2 className="w-6 h-6 text-red-600" />
              <h2 className="text-xl font-bold text-gray-800">Confirmar Eliminación</h2>
            </div>
            <p className="text-gray-600 mb-4">
              ¿Estás seguro que deseas eliminar el rol "{roleToDelete?.name}"? Esta acción no se puede deshacer.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => {
                  setShowDeleteConfirm(false);
                  setRoleToDelete(null);
                }}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                disabled={isDeleting}
              >
                Cancelar
              </button>
              <button
                onClick={confirmDeleteRole}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50"
                disabled={isDeleting}
              >
                {isDeleting ? 'Eliminando...' : 'Eliminar'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RolesAndPermissions;
