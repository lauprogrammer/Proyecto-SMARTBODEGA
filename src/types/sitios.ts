import { ChipProps } from "@nextui-org/react";

export interface Site {
  id: string;
  name: string;
  manager: string;
  content: string;
  status: "active" | "inactive" | "maintenance";
  type: "store" | "warehouse" | "distribution";
  createdAt: string;
  updatedAt: string;
}

export interface Column {
  name: string;
  uid: string;
  sortable?: boolean;
}

export const columns: Column[] = [
  { name: "NOMBRE", uid: "name", sortable: true },
  { name: "GERENTE", uid: "manager", sortable: true },
  { name: "CONTENIDO", uid: "content", sortable: true },
  { name: "ESTADO", uid: "status", sortable: true },
  { name: "ACCIONES", uid: "actions" },
];

export const statusOptions = [
  { name: "Activo", uid: "active" },
  { name: "Inactivo", uid: "inactive" },
  { name: "Mantenimiento", uid: "maintenance" },
];

export const typeOptions = [
  { name: "Tienda", uid: "store" },
  { name: "Almacén", uid: "warehouse" },
  { name: "Distribución", uid: "distribution" },
];

export const sites: Site[] = [
  {
    id: "1",
    name: "Tienda Central",
    manager: "Juan Pérez",
    content: "Productos generales",
    status: "active",
    type: "store",
    createdAt: "2024-01-01",
    updatedAt: "2024-01-01",
  },
  {
    id: "2",
    name: "Almacén Norte",
    manager: "María García",
    content: "Electrónicos",
    status: "active",
    type: "warehouse",
    createdAt: "2024-01-02",
    updatedAt: "2024-01-02",
  },
  {
    id: "3",
    name: "Centro de Distribución",
    manager: "Carlos López",
    content: "Logística",
    status: "maintenance",
    type: "distribution",
    createdAt: "2024-01-03",
    updatedAt: "2024-01-03",
  },
];

export const statusColorMap: Record<string, ChipProps["color"]> = {
  active: "success",
  inactive: "danger",
  maintenance: "warning",
};

export const INITIAL_VISIBLE_COLUMNS = ["name", "manager", "status", "actions"]; 