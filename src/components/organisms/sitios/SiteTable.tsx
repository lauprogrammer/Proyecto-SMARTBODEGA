import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  Tooltip,
  Selection,
  SortDescriptor,
} from "@nextui-org/react";
import { Site } from "../../../types/sitios";
import { SiteActionButton } from "../../molecules/sitios/SiteActionButton";
import { VerticalDotsIcon } from "../../../icons";

export interface SiteTableProps {
  columns: Array<{ name: string; uid: string; sortable?: boolean }>;
  sites: Site[];
  sortDescriptor: SortDescriptor;
  onSortChange: (descriptor: SortDescriptor) => void;
  selectedKeys: Selection;
  onSelectionChange: (keys: Selection) => void;
  page: number;
  onPageChange: (page: number) => void;
  totalPages: number;
}

export const SiteTable: React.FC<SiteTableProps> = ({
  columns,
  sites,
  sortDescriptor,
  onSortChange,
  selectedKeys,
  onSelectionChange,
  page,
  onPageChange,
  totalPages,
}) => {
  const renderCell = React.useCallback(
    (site: Site, columnKey: React.Key) => {
      const cellValue = site[columnKey as keyof Site];

      switch (columnKey) {
        case "name":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-small capitalize">{cellValue}</p>
              <p className="text-bold text-tiny capitalize text-default-400">
                {site.type}
              </p>
            </div>
          );
        case "manager":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-small capitalize">{cellValue}</p>
            </div>
          );
        case "content":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-small capitalize">{cellValue}</p>
            </div>
          );
        case "status":
          return (
            <Chip
              className="capitalize"
              color={
                site.status === "active"
                  ? "success"
                  : site.status === "maintenance"
                  ? "warning"
                  : "danger"
              }
              size="sm"
              variant="flat"
            >
              {cellValue}
            </Chip>
          );
        case "actions":
          return (
            <div className="relative flex justify-end items-center gap-2">
              <Tooltip content="Detalles">
                <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                  <SiteActionButton site={site} />
                </span>
              </Tooltip>
            </div>
          );
        default:
          return cellValue;
      }
    },
    []
  );

  return (
    <Table
      aria-label="Tabla de sitios"
      bottomContent={
        <div className="flex w-full justify-center">
          <div className="flex gap-2">
            <button
              className="px-2 py-1 rounded-md bg-default-100"
              onClick={() => onPageChange(page - 1)}
              disabled={page === 1}
            >
              Anterior
            </button>
            <button
              className="px-2 py-1 rounded-md bg-default-100"
              onClick={() => onPageChange(page + 1)}
              disabled={page === totalPages}
            >
              Siguiente
            </button>
          </div>
        </div>
      }
      classNames={{
        wrapper: "min-h-[222px]",
      }}
      selectedKeys={selectedKeys}
      selectionMode="multiple"
      sortDescriptor={sortDescriptor}
      topContentPlacement="outside"
      onSelectionChange={onSelectionChange}
      onSortChange={onSortChange}
    >
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "actions" ? "center" : "start"}
            allowsSorting={column.sortable}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody emptyContent={"No se encontraron sitios"} items={sites}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}; 