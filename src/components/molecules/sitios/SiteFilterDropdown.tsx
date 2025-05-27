import React from 'react';
import { Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Selection } from "@nextui-org/react";

interface SiteFilterDropdownProps {
  label: string;
  options: Array<{ name: string; uid: string }>;
  selectedKeys: Selection;
  onSelectionChange: (keys: Selection) => void;
}

export const SiteFilterDropdown: React.FC<SiteFilterDropdownProps> = ({
  label,
  options,
  selectedKeys,
  onSelectionChange,
}) => {
  return (
    <Dropdown>
      <DropdownTrigger className="hidden sm:flex">
        <Button
          endContent={<ChevronDownIcon className="text-small" />}
          size="sm"
          variant="flat"
        >
          {label}
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        disallowEmptySelection
        aria-label="Table Columns"
        closeOnSelect={false}
        selectedKeys={selectedKeys}
        selectionMode="multiple"
        onSelectionChange={onSelectionChange}
      >
        {options.map((option) => (
          <DropdownItem key={option.uid} className="capitalize">
            {option.name}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
};

const ChevronDownIcon = ({ className }: { className?: string }) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height="1em"
    role="presentation"
    viewBox="0 0 24 24"
    width="1em"
    className={className}
  >
    <path
      d="M6 9l6 6 6-6"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    />
  </svg>
); 