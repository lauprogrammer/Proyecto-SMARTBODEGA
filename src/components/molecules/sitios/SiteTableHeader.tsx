import React from 'react';
import { TableHeader, TableColumn } from "@nextui-org/react";

interface Column {
  name: string;
  uid: string;
  sortable?: boolean;
}

interface SiteTableHeaderProps {
  columns: Column[];
}

export const SiteTableHeader: React.FC<SiteTableHeaderProps> = ({ columns }) => {
  return (
    <TableHeader>
      {columns.map((column) => (
        <TableColumn
          key={column.uid}
          allowsSorting={column.sortable}
        >
          {column.name}
        </TableColumn>
      ))}
    </TableHeader>
  );
}; 