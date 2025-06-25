import React, { useState, useEffect } from 'react';
import { Building2, Search, Plus, Edit, Trash2, ChevronDown, ChevronUp, X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-hot-toast';

// Esquema de validación con Zod
const CenterSchema = z.object({
  name: z.string().min(1, 'El nombre del centro es requerido'),
  location: z.string().min(1, 'La ubicación es requerida'),
  type: z.string().min(1, 'El tipo es requerido'),
  status: z.enum(['Activo', 'Inactivo']),
  address: z.string().min(1, 'La dirección es requerida'),
  phone: z.string().min(1, 'El teléfono es requerido'),
  email: z.string().email('Email inválido'),
  manager: z.string().min(1, 'El gerente es requerido')
});

type CenterFormValues = z.infer<typeof CenterSchema>;

const CentersManagement = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedCenter, setSelectedCenter] = useState<any>(null);
  const [expandedCenter, setExpandedCenter] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [centerToDelete, setCenterToDelete] = useState<any>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const [centers, setCenters] = useState([
    {
      id: 1,
      name: 'Centro Principal',
      location: 'Ciudad A',
      type: 'Sede Principal',
      status: 'Activo',
      details: {
        address: 'Calle 123 #45-67',
        phone: '123-456-7890',
        email: 'centro.principal@example.com',
        manager: 'Laura Ortiz',
        created: '2024-01-15',
        lastUpdate: '2024-04-18'
      }
    },
    {
      id: 2,
      name: 'Centro Norte',
      location: 'Ciudad B',
      type: 'Sede Secundaria',
      status: 'Activo',
      details: {
        address: 'Avenida 789 #12-34',
        phone: '098-765-4321',
        email: 'centro.norte@example.com',
        manager: 'Daniela Salgado',
        created: '2024-02-20',
        lastUpdate: '2024-04-17'
      }
    },
    {
      id: 3,
      name: 'Centro Sur',
      location: 'Ciudad C',
      type: 'Sede Secundaria',
      status: 'Inactivo',
      details: {
        address: 'Carrera 456 #78-90',
        phone: '555-123-4567',
        email: 'centro.sur@example.com',
        manager: 'Andres Peña',
        created: '2024-03-10',
        lastUpdate: '2024-04-16'
      }
    }
  ]);

  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm<CenterFormValues>({
    resolver: zodResolver(CenterSchema),
    defaultValues: {
      name: '',
      location: '',
      type: '',
      status: 'Activo',
      address: '',
      phone: '',
      email: '',
      manager: ''
    }
  });

  const handleCenterClick = (centerId: number) => {
    setExpandedCenter(expandedCenter === centerId ? null : centerId);
  };

  const handleEditCenter = (center: any) => {
    setSelectedCenter(center);
    setValue('name', center.name);
    setValue('location', center.location);
    setValue('type', center.type);
    setValue('status', center.status);
    setValue('address', center.details.address);
    setValue('phone', center.details.phone);
    setValue('email', center.details.email);
    setValue('manager', center.details.manager);
    setShowModal(true);
  };

  const handleDeleteCenter = (center: any) => {
    setCenterToDelete(center);
    setShowDeleteConfirm(true);
  };

  const confirmDeleteCenter = async () => {
    if (!centerToDelete) return;
    
    setIsDeleting(true);
    try {
      // Simular llamada a API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Eliminar el centro de la lista local
      setCenters(prevCenters => prevCenters.filter(center => center.id !== centerToDelete.id));
      
      toast.success(`Centro "${centerToDelete.name}" eliminado exitosamente`);
      setShowDeleteConfirm(false);
      setCenterToDelete(null);
    } catch (error) {
      toast.error('Error al eliminar el centro');
    } finally {
      setIsDeleting(false);
    }
  };

  const onSubmit = (data: CenterFormValues) => {
    if (selectedCenter) {
      // Actualizar centro existente
      setCenters(prevCenters => 
        prevCenters.map(center => 
          center.id === selectedCenter.id 
            ? {
                ...center,
                name: data.name,
                location: data.location,
                type: data.type,
                status: data.status,
                details: {
                  ...center.details,
                  address: data.address,
                  phone: data.phone,
                  email: data.email,
                  manager: data.manager,
                  lastUpdate: new Date().toISOString().split('T')[0]
                }
              }
            : center
        )
      );
      toast.success(`Centro "${data.name}" actualizado exitosamente`);
    } else {
      // Crear nuevo centro
      const newCenter = {
        id: Math.max(...centers.map(c => c.id)) + 1,
        name: data.name,
        location: data.location,
        type: data.type,
        status: data.status,
        details: {
          address: data.address,
          phone: data.phone,
          email: data.email,
          manager: data.manager,
          created: new Date().toISOString().split('T')[0],
          lastUpdate: new Date().toISOString().split('T')[0]
        }
      };
      setCenters(prevCenters => [...prevCenters, newCenter]);
      toast.success(`Centro "${data.name}" creado exitosamente`);
    }
    
    setShowModal(false);
    setSelectedCenter(null);
    reset();
  };

  const filteredCenters = centers.filter(center =>
    center.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    center.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    center.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold text-[#5D0F1D]">Gestión de Centros</h1>
              <button 
                className="flex items-center space-x-2 bg-[#5D0F1D] text-white px-4 py-2 rounded-lg hover:bg-[#7A1E2E] transition-colors duration-200"
                onClick={() => {
                  setShowModal(true);
                  reset();
                  setSelectedCenter(null);
                }}
              >
                <Plus className="w-5 h-5" />
                <span>Nuevo Centro</span>
              </button>
            </div>
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar centros..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border rounded-lg w-64 focus:ring-2 focus:ring-[#5D0F1D] focus:border-transparent"
              />
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            </div>
          </div>
        </div>

        {/* Lista de Centros */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {filteredCenters.map((center) => (
            <div key={center.id} className="border-b last:border-b-0">
              <div
                className="p-4 hover:bg-gray-50 cursor-pointer transition-colors duration-200"
                onClick={() => handleCenterClick(center.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-[#5D0F1D] rounded-full flex items-center justify-center text-white">
                      <Building2 className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-medium">{center.name}</h3>
                      <p className="text-sm text-gray-500">{center.location}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      center.status === 'Activo' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {center.status}
                    </span>
                    <div className="flex space-x-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEditCenter(center);
                        }}
                        className="p-1 hover:bg-gray-200 rounded-full transition-colors"
                        title="Editar centro"
                      >
                        <Edit className="w-4 h-4 text-gray-600" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteCenter(center);
                        }}
                        className="p-1 hover:bg-gray-200 rounded-full transition-colors"
                        title="Eliminar centro"
                      >
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </button>
                    </div>
                    {expandedCenter === center.id ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </div>
                </div>
              </div>

              {/* Detalles del Centro Expandidos */}
              {expandedCenter === center.id && (
                <div className="bg-gray-50 p-4 animate-fadeIn">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <h4 className="font-medium text-gray-700">Información de Contacto</h4>
                      <p className="text-sm">
                        <span className="text-gray-500">Dirección:</span> {center.details.address}
                      </p>
                      <p className="text-sm">
                        <span className="text-gray-500">Teléfono:</span> {center.details.phone}
                      </p>
                      <p className="text-sm">
                        <span className="text-gray-500">Email:</span> {center.details.email}
                      </p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-medium text-gray-700">Administración</h4>
                      <p className="text-sm">
                        <span className="text-gray-500">Gerente:</span> {center.details.manager}
                      </p>
                      <p className="text-sm">
                        <span className="text-gray-500">Tipo:</span> {center.type}
                      </p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-medium text-gray-700">Fechas</h4>
                      <p className="text-sm">
                        <span className="text-gray-500">Creado:</span> {center.details.created}
                      </p>
                      <p className="text-sm">
                        <span className="text-gray-500">Última actualización:</span> {center.details.lastUpdate}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Modal de Crear/Editar Centro */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-[#5D0F1D]">
                {selectedCenter ? 'Editar Centro' : 'Nuevo Centro'}
              </h2>
              <button 
                onClick={() => {
                  setShowModal(false);
                  setSelectedCenter(null);
                  reset();
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Nombre del Centro</label>
                  <input
                    {...register('name')}
                    className={`w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#5D0F1D] ${
                      errors.name ? 'border-red-500' : ''
                    }`}
                    placeholder="Ej: Centro Principal"
                  />
                  {errors.name && (
                    <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Ubicación</label>
                  <input
                    {...register('location')}
                    className={`w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#5D0F1D] ${
                      errors.location ? 'border-red-500' : ''
                    }`}
                    placeholder="Ej: Ciudad A"
                  />
                  {errors.location && (
                    <p className="text-sm text-red-500 mt-1">{errors.location.message}</p>
                  )}
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Tipo</label>
                  <select
                    {...register('type')}
                    className={`w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#5D0F1D] ${
                      errors.type ? 'border-red-500' : ''
                    }`}
                  >
                    <option value="">Seleccionar tipo</option>
                    <option value="Sede Principal">Sede Principal</option>
                    <option value="Sede Secundaria">Sede Secundaria</option>
                  </select>
                  {errors.type && (
                    <p className="text-sm text-red-500 mt-1">{errors.type.message}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Estado</label>
                  <select
                    {...register('status')}
                    className={`w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#5D0F1D] ${
                      errors.status ? 'border-red-500' : ''
                    }`}
                  >
                    <option value="Activo">Activo</option>
                    <option value="Inactivo">Inactivo</option>
                  </select>
                  {errors.status && (
                    <p className="text-sm text-red-500 mt-1">{errors.status.message}</p>
                  )}
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Dirección</label>
                  <input
                    {...register('address')}
                    className={`w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#5D0F1D] ${
                      errors.address ? 'border-red-500' : ''
                    }`}
                    placeholder="Ej: Calle 123 #45-67"
                  />
                  {errors.address && (
                    <p className="text-sm text-red-500 mt-1">{errors.address.message}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Teléfono</label>
                  <input
                    {...register('phone')}
                    className={`w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#5D0F1D] ${
                      errors.phone ? 'border-red-500' : ''
                    }`}
                    placeholder="Ej: 123-456-7890"
                  />
                  {errors.phone && (
                    <p className="text-sm text-red-500 mt-1">{errors.phone.message}</p>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    {...register('email')}
                    type="email"
                    className={`w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#5D0F1D] ${
                      errors.email ? 'border-red-500' : ''
                    }`}
                    placeholder="ejemplo@correo.com"
                  />
                  {errors.email && (
                    <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Gerente</label>
                  <input
                    {...register('manager')}
                    className={`w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#5D0F1D] ${
                      errors.manager ? 'border-red-500' : ''
                    }`}
                    placeholder="Nombre del gerente"
                  />
                  {errors.manager && (
                    <p className="text-sm text-red-500 mt-1">{errors.manager.message}</p>
                  )}
                </div>
              </div>
              
              <div className="flex justify-end space-x-4 mt-6">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setSelectedCenter(null);
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
                  {selectedCenter ? 'Actualizar' : 'Crear'}
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
              ¿Estás seguro que deseas eliminar el centro "{centerToDelete?.name}"? Esta acción no se puede deshacer.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => {
                  setShowDeleteConfirm(false);
                  setCenterToDelete(null);
                }}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                disabled={isDeleting}
              >
                Cancelar
              </button>
              <button
                onClick={confirmDeleteCenter}
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

export default CentersManagement; 