import React from 'react';
import { Chip, ChipProps } from "@nextui-org/react";

interface SiteStatusChipProps {
  status: string;
}

const statusColorMap: Record<string, ChipProps["color"]> = {
  active: "success",
  inactive: "danger",
  maintenance: "warning",
};

export const SiteStatusChip: React.FC<SiteStatusChipProps> = ({ status }) => {
  return (
    <Chip
      className="capitalize border-none gap-1 text-default-600"
      color={statusColorMap[status]}
      size="sm"
      variant="dot"
    >
      {status}
    </Chip>
  );
}; 