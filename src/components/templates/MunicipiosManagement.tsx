import React, { useState } from 'react';
import { 
  MapPin, Plus, Edit2, Trash2, Search, 
  Filter, ChevronDown, ChevronUp, Users, 
  Building2, Clock, X, Check, AlertCircle,
  BarChart2, Settings, Calendar, User,
  Globe, Mail, Phone, Map
} from 'lucide-react';

const MunicipiosManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [expandedMunicipio, setExpandedMunicipio] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedMunicipio, setSelectedMunicipio] = useState<any>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Datos de ejemplo
  const municipios = [
    {
      id: 1,
      nombre: 'Bogotá D.C.',
      departamento: 'Cundinamarca',
      poblacion: 7412000,
      area: 1775.98,
      altitud: 2640,
      clima: 'Templado',
      estado: 'Activo',
      alcalde: 'Claudia López',
      contacto: {
        email: 'contacto@bogota.gov.co',
        telefono: '601-3813000',
        direccion: 'Carrera 8 # 10-65'
      },
      detalles: {
        fundacion: '1538',
        gentilicio: 'Bogotano/a',
        sitiosTuristicos: ['Monserrate', 'Museo del Oro', 'Plaza de Bolívar'],
        economia: ['Servicios', 'Comercio', 'Industria'],
        ultimaActualizacion: '2024-03-15'
      }
    },
    {
      id: 2,
      nombre: 'Medellín',
      departamento: 'Antioquia',
      poblacion: 2529403,
      area: 380.64,
      altitud: 1495,
      clima: 'Templado',
      estado: 'Activo',
      alcalde: 'Daniel Quintero',
      contacto: {
        email: 'contacto@medellin.gov.co',
        telefono: '604-3855555',
        direccion: 'Carrera 43 # 50-50'
      },
      detalles: {
        fundacion: '1616',
        gentilicio: 'Medellinense',
        sitiosTuristicos: ['Parque Explora', 'Museo de Antioquia', 'Pueblito Paisa'],
        economia: ['Textil', 'Comercio', 'Servicios'],
        ultimaActualizacion: '2024-03-10'
      }
    },
    {
      id: 3,
      nombre: 'Cali',
      departamento: 'Valle del Cauca',
      poblacion: 2236000,
      area: 564,
      altitud: 995,
      clima: 'Cálido',
      estado: 'Activo',
      alcalde: 'Jorge Iván Ospina',
      contacto: {
        email: 'contacto@cali.gov.co',
        telefono: '602-6600000',
        direccion: 'Carrera 1 # 6-00'
      },
      detalles: {
        fundacion: '1536',
        gentilicio: 'Caleño/a',
        sitiosTuristicos: ['Zoológico de Cali', 'Gato de Tejada', 'Plaza de Cayzedo'],
        economia: ['Azucarera', 'Comercio', 'Servicios'],
        ultimaActualizacion: '2024-03-05'
      }
    }
  ];

  const handleMunicipioClick = (municipioId: number) => {
    setExpandedMunicipio(expandedMunicipio === municipioId ? null : municipioId);
  };

  const handleEditMunicipio = (municipio: any) => {
    setSelectedMunicipio(municipio);
    setShowModal(true);
  };

  const handleDeleteMunicipio = (municipio: any) => {
    setSelectedMunicipio(municipio);
    setShowDeleteConfirm(true);
  };

  return (
    <div className="bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
            <div className="flex items-center gap-4">
              <div className="bg-[#5D0F1D] bg-opacity-10 p-3 rounded-xl">
                <MapPin className="w-8 h-8 text-[#5D0F1D]" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-[#5D0F1D]">Gestión de Municipios</h1>
                <p className="text-gray-500">Administra y monitorea los municipios</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                {viewMode === 'grid' ? 'Vista Lista' : 'Vista Cuadrícula'}
              </button>
              <button 
                onClick={() => setShowModal(true)}
                className="flex items-center space-x-2 bg-[#5D0F1D] text-white px-6 py-3 rounded-xl hover:bg-[#7A1E2E] transition-colors shadow-lg"
              >
                <Plus className="w-5 h-5" />
                <span>Nuevo Municipio</span>
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-[#5D0F1D] bg-opacity-10 p-4 rounded-xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Total Municipios</p>
                  <p className="text-2xl font-bold text-[#5D0F1D]">{municipios.length}</p>
                </div>
                <MapPin className="w-8 h-8 text-[#5D0F1D]" />
              </div>
            </div>
            <div className="bg-green-50 p-4 rounded-xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Municipios Activos</p>
                  <p className="text-2xl font-bold text-green-600">{municipios.filter(m => m.estado === 'Activo').length}</p>
                </div>
                <Check className="w-8 h-8 text-green-600" />
              </div>
            </div>
            <div className="bg-blue-50 p-4 rounded-xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Población Total</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {municipios.reduce((acc, m) => acc + m.poblacion, 0).toLocaleString()}
                  </p>
                </div>
                <Users className="w-8 h-8 text-blue-600" />
              </div>
            </div>
            <div className="bg-purple-50 p-4 rounded-xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Área Total</p>
                  <p className="text-2xl font-bold text-purple-600">
                    {municipios.reduce((acc, m) => acc + m.area, 0).toFixed(2)} km²
                  </p>
                </div>
                <Globe className="w-8 h-8 text-purple-600" />
              </div>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar municipios..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5D0F1D]"
              />
            </div>
            <div className="flex gap-2">
              <button className="flex items-center space-x-2 bg-white border px-4 py-3 rounded-xl hover:bg-gray-50 transition-colors">
                <Filter className="w-5 h-5 text-gray-600" />
                <span>Filtrar</span>
              </button>
              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="bg-white border px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5D0F1D]"
              >
                <option value="all">Todos los Municipios</option>
                <option value="active">Activos</option>
                <option value="inactive">Inactivos</option>
              </select>
            </div>
          </div>
        </div>

        {/* Municipios Grid/List */}
        <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-6'}>
          {municipios.map((municipio) => (
            <div 
              key={municipio.id} 
              className={`bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl ${
                viewMode === 'grid' ? 'h-[500px]' : ''
              }`}
            >
              {/* Header */}
              <div className="p-6 border-b">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold text-[#5D0F1D]">{municipio.nombre}</h3>
                    <div className="flex items-center space-x-2 text-gray-500 mt-1">
                      <Map className="w-4 h-4" />
                      <span>{municipio.departamento}</span>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => handleEditMunicipio(municipio)}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <Edit2 className="w-5 h-5 text-gray-600" />
                    </button>
                    <button 
                      onClick={() => handleDeleteMunicipio(municipio)}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-5 h-5 text-red-600" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-500">Población</p>
                    <p className="font-medium">{municipio.poblacion.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Área</p>
                    <p className="font-medium">{municipio.area} km²</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Altitud</p>
                    <p className="font-medium">{municipio.altitud} m.s.n.m.</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Clima</p>
                    <p className="font-medium">{municipio.clima}</p>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-700">Alcalde</h4>
                    <span className="text-sm text-gray-500">{municipio.alcalde}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-gray-700">Estado</h4>
                    <span className={`px-2 py-1 rounded-full text-sm ${
                      municipio.estado === 'Activo' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {municipio.estado}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal de Crear/Editar Municipio */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-[#5D0F1D]">
                {selectedMunicipio ? 'Editar Municipio' : 'Nuevo Municipio'}
              </h2>
              <button 
                onClick={() => {
                  setShowModal(false);
                  setSelectedMunicipio(null);
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nombre</label>
                  <input
                    type="text"
                    defaultValue={selectedMunicipio?.nombre}
                    className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5D0F1D]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Departamento</label>
                  <input
                    type="text"
                    defaultValue={selectedMunicipio?.departamento}
                    className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5D0F1D]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Población</label>
                  <input
                    type="number"
                    defaultValue={selectedMunicipio?.poblacion}
                    className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5D0F1D]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Área (km²)</label>
                  <input
                    type="number"
                    defaultValue={selectedMunicipio?.area}
                    className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5D0F1D]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Altitud (m.s.n.m)</label>
                  <input
                    type="number"
                    defaultValue={selectedMunicipio?.altitud}
                    className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5D0F1D]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Clima</label>
                  <input
                    type="text"
                    defaultValue={selectedMunicipio?.clima}
                    className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5D0F1D]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Alcalde</label>
                  <input
                    type="text"
                    defaultValue={selectedMunicipio?.alcalde}
                    className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5D0F1D]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Estado</label>
                  <select
                    defaultValue={selectedMunicipio?.estado}
                    className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5D0F1D]"
                  >
                    <option value="Activo">Activo</option>
                    <option value="Inactivo">Inactivo</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end space-x-4 mt-8">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setSelectedMunicipio(null);
                  }}
                  className="px-6 py-3 border border-gray-300 rounded-xl hover:bg-gray-50"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-[#5D0F1D] text-white rounded-xl hover:bg-[#7A1E2E]"
                >
                  {selectedMunicipio ? 'Actualizar' : 'Crear'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal de Confirmación de Eliminación */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full">
            <div className="flex items-center space-x-4 mb-6">
              <AlertCircle className="w-8 h-8 text-red-600" />
              <h2 className="text-2xl font-bold text-gray-800">Confirmar Eliminación</h2>
            </div>
            <p className="text-gray-600 mb-8">
              ¿Estás seguro que deseas eliminar el municipio {selectedMunicipio?.nombre}? Esta acción no se puede deshacer.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-6 py-3 border border-gray-300 rounded-xl hover:bg-gray-50"
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  // Aquí iría la lógica para eliminar el municipio
                  setShowDeleteConfirm(false);
                }}
                className="px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MunicipiosManagement; 