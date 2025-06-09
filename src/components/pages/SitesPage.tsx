import React, { useState, useCallback } from "react";
import { Selection, SortDescriptor } from "@nextui-org/react";
import { SiteManagementLayout } from "../templates/SiteManagementLayout";
import { columns, statusOptions, typeOptions, sites } from "../../types/sitios";

export const SitesPage: React.FC = () => {
  const [filterValue, setFilterValue] = useState("");
  const [statusFilter, setStatusFilter] = useState<Selection>(new Set([]));
  const [typeFilter, setTypeFilter] = useState<Selection>(new Set([]));
  const [visibleColumns, setVisibleColumns] = useState<Selection>(
    new Set(columns.map((col) => col.uid))
  );
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: "name",
    direction: "ascending",
  });
  const [page, setPage] = useState(1);
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]));

  const filteredItems = React.useMemo(() => {
    let filteredSites = [...sites];

    if (filterValue) {
      filteredSites = filteredSites.filter((site) =>
        site.name.toLowerCase().includes(filterValue.toLowerCase())
      );
    }

    if (statusFilter instanceof Set && statusFilter.size > 0) {
      filteredSites = filteredSites.filter((site) =>
        statusFilter.has(site.status)
      );
    }

    if (typeFilter instanceof Set && typeFilter.size > 0) {
      filteredSites = filteredSites.filter((site) =>
        typeFilter.has(site.type)
      );
    }

    return filteredSites;
  }, [sites, filterValue, statusFilter, typeFilter]);

  const sortedItems = React.useMemo(() => {
    return [...filteredItems].sort((a, b) => {
      const first = a[sortDescriptor.column as keyof typeof a];
      const second = b[sortDescriptor.column as keyof typeof b];
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [filteredItems, sortDescriptor]);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return sortedItems.slice(start, end);
  }, [page, rowsPerPage, sortedItems]);

  const totalPages = Math.ceil(filteredItems.length / rowsPerPage);

  const onSearchChange = useCallback((value: string) => {
    setFilterValue(value);
    setPage(1);
  }, []);

  const onStatusFilterChange = useCallback((value: Selection) => {
    setStatusFilter(value);
    setPage(1);
  }, []);

  const onTypeFilterChange = useCallback((value: Selection) => {
    setTypeFilter(value);
    setPage(1);
  }, []);

  const onVisibleColumnsChange = useCallback((value: Selection) => {
    setVisibleColumns(value);
  }, []);

  const onRowsPerPageChange = useCallback((value: number) => {
    setRowsPerPage(value);
    setPage(1);
  }, []);

  const onSortChange = useCallback((descriptor: SortDescriptor) => {
    setSortDescriptor(descriptor);
  }, []);

  const onSelectionChange = useCallback((keys: Selection) => {
    setSelectedKeys(keys);
  }, []);

  return (
    <SiteManagementLayout
      columns={columns}
      sites={items}
      statusOptions={statusOptions}
      typeOptions={typeOptions}
      filterValue={filterValue}
      onSearchChange={onSearchChange}
      statusFilter={statusFilter}
      onStatusFilterChange={onStatusFilterChange}
      typeFilter={typeFilter}
      onTypeFilterChange={onTypeFilterChange}
      visibleColumns={visibleColumns}
      onVisibleColumnsChange={onVisibleColumnsChange}
      totalSites={filteredItems.length}
      rowsPerPage={rowsPerPage}
      onRowsPerPageChange={onRowsPerPageChange}
      sortDescriptor={sortDescriptor}
      onSortChange={onSortChange}
      selectedKeys={selectedKeys}
      onSelectionChange={onSelectionChange}
      page={page}
      onPageChange={setPage}
      totalPages={totalPages}
    />
  );
}; 