import React, { useState, useEffect } from 'react';
import { Building2, Search, Plus, Edit, Trash2, ChevronDown, ChevronUp, X } from 'lucide-react';

const CentersManagement = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedCenter, setSelectedCenter] = useState<any>(null);
  const [expandedCenter, setExpandedCenter] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Datos de ejemplo para centros
  const centers = [
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
        manager: 'Juan Pérez',
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
        manager: 'María González',
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
        manager: 'Carlos Rodríguez',
        created: '2024-03-10',
        lastUpdate: '2024-04-16'
      }
    }
  ];

  const handleCenterClick = (centerId: number) => {
    setExpandedCenter(expandedCenter === centerId ? null : centerId);
  };

  const handleEditCenter = (center: any) => {
    setSelectedCenter(center);
    setShowModal(true);
  };

  const handleDeleteCenter = (center: any) => {
    // Aquí iría la lógica para eliminar el centro
    console.log(`Eliminando centro: ${center.name}`);
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
                onClick={() => setShowModal(true)}
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
                      >
                        <Edit className="w-4 h-4 text-gray-600" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteCenter(center);
                        }}
                        className="p-1 hover:bg-gray-200 rounded-full transition-colors"
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
          <div className="bg-white rounded-xl p-6 max-w-2xl w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-[#5D0F1D]">
                {selectedCenter ? 'Editar Centro' : 'Nuevo Centro'}
              </h2>
              <button 
                onClick={() => {
                  setShowModal(false);
                  setSelectedCenter(null);
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Nombre del Centro</label>
                  <input
                    type="text"
                    defaultValue={selectedCenter?.name}
                    className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#5D0F1D]"
                    placeholder="Ej: Centro Principal"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Ubicación</label>
                  <input
                    type="text"
                    defaultValue={selectedCenter?.location}
                    className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#5D0F1D]"
                    placeholder="Ej: Ciudad A"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Tipo</label>
                  <select
                    defaultValue={selectedCenter?.type}
                    className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#5D0F1D]"
                  >
                    <option value="">Seleccionar tipo</option>
                    <option value="Sede Principal">Sede Principal</option>
                    <option value="Sede Secundaria">Sede Secundaria</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Estado</label>
                  <select
                    defaultValue={selectedCenter?.status}
                    className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#5D0F1D]"
                  >
                    <option value="Activo">Activo</option>
                    <option value="Inactivo">Inactivo</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Dirección</label>
                  <input
                    type="text"
                    defaultValue={selectedCenter?.details?.address}
                    className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#5D0F1D]"
                    placeholder="Ej: Calle 123 #45-67"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Teléfono</label>
                  <input
                    type="tel"
                    defaultValue={selectedCenter?.details?.phone}
                    className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#5D0F1D]"
                    placeholder="Ej: 123-456-7890"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    defaultValue={selectedCenter?.details?.email}
                    className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#5D0F1D]"
                    placeholder="ejemplo@correo.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Gerente</label>
                  <input
                    type="text"
                    defaultValue={selectedCenter?.details?.manager}
                    className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#5D0F1D]"
                    placeholder="Nombre del gerente"
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-4 mt-6">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setSelectedCenter(null);
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
    </div>
  );
};

export default CentersManagement; 