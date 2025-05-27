import React from 'react';
import { Chip, ChipProps } from "@nextui-org/react";

interface SiteTypeChipProps {
  type: string;
}

const typeColorMap: Record<string, ChipProps["color"]> = {
  bodega: "primary",
  almacen: "secondary",
  deposito: "success",
  centro: "warning",
  otro: "default",
};

export const SiteTypeChip: React.FC<SiteTypeChipProps> = ({ type }) => {
  return (
    <Chip
      className="capitalize border-none gap-1 text-default-600"
      color={typeColorMap[type.toLowerCase()] || "default"}
      size="sm"
      variant="flat"
    >
      {type}
    </Chip>
  );
}; 