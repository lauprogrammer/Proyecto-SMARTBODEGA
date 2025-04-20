import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { Users, Package, ArrowDownToLine, ArrowUpFromLine, BarChart2, Download, Filter, Calendar, TrendingUp, TrendingDown, AlertCircle, CheckCircle } from 'lucide-react';
import { entryService } from '@/services/entryService';
import { exitService } from '@/services/exitService';
import { categoryService } from '@/services/categoryService';

interface RoleData {
  name: string;
  value: number;
}

interface CategoryData {
  name: string;
  value: number;
}

interface MovementData {
  date: string;
  value: number;
}

interface ModuleStats {
  users: {
    total: number;
    active: number;
    inactive: number;
    byRole: RoleData[];
  };
  products: {
    total: number;
    byCategory: CategoryData[];
    lowStock: number;
  };
  movements: {
    entries: MovementData[];
    exits: MovementData[];
    totalEntries: number;
    totalExits: number;
  };
}

const Statistics = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('today');
  const [loading, setLoading] = useState(true);
  const [moduleStats, setModuleStats] = useState<ModuleStats>({
    users: {
      total: 0,
      active: 0,
      inactive: 0,
      byRole: []
    },
    products: {
      total: 0,
      byCategory: [],
      lowStock: 0
    },
    movements: {
      entries: [],
      exits: [],
      totalEntries: 0,
      totalExits: 0
    }
  });

  const periods = [
    { value: 'today', label: 'Hoy' },
    { value: 'week', label: 'Esta Semana' },
    { value: 'month', label: 'Este Mes' },
    { value: 'year', label: 'Este Año' }
  ];

  const COLORS = ['#5D0F1D', '#7A1E2E', '#8B2438', '#9C2B42', '#AD324C'];

  useEffect(() => {
    loadStatistics();
  }, [selectedPeriod]);

  const loadStatistics = async () => {
    setLoading(true);
    try {
      // Simulación de datos para el ejemplo
      const mockData: ModuleStats = {
        users: {
          total: 150,
          active: 120,
          inactive: 30,
          byRole: [
            { name: 'Administrador', value: 10 },
            { name: 'Supervisor', value: 25 },
            { name: 'Usuario', value: 85 }
          ]
        },
        products: {
          total: 500,
          byCategory: [
            { name: 'Electrónicos', value: 150 },
            { name: 'Herramientas', value: 200 },
            { name: 'Materiales', value: 100 },
            { name: 'Otros', value: 50 }
          ],
          lowStock: 25
        },
        movements: {
          entries: Array.from({ length: 7 }, (_, i) => ({
            date: new Date(Date.now() - (6 - i) * 24 * 60 * 60 * 1000).toLocaleDateString(),
            value: Math.floor(Math.random() * 100) + 50
          })),
          exits: Array.from({ length: 7 }, (_, i) => ({
            date: new Date(Date.now() - (6 - i) * 24 * 60 * 60 * 1000).toLocaleDateString(),
            value: Math.floor(Math.random() * 80) + 30
          })),
          totalEntries: 350,
          totalExits: 280
        }
      };
      setModuleStats(mockData);
    } catch (error) {
      console.error('Error loading statistics:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#5D0F1D]"></div>
      </div>
    );
  }

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
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="bg-white border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#5D0F1D]"
              >
                {periods.map(period => (
                  <option key={period.value} value={period.value}>{period.label}</option>
                ))}
              </select>
              <button className="bg-[#5D0F1D] text-white px-4 py-2 rounded-lg hover:bg-[#7A1E2E] transition-colors flex items-center space-x-2">
                <Download className="w-5 h-5" />
                <span>Exportar</span>
              </button>
            </div>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Users Card */}
          <div className="bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-[#5D0F1D]/10 p-3 rounded-full">
                <Users className="w-6 h-6 text-[#5D0F1D]" />
              </div>
              <span className="text-sm text-gray-500">Usuarios</span>
            </div>
            <h3 className="text-3xl font-bold text-gray-800 mb-2">{moduleStats.users.total}</h3>
            <div className="flex items-center space-x-4">
              <div className="flex items-center text-green-500">
                <CheckCircle className="w-4 h-4 mr-1" />
                <span>{moduleStats.users.active} activos</span>
              </div>
              <div className="flex items-center text-red-500">
                <AlertCircle className="w-4 h-4 mr-1" />
                <span>{moduleStats.users.inactive} inactivos</span>
              </div>
            </div>
          </div>

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

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Users by Role Chart */}
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Distribución de Usuarios por Rol</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={moduleStats.users.byRole}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {moduleStats.users.byRole.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
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
      </div>
    </div>
  );
};

export default Statistics; 