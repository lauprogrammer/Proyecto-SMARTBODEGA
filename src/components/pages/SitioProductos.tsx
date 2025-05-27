import React from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import { ArrowLeft, Plus, Search } from "lucide-react";

// Simulación de productos
const productos = [
  {
    id: 1,
    placa: "SENA-001",
    nombre: "Computador Portátil",
    imagen: "https://via.placeholder.com/300",
    estado: "Activo",
    categoria: "Electrónicos",
    fechaAdquisicion: "2024-01-15"
  },
  {
    id: 2,
    placa: "SENA-002",
    nombre: "Proyector",
    imagen: "https://via.placeholder.com/300",
    estado: "En uso",
    categoria: "Equipos de presentación",
    fechaAdquisicion: "2024-02-01"
  },
  {
    id: 3,
    placa: "SENA-003",
    nombre: "Impresora Láser",
    imagen: "https://via.placeholder.com/300",
    estado: "Mantenimiento",
    categoria: "Equipos de oficina",
    fechaAdquisicion: "2024-01-20"
  }
];

export default function SitioProductos() {
  const navigate = useNavigate();
  const { id } = useParams();
  const params = new URLSearchParams(window.location.search);
  const encargado = params.get("encargado") || "Sin encargado";

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-4">
          <Button
            isIconOnly
            variant="light"
            onClick={() => navigate('/sitios')}
            className="hover:bg-default-100"
          >
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Sitio #{id}</h1>
            <p className="text-gray-600 dark:text-gray-400">
              Encargado: <span className="font-semibold">{encargado}</span>
            </p>
          </div>
        </div>
        <Button
          color="primary"
          endContent={<Plus className="w-4 h-4" />}
          onClick={() => {/* TODO: Implementar agregar producto */}}
        >
          Agregar Producto
        </Button>
      </div>

      {/* Search and Filter Section */}
      <div className="mb-6 flex gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Buscar productos..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>
        <select className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary">
          <option value="">Todas las categorías</option>
          <option value="electronicos">Electrónicos</option>
          <option value="oficina">Equipos de oficina</option>
          <option value="presentacion">Equipos de presentación</option>
        </select>
        <select className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary">
          <option value="">Todos los estados</option>
          <option value="activo">Activo</option>
          <option value="en_uso">En uso</option>
          <option value="mantenimiento">Mantenimiento</option>
        </select>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {productos.map((prod) => (
          <Card key={prod.id} className="hover:shadow-lg transition-shadow duration-300">
            <CardBody className="p-0">
              <Image
                shadow="sm"
                radius="lg"
                width="100%"
                alt={prod.nombre}
                className="w-full object-cover h-[200px]"
                src={prod.imagen}
              />
              <div className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold">{prod.nombre}</h3>
                    <p className="text-gray-500 dark:text-gray-400 font-mono">{prod.placa}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    prod.estado === 'Activo' ? 'bg-green-100 text-green-800' :
                    prod.estado === 'En uso' ? 'bg-blue-100 text-blue-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {prod.estado}
                  </span>
                </div>
                <div className="mt-4 space-y-2">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    <span className="font-semibold">Categoría:</span> {prod.categoria}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    <span className="font-semibold">Fecha de adquisición:</span> {prod.fechaAdquisicion}
                  </p>
                </div>
              </div>
            </CardBody>
            <CardFooter className="flex justify-between gap-2">
              <Button
                variant="flat"
                color="primary"
                className="flex-1"
                onClick={() => {/* TODO: Implementar editar producto */}}
              >
                Editar
              </Button>
              <Button
                variant="flat"
                color="danger"
                className="flex-1"
                onClick={() => {/* TODO: Implementar eliminar producto */}}
              >
                Eliminar
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
} 