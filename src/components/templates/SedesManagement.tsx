import React, { useState } from 'react';
import { Building2, Search, Plus, Edit, Trash2, X } from 'lucide-react';
import { z } from 'zod';
import { toast } from 'react-hot-toast';

// Esquema de validación con Zod
const sedeSchema = z.object({
  name: z.string().min(1, 'Nombre requerido'),
  location: z.string().min(1, 'Ubicación requerida'),
  type: z.enum(['Principal', 'Secundaria']),
  status: z.enum(['Activo', 'Inactivo']),
  address: z.string().min(1, 'Dirección requerida'),
  phone: z.string().min(1, 'Teléfono requerido'),
  email: z.string().email('Email inválido'),
  manager: z.string().min(1, 'Gerente requerido')
});

const SedesManagement = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedSede, setSelectedSede] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [sedeToDelete, setSedeToDelete] = useState<any>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Datos de ejemplo
  const [sedes, setSedes] = useState([
    {
      id: 1,
      name: 'Sede Principal',
      location: 'Ciudad Principal',
      type: 'Principal',
      status: 'Activo',
      details: {
        address: 'Calle Principal 123',
        phone: '123-456-7890',
        email: 'sede@example.com',
        manager: 'Juan Pérez'
      }
    },
    {
      id: 2,
      name: 'Sede Norte',
      location: 'Ciudad Norte',
      type: 'Secundaria',
      status: 'Activo',
      details: {
        address: 'Calle Norte 456',
        phone: '987-654-3210',
        email: 'norte@example.com',
        manager: 'María García'
      }
    }
  ]);

  // Filtrar sedes según búsqueda
  const filteredSedes = sedes.filter(sede =>
    sede.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sede.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Editar sede
  const handleEditSede = (sede: any) => {
    setSelectedSede(sede);
    setShowModal(true);
  };

  // Eliminar sede
  const handleDeleteSede = (sede: any) => {
    setSedeToDelete(sede);
    setShowDeleteConfirm(true);
  };

  const confirmDeleteSede = async () => {
    if (!sedeToDelete) return;
    
    setIsDeleting(true);
    try {
      // Simular llamada a API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Eliminar la sede de la lista local
      setSedes(prevSedes => prevSedes.filter(sede => sede.id !== sedeToDelete.id));
      
      toast.success(`Sede "${sedeToDelete.name}" eliminada exitosamente`);
      setShowDeleteConfirm(false);
      setSedeToDelete(null);
    } catch (error) {
      toast.error('Error al eliminar la sede');
    } finally {
      setIsDeleting(false);
    }
  };

  // Enviar formulario
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const data = {
      name: form.get('name'),
      location: form.get('location'),
      type: form.get('type'),
      status: form.get('status'),
      address: form.get('address'),
      phone: form.get('phone'),
      email: form.get('email'),
      manager: form.get('manager')
    };

    const result = sedeSchema.safeParse(data);
    if (!result.success) {
      const errors: Record<string, string> = {};
      result.error.errors.forEach(err => {
        if (err.path[0]) {
          errors[err.path[0] as string] = err.message;
        }
      });
      setFormErrors(errors);
    } else {
      if (selectedSede) {
        // Actualizar sede existente
        setSedes(prevSedes => 
          prevSedes.map(sede => 
            sede.id === selectedSede.id 
              ? {
                  ...sede,
                  name: result.data.name,
                  location: result.data.location,
                  type: result.data.type,
                  status: result.data.status,
                  details: {
                    address: result.data.address,
                    phone: result.data.phone,
                    email: result.data.email,
                    manager: result.data.manager
                  }
                }
              : sede
          )
        );
        toast.success(`Sede "${result.data.name}" actualizada exitosamente`);
      } else {
        // Crear nueva sede
        const newSede = {
          id: Math.max(...sedes.map(s => s.id)) + 1,
          name: result.data.name,
          location: result.data.location,
          type: result.data.type,
          status: result.data.status,
          details: {
            address: result.data.address,
            phone: result.data.phone,
            email: result.data.email,
            manager: result.data.manager
          }
        };
        setSedes(prevSedes => [...prevSedes, newSede]);
        toast.success(`Sede "${result.data.name}" creada exitosamente`);
      }
      
      setFormErrors({});
      setShowModal(false);
      setSelectedSede(null);
    }
  };

  return (
    <div className="bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Encabezado */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold text-[#5D0F1D]">Gestión de Sedes</h1>
              <button 
                className="flex items-center space-x-2 bg-[#5D0F1D] text-white px-4 py-2 rounded-lg hover:bg-[#7A1E2E] transition-colors duration-200"
                onClick={() => {
                  setShowModal(true);
                  setSelectedSede(null);
                  setFormErrors({});
                }}
              >
                <Plus className="w-5 h-5" />
                <span>Nueva Sede</span>
              </button>
            </div>
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar sedes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border rounded-lg w-64 focus:ring-2 focus:ring-[#5D0F1D] focus:border-transparent"
              />
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            </div>
          </div>
        </div>

        {/* Tabla de sedes */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-[#5D0F1D]">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-white uppercase tracking-wider">Nombre</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-white uppercase tracking-wider">Ubicación</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-white uppercase tracking-wider">Tipo</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-white uppercase tracking-wider">Estado</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-white uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredSedes.map((sede) => (
                <tr key={sede.id}>
                  <td className="px-4 py-2 text-sm text-gray-900">{sede.name}</td>
                  <td className="px-4 py-2 text-sm text-gray-900">{sede.location}</td>
                  <td className="px-4 py-2 text-sm text-gray-900">{sede.type}</td>
                  <td className="px-4 py-2 text-sm">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${sede.status === 'Activo' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {sede.status}
                    </span>
                  </td>
                  <td className="px-4 py-2 text-sm flex gap-2">
                    <button 
                      className="text-[#5D0F1D] hover:text-[#7A1E2E]" 
                      onClick={() => handleEditSede(sede)}
                      title="Editar sede"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button 
                      className="text-red-500 hover:text-red-700" 
                      onClick={() => handleDeleteSede(sede)}
                      title="Eliminar sede"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Modal de formulario */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-[#5D0F1D]">
                  {selectedSede ? 'Editar Sede' : 'Nueva Sede'}
                </h2>
                <button 
                  onClick={() => {
                    setShowModal(false);
                    setSelectedSede(null);
                    setFormErrors({});
                  }}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Primera fila */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Nombre</label>
                    <input 
                      name="name" 
                      defaultValue={selectedSede?.name} 
                      className={`w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#5D0F1D] ${
                        formErrors.name ? 'border-red-500' : ''
                      }`}
                    />
                    {formErrors.name && <p className="text-red-500 text-sm">{formErrors.name}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Ubicación</label>
                    <input 
                      name="location" 
                      defaultValue={selectedSede?.location} 
                      className={`w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#5D0F1D] ${
                        formErrors.location ? 'border-red-500' : ''
                      }`}
                    />
                    {formErrors.location && <p className="text-red-500 text-sm">{formErrors.location}</p>}
                  </div>
                </div>

                {/* Segunda fila */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Tipo</label>
                    <select 
                      name="type" 
                      defaultValue={selectedSede?.type} 
                      className={`w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#5D0F1D] ${
                        formErrors.type ? 'border-red-500' : ''
                      }`}
                    >
                      <option value="Principal">Principal</option>
                      <option value="Secundaria">Secundaria</option>
                    </select>
                    {formErrors.type && <p className="text-red-500 text-sm">{formErrors.type}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Estado</label>
                    <select 
                      name="status" 
                      defaultValue={selectedSede?.status} 
                      className={`w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#5D0F1D] ${
                        formErrors.status ? 'border-red-500' : ''
                      }`}
                    >
                      <option value="Activo">Activo</option>
                      <option value="Inactivo">Inactivo</option>
                    </select>
                    {formErrors.status && <p className="text-red-500 text-sm">{formErrors.status}</p>}
                  </div>
                </div>

                {/* Tercera fila */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Dirección</label>
                    <input 
                      name="address" 
                      defaultValue={selectedSede?.details?.address} 
                      className={`w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#5D0F1D] ${
                        formErrors.address ? 'border-red-500' : ''
                      }`}
                    />
                    {formErrors.address && <p className="text-red-500 text-sm">{formErrors.address}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Teléfono</label>
                    <input 
                      name="phone" 
                      defaultValue={selectedSede?.details?.phone} 
                      className={`w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#5D0F1D] ${
                        formErrors.phone ? 'border-red-500' : ''
                      }`}
                    />
                    {formErrors.phone && <p className="text-red-500 text-sm">{formErrors.phone}</p>}
                  </div>
                </div>

                {/* Cuarta fila */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input 
                      name="email" 
                      defaultValue={selectedSede?.details?.email} 
                      className={`w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#5D0F1D] ${
                        formErrors.email ? 'border-red-500' : ''
                      }`}
                    />
                    {formErrors.email && <p className="text-red-500 text-sm">{formErrors.email}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Gerente</label>
                    <input 
                      name="manager" 
                      defaultValue={selectedSede?.details?.manager} 
                      className={`w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#5D0F1D] ${
                        formErrors.manager ? 'border-red-500' : ''
                      }`}
                    />
                    {formErrors.manager && <p className="text-red-500 text-sm">{formErrors.manager}</p>}
                  </div>
                </div>

                <div className="flex justify-end space-x-4 mt-6">
                  <button 
                    type="button"
                    onClick={() => {
                      setShowModal(false);
                      setSelectedSede(null);
                      setFormErrors({});
                    }}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    Cancelar
                  </button>
                  <button type="submit" className="bg-[#5D0F1D] text-white px-6 py-2 rounded-lg hover:bg-[#7A1E2E]">
                    {selectedSede ? 'Actualizar' : 'Guardar'}
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
                ¿Estás seguro que deseas eliminar la sede "{sedeToDelete?.name}"? Esta acción no se puede deshacer.
              </p>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => {
                    setShowDeleteConfirm(false);
                    setSedeToDelete(null);
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  disabled={isDeleting}
                >
                  Cancelar
                </button>
                <button
                  onClick={confirmDeleteSede}
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
    </div>
  );
};

export default SedesManagement;
