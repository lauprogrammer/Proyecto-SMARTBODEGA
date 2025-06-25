import React, { useState } from 'react';
import { LayoutGrid, Search, Plus, Edit, Trash2, X } from 'lucide-react';
import { z } from 'zod';
import { toast } from 'react-hot-toast';

const AreasManagement = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedArea, setSelectedArea] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [areaToDelete, setAreaToDelete] = useState<any>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    status: 'Activo',
    capacity: 0,
    manager: '',
    location: ''
  });
  const [formErrors, setFormErrors] = useState<any>({});

  // Datos de ejemplo para áreas
  const [areas, setAreas] = useState([
    {
      id: 1,
      name: 'Área de Administración',
      description: 'Área dedicada a la gestión administrativa',
      status: 'Activo',
      details: {
        manager: 'Juan Pérez',
        capacity: 20,
        location: 'Piso 1'
      }
    },
    {
      id: 2,
      name: 'Área de Desarrollo',
      description: 'Área para el equipo de desarrollo',
      status: 'Activo',
      details: {
        manager: 'María García',
        capacity: 15,
        location: 'Piso 2'
      }
    },
    {
      id: 3,
      name: 'Área de Soporte',
      description: 'Área para el equipo de soporte técnico',
      status: 'Activo',
      details: {
        manager: 'Carlos López',
        capacity: 12,
        location: 'Piso 1'
      }
    }
  ]);

  // Zod schema para la validación
  const areaSchema = z.object({
    name: z.string().min(1, { message: "El nombre es obligatorio" }),
    description: z.string().min(1, { message: "La descripción es obligatoria" }),
    status: z.enum(['Activo', 'Inactivo']),
    capacity: z.number().min(1, { message: "La capacidad debe ser mayor que 0" }),
    manager: z.string().min(1, { message: "El nombre del gerente es obligatorio" }),
    location: z.string().min(1, { message: "La ubicación es obligatoria" })
  });

  const handleEditArea = (area: any) => {
    setSelectedArea(area);
    setFormData({
      name: area.name,
      description: area.description,
      status: area.status,
      capacity: area.details.capacity,
      manager: area.details.manager,
      location: area.details.location
    });
    setShowModal(true);
  };

  const handleDeleteArea = (area: any) => {
    setAreaToDelete(area);
    setShowDeleteConfirm(true);
  };

  const confirmDeleteArea = async () => {
    if (!areaToDelete) return;
    
    setIsDeleting(true);
    try {
      // Simular llamada a API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Eliminar el área de la lista local
      setAreas(prevAreas => prevAreas.filter(area => area.id !== areaToDelete.id));
      
      toast.success(`Área "${areaToDelete.name}" eliminada exitosamente`);
      setShowDeleteConfirm(false);
      setAreaToDelete(null);
    } catch (error) {
      toast.error('Error al eliminar el área');
    } finally {
      setIsDeleting(false);
    }
  };

  const filteredAreas = areas.filter(area =>
    area.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    area.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    try {
      areaSchema.parse(formData); // Valida los datos con Zod
      
      if (selectedArea) {
        // Actualizar área existente
        setAreas(prevAreas => 
          prevAreas.map(area => 
            area.id === selectedArea.id 
              ? {
                  ...area,
                  name: formData.name,
                  description: formData.description,
                  status: formData.status,
                  details: {
                    manager: formData.manager,
                    capacity: formData.capacity,
                    location: formData.location
                  }
                }
              : area
          )
        );
        toast.success(`Área "${formData.name}" actualizada exitosamente`);
      } else {
        // Crear nueva área
        const newArea = {
          id: Math.max(...areas.map(a => a.id)) + 1,
          name: formData.name,
          description: formData.description,
          status: formData.status,
          details: {
            manager: formData.manager,
            capacity: formData.capacity,
            location: formData.location
          }
        };
        setAreas(prevAreas => [...prevAreas, newArea]);
        toast.success(`Área "${formData.name}" creada exitosamente`);
      }
      
      setShowModal(false);
      setSelectedArea(null);
      setFormData({
        name: '',
        description: '',
        status: 'Activo',
        capacity: 0,
        manager: '',
        location: ''
      });
      setFormErrors({});
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors: any = {};
        error.errors.forEach(err => {
          errors[err.path[0]] = err.message;
        });
        setFormErrors(errors);
      }
    }
  };

  return (
    <div className="bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold text-[#5D0F1D]">Gestión de Áreas</h1>
              <button 
                className="flex items-center space-x-2 bg-[#5D0F1D] text-white px-4 py-2 rounded-lg hover:bg-[#7A1E2E] transition-colors duration-200"
                onClick={() => {
                  setShowModal(true);
                  setSelectedArea(null);
                  setFormData({
                    name: '',
                    description: '',
                    status: 'Activo',
                    capacity: 0,
                    manager: '',
                    location: ''
                  });
                  setFormErrors({});
                }}
              >
                <Plus className="w-5 h-5" />
                <span>Nueva Área</span>
              </button>
            </div>
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar áreas..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border rounded-lg w-64 focus:ring-2 focus:ring-[#5D0F1D] focus:border-transparent"
              />
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            </div>
          </div>
        </div>

        {/* Lista de Áreas */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Área</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Descripción</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredAreas.map((area) => (
                <tr key={area.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-[#5D0F1D] rounded-full flex items-center justify-center text-white">
                        <LayoutGrid className="w-6 h-6" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{area.name}</div>
                        <div className="text-sm text-gray-500">{area.details.location}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{area.description}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      area.status === 'Activo' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {area.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEditArea(area)}
                        className="text-[#5D0F1D] hover:text-[#7A1E2E]"
                        title="Editar área"
                      >
                        <Edit className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDeleteArea(area)}
                        className="text-red-600 hover:text-red-900"
                        title="Eliminar área"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal de Crear/Editar Área */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-[#5D0F1D]">
                {selectedArea ? 'Editar Área' : 'Nueva Área'}
              </h2>
              <button 
                onClick={() => {
                  setShowModal(false);
                  setSelectedArea(null);
                  setFormData({
                    name: '',
                    description: '',
                    status: 'Activo',
                    capacity: 0,
                    manager: '',
                    location: ''
                  });
                  setFormErrors({});
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Nombre</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={`w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#5D0F1D] ${
                    formErrors.name ? 'border-red-500' : ''
                  }`}
                  placeholder="Ej: Área de Administración"
                />
                {formErrors.name && <span className="text-red-500 text-sm">{formErrors.name}</span>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Descripción</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className={`w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#5D0F1D] ${
                    formErrors.description ? 'border-red-500' : ''
                  }`}
                  rows={3}
                  placeholder="Describe el propósito y función del área"
                />
                {formErrors.description && <span className="text-red-500 text-sm">{formErrors.description}</span>}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Estado</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className={`w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#5D0F1D] ${
                      formErrors.status ? 'border-red-500' : ''
                    }`}
                  >
                    <option value="Activo">Activo</option>
                    <option value="Inactivo">Inactivo</option>
                  </select>
                  {formErrors.status && <span className="text-red-500 text-sm">{formErrors.status}</span>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Capacidad</label>
                  <input
                    type="number"
                    value={formData.capacity}
                    onChange={(e) => setFormData({ ...formData, capacity: +e.target.value })}
                    className={`w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#5D0F1D] ${
                      formErrors.capacity ? 'border-red-500' : ''
                    }`}
                    placeholder="Ej: 20"
                  />
                  {formErrors.capacity && <span className="text-red-500 text-sm">{formErrors.capacity}</span>}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Gerente</label>
                  <input
                    type="text"
                    value={formData.manager}
                    onChange={(e) => setFormData({ ...formData, manager: e.target.value })}
                    className={`w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#5D0F1D] ${
                      formErrors.manager ? 'border-red-500' : ''
                    }`}
                    placeholder="Ej: Juan Pérez"
                  />
                  {formErrors.manager && <span className="text-red-500 text-sm">{formErrors.manager}</span>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Ubicación</label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className={`w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#5D0F1D] ${
                      formErrors.location ? 'border-red-500' : ''
                    }`}
                    placeholder="Ej: Piso 1"
                  />
                  {formErrors.location && <span className="text-red-500 text-sm">{formErrors.location}</span>}
                </div>
              </div>
              <div className="flex justify-end space-x-4 mt-6">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setSelectedArea(null);
                    setFormData({
                      name: '',
                      description: '',
                      status: 'Activo',
                      capacity: 0,
                      manager: '',
                      location: ''
                    });
                    setFormErrors({});
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#5D0F1D] text-white rounded-lg hover:bg-[#7A1E2E]"
                >
                  {selectedArea ? 'Actualizar' : 'Crear'}
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
              ¿Estás seguro que deseas eliminar el área "{areaToDelete?.name}"? Esta acción no se puede deshacer.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => {
                  setShowDeleteConfirm(false);
                  setAreaToDelete(null);
                }}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                disabled={isDeleting}
              >
                Cancelar
              </button>
              <button
                onClick={confirmDeleteArea}
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

export default AreasManagement;
