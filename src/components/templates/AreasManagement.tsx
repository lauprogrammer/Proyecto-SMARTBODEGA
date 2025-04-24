import React, { useState } from 'react';
import { LayoutGrid, Search, Plus, Edit, Trash2, X } from 'lucide-react';

const AreasManagement = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedArea, setSelectedArea] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Datos de ejemplo para áreas
  const areas = [
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
    }
  ];

  const handleEditArea = (area: any) => {
    setSelectedArea(area);
    setShowModal(true);
  };

  const handleDeleteArea = (area: any) => {
    // Aquí iría la lógica para eliminar el área
    console.log(`Eliminando área: ${area.name}`);
  };

  const filteredAreas = areas.filter(area =>
    area.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    area.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
                onClick={() => setShowModal(true)}
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
                      >
                        <Edit className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDeleteArea(area)}
                        className="text-red-600 hover:text-red-900"
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
          <div className="bg-white rounded-xl p-6 max-w-2xl w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-[#5D0F1D]">
                {selectedArea ? 'Editar Área' : 'Nueva Área'}
              </h2>
              <button 
                onClick={() => {
                  setShowModal(false);
                  setSelectedArea(null);
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Nombre</label>
                <input
                  type="text"
                  defaultValue={selectedArea?.name}
                  className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#5D0F1D]"
                  placeholder="Ej: Área de Administración"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Descripción</label>
                <textarea
                  defaultValue={selectedArea?.description}
                  className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#5D0F1D]"
                  rows={3}
                  placeholder="Describe el propósito y función del área"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Estado</label>
                  <select
                    defaultValue={selectedArea?.status}
                    className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#5D0F1D]"
                  >
                    <option value="Activo">Activo</option>
                    <option value="Inactivo">Inactivo</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Capacidad</label>
                  <input
                    type="number"
                    defaultValue={selectedArea?.details?.capacity}
                    className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#5D0F1D]"
                    placeholder="Ej: 20"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Gerente</label>
                  <input
                    type="text"
                    defaultValue={selectedArea?.details?.manager}
                    className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#5D0F1D]"
                    placeholder="Ej: Juan Pérez"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Ubicación</label>
                  <input
                    type="text"
                    defaultValue={selectedArea?.details?.location}
                    className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#5D0F1D]"
                    placeholder="Ej: Piso 1"
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-4 mt-6">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setSelectedArea(null);
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
    </div>
  );
};

export default AreasManagement; 