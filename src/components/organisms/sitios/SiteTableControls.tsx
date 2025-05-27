import React from "react";
import {
  Input,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Selection,
} from "@nextui-org/react";
import { PlusIcon, SearchIcon, ChevronDownIcon } from "../../../icons";
import { columns, statusOptions, typeOptions } from "../../../types/sitios";

export interface SiteTableControlsProps {
  filterValue: string;
  onSearchChange: (value: string) => void;
  statusFilter: Selection;
  onStatusFilterChange: (value: Selection) => void;
  typeFilter: Selection;
  onTypeFilterChange: (value: Selection) => void;
  visibleColumns: Selection;
  onVisibleColumnsChange: (value: Selection) => void;
  totalSites: number;
  rowsPerPage: number;
  onRowsPerPageChange: (value: number) => void;
}

export const SiteTableControls: React.FC<SiteTableControlsProps> = ({
  filterValue,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  typeFilter,
  onTypeFilterChange,
  visibleColumns,
  onVisibleColumnsChange,
  totalSites,
  rowsPerPage,
  onRowsPerPageChange,
}) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between gap-3 items-end">
        <Input
          isClearable
          className="w-full sm:max-w-[44%]"
          placeholder="Buscar por nombre..."
          startContent={<SearchIcon />}
          value={filterValue}
          onValueChange={onSearchChange}
        />
        <div className="flex gap-3">
          <Dropdown>
            <DropdownTrigger className="hidden sm:flex">
              <Button
                endContent={<ChevronDownIcon className="text-small" />}
                variant="flat"
              >
                Estado
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              disallowEmptySelection
              aria-label="Filtro de estado"
              closeOnSelect={false}
              selectedKeys={statusFilter}
              selectionMode="multiple"
              onSelectionChange={onStatusFilterChange}
            >
              {statusOptions.map((status) => (
                <DropdownItem key={status.uid} className="capitalize">
                  {status.name}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
          <Dropdown>
            <DropdownTrigger className="hidden sm:flex">
              <Button
                endContent={<ChevronDownIcon className="text-small" />}
                variant="flat"
              >
                Tipo
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              disallowEmptySelection
              aria-label="Filtro de tipo"
              closeOnSelect={false}
              selectedKeys={typeFilter}
              selectionMode="multiple"
              onSelectionChange={onTypeFilterChange}
            >
              {typeOptions.map((type) => (
                <DropdownItem key={type.uid} className="capitalize">
                  {type.name}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
          <Dropdown>
            <DropdownTrigger className="hidden sm:flex">
              <Button
                endContent={<ChevronDownIcon className="text-small" />}
                variant="flat"
              >
                Columnas
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              disallowEmptySelection
              aria-label="Columnas visibles"
              closeOnSelect={false}
              selectedKeys={visibleColumns}
              selectionMode="multiple"
              onSelectionChange={onVisibleColumnsChange}
            >
              {columns.map((column) => (
                <DropdownItem key={column.uid} className="capitalize">
                  {column.name}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
          <Button
            color="primary"
            endContent={<PlusIcon />}
            onPress={() => console.log("Agregar nuevo sitio")}
          >
            Agregar Nuevo
          </Button>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-default-400 text-small">
          Total {totalSites} sitios
        </span>
        <label className="flex items-center text-default-400 text-small">
          Filas por página:
          <select
            className="bg-transparent outline-none text-default-400 text-small"
            onChange={(e) => onRowsPerPageChange(Number(e.target.value))}
            value={rowsPerPage}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
          </select>
        </label>
      </div>
    </div>
  );
}; 