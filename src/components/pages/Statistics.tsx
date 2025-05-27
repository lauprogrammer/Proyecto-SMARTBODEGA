import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { Package, ArrowDownToLine, ArrowUpFromLine, BarChart2, Download, AlertCircle, CheckCircle, TrendingUp, TrendingDown } from 'lucide-react';
import * as XLSX from 'xlsx';

const COLORS = ['#5D0F1D', '#7A1E2E', '#8B2438', '#9C2B42', '#AD324C'];

const mockModuleStats = {
  products: {
    total: 50,
    byCategory: [
      { name: 'Electrónicos', value: 15 },
      { name: 'Herramientas', value: 20 },
      { name: 'Materiales', value: 15 }
    ],
    lowStock: 3
  },
  movements: {
    entries: [
      { date: '01/06', value: 60 },
      { date: '02/06', value: 80 },
      { date: '03/06', value: 70 },
      { date: '04/06', value: 90 },
      { date: '05/06', value: 100 },
      { date: '06/06', value: 85 },
      { date: '07/06', value: 95 }
    ],
    exits: [
      { date: '01/06', value: 40 },
      { date: '02/06', value: 60 },
      { date: '03/06', value: 55 },
      { date: '04/06', value: 70 },
      { date: '05/06', value: 65 },
      { date: '06/06', value: 75 },
      { date: '07/06', value: 80 }
    ],
    totalEntries: 580,
    totalExits: 445
  }
};

const mockStats = {
  inventory: [
    { label: 'Total Productos', value: 50 },
    { label: 'Stock Total', value: 1200 },
    { label: 'Categorías', value: 3 }
  ],
  movements: [
    { label: 'Total Movimientos', value: 1025 },
    { label: 'Entradas', value: 580 },
    { label: 'Salidas', value: 445 }
  ],
  categories: [
    { label: 'Categoría con más productos', value: 'Herramientas' },
    { label: 'Porcentaje mayor', value: 'Herramientas (40%)' }
  ]
};

const Statistics = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('today');
  const periods = [
    { value: 'today', label: 'Hoy' },
    { value: 'week', label: 'Esta Semana' },
    { value: 'month', label: 'Este Mes' },
    { value: 'year', label: 'Este Año' }
  ];

  const moduleStats = mockModuleStats;

  const handleExport = () => {
    const wb = XLSX.utils.book_new();

    // Datos de resumen
    const summaryData = [
      ['RESUMEN DE INVENTARIO'],
      [''],
      ['Métrica', 'Valor'],
      ['Total Productos', moduleStats.products.total],
      ['Productos en Bajo Stock', moduleStats.products.lowStock],
      ['Total Entradas', moduleStats.movements.totalEntries],
      ['Total Salidas', moduleStats.movements.totalExits]
    ];

    // Datos de productos
    const productsData = [
      ['PRODUCTOS POR CATEGORÍA'],
      [''],
      ['Categoría', 'Cantidad'],
      ...moduleStats.products.byCategory.map(item => [item.name, item.value])
    ];

    // Datos de movimientos
    const movementsData = [
      ['REGISTRO DE MOVIMIENTOS'],
      [''],
      ['Fecha', 'Entradas', 'Salidas', 'Balance'],
      ...moduleStats.movements.entries.map((entry, index) => [
        entry.date,
        entry.value,
        moduleStats.movements.exits[index].value,
        entry.value - moduleStats.movements.exits[index].value
      ])
    ];

    // Crear y agregar hojas
    const wsSummary = XLSX.utils.aoa_to_sheet(summaryData);
    const wsProducts = XLSX.utils.aoa_to_sheet(productsData);
    const wsMovements = XLSX.utils.aoa_to_sheet(movementsData);

    // Ajustar anchos de columna
    wsSummary['!cols'] = [{ wch: 20 }, { wch: 15 }];
    wsProducts['!cols'] = [{ wch: 20 }, { wch: 15 }];
    wsMovements['!cols'] = [{ wch: 15 }, { wch: 15 }, { wch: 15 }, { wch: 15 }];

    XLSX.utils.book_append_sheet(wb, wsSummary, "Resumen");
    XLSX.utils.book_append_sheet(wb, wsProducts, "Productos");
    XLSX.utils.book_append_sheet(wb, wsMovements, "Movimientos");

    // Guardar archivo
    XLSX.writeFile(wb, `estadisticas_${selectedPeriod}.xlsx`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center space-x-4">
              <BarChart2 className="w-8 h-8 text-[#5D0F1D]" />
              <h1 className="text-2xl font-bold text-gray-800">Estadísticas del Sistema</h1>
            </div>
            <div className="flex items-center space-x-4">
              <select
                value={selectedPeriod}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectedPeriod(e.target.value)}
                className="bg-white border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#5D0F1D]"
              >
                {periods.map(period => (
                  <option key={period.value} value={period.value}>{period.label}</option>
                ))}
              </select>
              <button 
                onClick={handleExport}
                className="bg-[#5D0F1D] text-white px-4 py-2 rounded-lg hover:bg-[#7A1E2E] transition-colors flex items-center space-x-2"
              >
                <Download className="w-5 h-5" />
                <span>Exportar</span>
              </button>
            </div>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      
          {/* Products Card */}
          <div className="bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-[#5D0F1D]/10 p-3 rounded-full">
                <Package className="w-6 h-6 text-[#5D0F1D]" />
              </div>
              <span className="text-sm text-gray-500">Productos</span>
            </div>
            <h3 className="text-3xl font-bold text-gray-800 mb-2">{moduleStats.products.total}</h3>
            <div className="flex items-center space-x-4">
              <div className="flex items-center text-yellow-500">
                <AlertCircle className="w-4 h-4 mr-1" />
                <span>{moduleStats.products.lowStock} bajo stock</span>
              </div>
            </div>
          </div>

          {/* Entries Card */}
          <div className="bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-[#5D0F1D]/10 p-3 rounded-full">
                <ArrowDownToLine className="w-6 h-6 text-[#5D0F1D]" />
              </div>
              <span className="text-sm text-gray-500">Entradas</span>
            </div>
            <h3 className="text-3xl font-bold text-gray-800 mb-2">{moduleStats.movements.totalEntries}</h3>
            <div className="flex items-center text-green-500">
              <TrendingUp className="w-4 h-4 mr-1" />
              <span>+15% vs período anterior</span>
            </div>
          </div>

          {/* Exits Card */}
          <div className="bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-[#5D0F1D]/10 p-3 rounded-full">
                <ArrowUpFromLine className="w-6 h-6 text-[#5D0F1D]" />
              </div>
              <span className="text-sm text-gray-500">Salidas</span>
            </div>
            <h3 className="text-3xl font-bold text-gray-800 mb-2">{moduleStats.movements.totalExits}</h3>
            <div className="flex items-center text-red-500">
              <TrendingDown className="w-4 h-4 mr-1" />
              <span>-5% vs período anterior</span>
            </div>
          </div>
        </div>


          {/* Products by Category Chart */}
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Productos por Categoría</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={moduleStats.products.byCategory}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#5D0F1D">
                    {moduleStats.products.byCategory.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Movements Trend Chart */}
          <div className="bg-white rounded-2xl shadow-xl p-6 lg:col-span-2">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Tendencia de Movimientos</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="value"
                    data={moduleStats.movements.entries}
                    name="Entradas"
                    stroke="#5D0F1D"
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="value"
                    data={moduleStats.movements.exits}
                    name="Salidas"
                    stroke="#7A1E2E"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Estadísticas adicionales (mockStats) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          {mockStats.inventory.map((stat, idx) => (
            <div key={idx} className="bg-white rounded-lg shadow p-4 flex flex-col items-center">
              <span className="text-lg font-bold text-[#5D0F1D]">{stat.value}</span>
              <span className="text-gray-600">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    
  );
};

export default Statistics; 