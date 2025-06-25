import React from 'react';
import { Pagination, Selection, SortDescriptor } from "@nextui-org/react";
import { SiteTable } from '../organisms/SiteTable';
import { SiteTableControls } from '../organisms/SiteTableControls';

export interface SiteManagementLayoutProps {
  columns: Array<{ name: string; uid: string; sortable?: boolean }>;
  sites: Array<{
    id: string;
    name: string;
    manager: string;
    content: string;
    status: "active" | "inactive" | "maintenance";
    type: "store" | "warehouse" | "distribution";
    createdAt: string;
    updatedAt: string;
  }>;
  statusOptions: Array<{ name: string; uid: string }>;
  typeOptions: Array<{ name: string; uid: string }>;
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
  sortDescriptor: SortDescriptor;
  onSortChange: (descriptor: SortDescriptor) => void;
  selectedKeys: Selection;
  onSelectionChange: (keys: Selection) => void;
  page: number;
  onPageChange: (page: number) => void;
  totalPages: number;
  onAddSite?: (data: any) => void;
}

export const SiteManagementLayout: React.FC<SiteManagementLayoutProps> = ({
  columns,
  sites,
  statusOptions,
  typeOptions,
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
  sortDescriptor,
  onSortChange,
  selectedKeys,
  onSelectionChange,
  page,
  onPageChange,
  totalPages,
  onAddSite,
}) => {
  return (
    <div className="p-6">
      <div className="flex flex-col gap-4">
        <SiteTableControls
          filterValue={filterValue}
          onSearchChange={onSearchChange}
          statusFilter={statusFilter}
          onStatusFilterChange={onStatusFilterChange}
          typeFilter={typeFilter}
          onTypeFilterChange={onTypeFilterChange}
          visibleColumns={visibleColumns}
          onVisibleColumnsChange={onVisibleColumnsChange}
          totalSites={totalSites}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={onRowsPerPageChange}
          onAddSite={onAddSite || (() => {})}
        />
        <SiteTable
          columns={columns}
          sites={sites}
          sortDescriptor={sortDescriptor}
          onSortChange={onSortChange}
          selectedKeys={selectedKeys}
          onSelectionChange={onSelectionChange}
          page={page}
          onPageChange={onPageChange}
          totalPages={totalPages}
        />
      </div>
    </div>
  );
}; 