'use client';
import React, { useEffect, useState } from 'react';
import { FileText, BarChart2, PieChart, Download, Filter, Calendar, Printer } from 'lucide-react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { getReport } from '@/services/reportService'; // Ajusta esta ruta según tu estructura

const Reports = () => {
  const [selectedReport, setSelectedReport] = useState<string>('inventory');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [filters, setFilters] = useState({ category: 'all', status: 'all', type: 'all' });
  const [searchMovements, setSearchMovements] = useState('');
  const [searchInventoryId, setSearchInventoryId] = useState('');
  const [searchInventoryName, setSearchInventoryName] = useState('');
  
  // Datos quemados para los reportes (sin precio)
  const mockData = {
    inventory: [
      { id: 1, nombre: 'Laptop HP', categoria: 'Electrónicos', stock: 15, estado: 'Activo' },
      { id: 2, nombre: 'Martillo', categoria: 'Herramientas', stock: 30, estado: 'Activo' },
      { id: 3, nombre: 'Cemento', categoria: 'Materiales', stock: 100, estado: 'Activo' },
      { id: 4, nombre: 'Monitor Dell', categoria: 'Electrónicos', stock: 8, estado: 'Activo' },
      { id: 5, nombre: 'Destornillador', categoria: 'Herramientas', stock: 45, estado: 'Activo' }
    ],
    movements: [
      { id: 1, fecha: '2024-03-15', tipo: 'Entrada', producto: 'Laptop HP', cantidad: 5, usuario: 'Admin' },
      { id: 2, fecha: '2024-03-14', tipo: 'Salida', producto: 'Martillo', cantidad: 3, usuario: 'Juan' },
      { id: 3, fecha: '2024-03-13', tipo: 'Entrada', producto: 'Cemento', cantidad: 50, usuario: 'Admin' },
      { id: 4, fecha: '2024-03-12', tipo: 'Salida', producto: 'Monitor Dell', cantidad: 2, usuario: 'María' }
    ],
    categories: [
      { categoria: 'Electrónicos', total_productos: 25, porcentaje: '35%' },
      { categoria: 'Herramientas', total_productos: 45, porcentaje: '25%' },
      { categoria: 'Materiales', total_productos: 30, porcentaje: '40%' }
    ]
  };

  const [reportData, setReportData] = useState<any[]>(mockData.inventory);
  const [loading, setLoading] = useState(false);

  // Filtrado de datos según los filtros seleccionados
  useEffect(() => {
    let data: any[] = mockData[selectedReport as keyof typeof mockData] || [];

    // Filtros para inventario
    if (selectedReport === 'inventory') {
      if (filters.category !== 'all') {
        data = data.filter((item: any) => item.categoria ===
          (filters.category === 'electronics' ? 'Electrónicos' :
           filters.category === 'tools' ? 'Herramientas' :
           filters.category === 'materials' ? 'Materiales' : filters.category));
      }
      if (filters.status !== 'all') {
        data = data.filter((item: any) => item.estado.toLowerCase() === (filters.status === 'active' ? 'activo' : 'inactivo'));
      }
      // Filtro por ID
      if (searchInventoryId.trim() !== '') {
        data = data.filter((item: any) => String(item.id).includes(searchInventoryId.trim()));
      }
      // Filtro por nombre
      if (searchInventoryName.trim() !== '') {
        data = data.filter((item: any) => item.nombre.toLowerCase().includes(searchInventoryName.trim().toLowerCase()));
      }
    }
    // Filtros para movimientos
    if (selectedReport === 'movements') {
      if (filters.type !== 'all') {
        data = data.filter((item: any) => item.tipo.toLowerCase() === (filters.type === 'entry' ? 'entrada' : 'salida'));
      }
      // Filtro por fecha
      if (dateRange.start) {
        data = data.filter((item: any) => !item.fecha || item.fecha >= dateRange.start);
      }
      if (dateRange.end) {
        data = data.filter((item: any) => !item.fecha || item.fecha <= dateRange.end);
      }
      // Filtro por búsqueda
      if (searchMovements.trim() !== '') {
        const search = searchMovements.trim().toLowerCase();
        data = data.filter((item: any) =>
          Object.values(item).some(val => String(val).toLowerCase().includes(search))
        );
      }
    }
    // Filtros para categorías
    if (selectedReport === 'categories') {
      if (filters.category !== 'all') {
        data = data.filter((item: any) => item.categoria ===
          (filters.category === 'electronics' ? 'Electrónicos' :
           filters.category === 'tools' ? 'Herramientas' :
           filters.category === 'materials' ? 'Materiales' : filters.category));
      }
    }
    setReportData(data);
  }, [selectedReport, filters, dateRange, searchMovements, searchInventoryId, searchInventoryName]);

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text(`Reporte: ${selectedReport}`, 14, 16);
    if (reportData.length > 0) {
      const headers = Object.keys(reportData[0]);
      const rows = reportData.map((item) => headers.map((key) => item[key]));
      autoTable(doc, {
        startY: 20,
        head: [headers],
        body: rows,
      });
      doc.save(`reporte-${selectedReport}.pdf`);
    } else {
      doc.text('No hay datos para mostrar.', 14, 30);
      doc.save(`reporte-${selectedReport}.pdf`);
    }
  };

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const headers = Object.keys(reportData[0] || {});
    const rows = reportData.map(item =>
      `<tr>${headers.map(header => `<td>${item[header]}</td>`).join('')}</tr>`
    );

    printWindow.document.write(`
      <html>
        <head>
          <title>Reporte ${selectedReport}</title>
          <style>
            body { font-family: sans-serif; padding: 20px; }
            table { border-collapse: collapse; width: 100%; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #f2f2f2; }
          </style>
        </head>
        <body>
          <h1>Reporte: ${selectedReport}</h1>
          <table>
            <thead>
              <tr>${headers.map(header => `<th>${header}</th>`).join('')}</tr>
            </thead>
            <tbody>
              ${rows.join('')}
            </tbody>
          </table>
        </body>
      </html>
    `);

    printWindow.document.close();
    printWindow.print();
  };

  const reportTypes = [
    { id: 'inventory', title: 'Inventario', description: 'Detalle del inventario', icon: <FileText className="w-6 h-6" /> },
    { id: 'movements', title: 'Movimientos', description: 'Entradas y salidas', icon: <BarChart2 className="w-6 h-6" /> },
    { id: 'categories', title: 'Categorías', description: 'Análisis por categoría', icon: <PieChart className="w-6 h-6" /> }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h1 className="text-2xl font-bold text-[#5D0F1D]">Gestión de Reportes</h1>
          <p className="text-gray-600">Visualiza y descarga reportes detallados</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Report Types */}
          <div className="lg:col-span-1 bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Tipo de Reporte</h2>
            <div className="space-y-3">
              {reportTypes.map((r) => (
                <button
                  key={r.id}
                  onClick={() => setSelectedReport(r.id)}
                  className={`w-full p-4 rounded-lg flex items-center space-x-3 transition ${
                    selectedReport === r.id
                      ? 'bg-[#5D0F1D] text-white'
                      : 'bg-gray-50 hover:bg-gray-100 text-gray-800'
                  }`}
                >
                  {r.icon}
                  <div className="text-left">
                    <div className="font-medium">{r.title}</div>
                    <div className="text-sm opacity-80">{r.description}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Report Content */}
          <div className="lg:col-span-3 bg-white rounded-xl shadow-sm p-6 space-y-6">
            {/* Filters */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Filtros</h2>
                <Filter className="w-5 h-5 text-gray-400" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Filtros dinámicos según el tipo de reporte */}
                {selectedReport === 'inventory' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium mb-1">Categoría</label>
                      <select
                        name="category"
                        value={filters.category}
                        onChange={(e) => setFilters((prev) => ({ ...prev, [e.target.name]: e.target.value }))}
                        className="w-full p-2 border rounded-lg"
                      >
                        <option value="all">Todas</option>
                        <option value="electronics">Electrónicos</option>
                        <option value="tools">Herramientas</option>
                        <option value="materials">Materiales</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Estado</label>
                      <select
                        name="status"
                        value={filters.status}
                        onChange={(e) => setFilters((prev) => ({ ...prev, [e.target.name]: e.target.value }))}
                        className="w-full p-2 border rounded-lg"
                      >
                        <option value="all">Todos</option>
                        <option value="active">Activo</option>
                        <option value="inactive">Inactivo</option>
                      </select>
                    </div>
                  </>
                )}
                {selectedReport === 'movements' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium mb-1">Tipo</label>
                      <select
                        name="type"
                        value={filters.type}
                        onChange={(e) => setFilters((prev) => ({ ...prev, [e.target.name]: e.target.value }))}
                        className="w-full p-2 border rounded-lg"
                      >
                        <option value="all">Todos</option>
                        <option value="entry">Entrada</option>
                        <option value="exit">Salida</option>
                      </select>
                    </div>
                  </>
                )}
                {selectedReport === 'categories' && (
                  <div>
                    <label className="block text-sm font-medium mb-1">Categoría</label>
                    <select
                      name="category"
                      value={filters.category}
                      onChange={(e) => setFilters((prev) => ({ ...prev, [e.target.name]: e.target.value }))}
                      className="w-full p-2 border rounded-lg"
                    >
                      <option value="all">Todas</option>
                      <option value="electronics">Electrónicos</option>
                      <option value="tools">Herramientas</option>
                      <option value="materials">Materiales</option>
                    </select>
                  </div>
                )}
              </div>
              {/* Filtros de fecha solo para movimientos */}
              {selectedReport === 'movements' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  {['start', 'end'].map((d) => (
                    <div key={d}>
                      <label className="block text-sm font-medium mb-1">
                        {d === 'start' ? 'Fecha Inicio' : 'Fecha Fin'}
                      </label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-3 text-gray-400" />
                        <input
                          type="date"
                          name={d}
                          value={dateRange[d as keyof typeof dateRange]}
                          onChange={(e) =>
                            setDateRange((prev) => ({ ...prev, [e.target.name]: e.target.value }))
                          }
                          className="w-full pl-10 p-2 border rounded-lg"
                          placeholder="dd/mm/aaaa"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {selectedReport === 'inventory' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <input
                      type="text"
                      placeholder="Buscar por ID..."
                      value={searchInventoryId}
                      onChange={e => setSearchInventoryId(e.target.value)}
                      className="w-full p-2 border rounded-lg"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder="Buscar por nombre..."
                      value={searchInventoryName}
                      onChange={e => setSearchInventoryName(e.target.value)}
                      className="w-full p-2 border rounded-lg"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Report Preview */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-gray-800">Vista Previa</h3>
                <div className="flex space-x-2">
                  <button onClick={generatePDF} className="p-2 rounded-lg bg-[#5D0F1D] text-white hover:bg-[#7A1E2E]">
                    <Download className="w-5 h-5" />
                  </button>
                  <button onClick={handlePrint} className="p-2 rounded-lg bg-[#5D0F1D] text-white hover:bg-[#7A1E2E]">
                    <Printer className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Buscador solo para movimientos */}
              {selectedReport === 'movements' && (
                <div className="mb-4">
                  <input
                    type="text"
                    placeholder="Buscar en movimientos..."
                    value={searchMovements}
                    onChange={e => setSearchMovements(e.target.value)}
                    className="w-full p-2 border rounded-lg"
                  />
                </div>
              )}

              <div className="h-64 overflow-auto">
                {loading ? (
                  <p className="text-center text-gray-500">Cargando...</p>
                ) : (
                  <>
                    {reportData.length > 0 ? (
                      <table className="w-full text-sm border">
                        <thead>
                          <tr className="bg-gray-100">
                            {Object.keys(reportData[0]).map((key) => (
                              <th key={key} className="border px-3 py-2 text-left">{key}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {reportData.map((row, idx) => (
                            <tr key={idx} className="hover:bg-gray-50">
                              {Object.values(row).map((val, i) => (
                                <td key={i} className="border px-3 py-2">{String(val)}</td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    ) : (
                      <table className="w-full text-sm border">
                        <thead>
                          <tr className="bg-gray-100">
                            {selectedReport === 'movements' && (
                              <>
                                <th className="border px-3 py-2 text-left">id</th>
                                <th className="border px-3 py-2 text-left">fecha</th>
                                <th className="border px-3 py-2 text-left">tipo</th>
                                <th className="border px-3 py-2 text-left">producto</th>
                                <th className="border px-3 py-2 text-left">cantidad</th>
                                <th className="border px-3 py-2 text-left">usuario</th>
                              </>
                            )}
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td colSpan={6} className="text-center text-gray-500 py-4">No hay datos para mostrar.</td>
                          </tr>
                        </tbody>
                      </table>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
