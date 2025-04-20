import React, { useState } from 'react';
import { FileText, BarChart2, PieChart, Download, Filter, Calendar, Printer } from 'lucide-react';

const Reports = () => {
  const [selectedReport, setSelectedReport] = useState<string>('inventory');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [filters, setFilters] = useState({
    category: 'all',
    status: 'all',
    type: 'all'
  });

  const reportTypes = [
    {
      id: 'inventory',
      title: 'Inventario',
      description: 'Reporte detallado del inventario actual',
      icon: <FileText className="w-6 h-6" />
    },
    {
      id: 'movements',
      title: 'Movimientos',
      description: 'Reporte de entradas y salidas',
      icon: <BarChart2 className="w-6 h-6" />
    },
    {
      id: 'categories',
      title: 'Categorías',
      description: 'Análisis por categorías',
      icon: <PieChart className="w-6 h-6" />
    }
  ];

  const handleReportChange = (reportId: string) => {
    setSelectedReport(reportId);
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDateRange({
      ...dateRange,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h1 className="text-2xl font-bold text-[#5D0F1D] mb-2">Reportes</h1>
          <p className="text-gray-600">Genera y visualiza reportes detallados del sistema</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Report Types */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Tipo de Reporte</h2>
              <div className="space-y-3">
                {reportTypes.map((report) => (
                  <button
                    key={report.id}
                    onClick={() => handleReportChange(report.id)}
                    className={`w-full p-4 rounded-lg flex items-center space-x-3 transition-colors ${
                      selectedReport === report.id
                        ? 'bg-[#5D0F1D] text-white'
                        : 'bg-gray-50 hover:bg-gray-100 text-gray-800'
                    }`}
                  >
                    {report.icon}
                    <div className="text-left">
                      <div className="font-medium">{report.title}</div>
                      <div className="text-sm opacity-80">{report.description}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Report Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-sm p-6">
              {/* Filters */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-800">Filtros</h2>
                  <button className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200">
                    <Filter className="w-5 h-5" />
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Categoría</label>
                    <select
                      name="category"
                      value={filters.category}
                      onChange={handleFilterChange}
                      className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#5D0F1D]"
                    >
                      <option value="all">Todas las categorías</option>
                      <option value="electronics">Electrónicos</option>
                      <option value="tools">Herramientas</option>
                      <option value="materials">Materiales</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Estado</label>
                    <select
                      name="status"
                      value={filters.status}
                      onChange={handleFilterChange}
                      className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#5D0F1D]"
                    >
                      <option value="all">Todos los estados</option>
                      <option value="active">Activo</option>
                      <option value="inactive">Inactivo</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tipo</label>
                    <select
                      name="type"
                      value={filters.type}
                      onChange={handleFilterChange}
                      className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#5D0F1D]"
                    >
                      <option value="all">Todos los tipos</option>
                      <option value="entry">Entrada</option>
                      <option value="exit">Salida</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Date Range */}
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Rango de Fechas</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Fecha Inicio</label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-3 text-gray-400" />
                      <input
                        type="date"
                        name="start"
                        value={dateRange.start}
                        onChange={handleDateChange}
                        className="w-full pl-10 p-2 border rounded-lg focus:ring-2 focus:ring-[#5D0F1D]"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Fecha Fin</label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-3 text-gray-400" />
                      <input
                        type="date"
                        name="end"
                        value={dateRange.end}
                        onChange={handleDateChange}
                        className="w-full pl-10 p-2 border rounded-lg focus:ring-2 focus:ring-[#5D0F1D]"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Report Preview */}
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">Vista Previa del Reporte</h3>
                  <div className="flex space-x-2">
                    <button className="p-2 rounded-lg bg-[#5D0F1D] text-white hover:bg-[#7A1E2E]">
                      <Download className="w-5 h-5" />
                    </button>
                    <button className="p-2 rounded-lg bg-[#5D0F1D] text-white hover:bg-[#7A1E2E]">
                      <Printer className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                <div className="h-64 flex items-center justify-center text-gray-500">
                  Vista previa del reporte seleccionado
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports; 