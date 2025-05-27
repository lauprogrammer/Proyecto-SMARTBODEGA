import React from 'react';
import { Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/react";
import { useNavigate } from 'react-router-dom';

interface SiteActionButtonProps {
  siteId: number;
  manager: string;
  name: string;
  type: string;
  status: string;
}

export const SiteActionButton: React.FC<SiteActionButtonProps> = ({ 
  siteId, 
  manager, 
  name,
  type,
  status 
}) => {
  const navigate = useNavigate();

  const handleViewClick = () => {
    const params = new URLSearchParams({
      encargado: manager,
      nombre: name,
      tipo: type,
      estado: status
    });
    
    navigate(`/sitios/${siteId}/productos?${params.toString()}`);
  };

  return (
    <div className="relative flex justify-end items-center gap-2">
      <Dropdown className="bg-background border-1 border-default-200">
        <DropdownTrigger>
          <Button isIconOnly radius="full" size="sm" variant="light">
            <VerticalDotsIcon className="text-default-400" />
          </Button>
        </DropdownTrigger>
        <DropdownMenu>
          <DropdownItem
            key="view"
            onClick={handleViewClick}
          >
            Ver
          </DropdownItem>
          <DropdownItem key="edit">Editar</DropdownItem>
          <DropdownItem key="delete">Eliminar</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};

const VerticalDotsIcon = ({ className }: { className?: string }) => (
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
      d="M12 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 12c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"
      fill="currentColor"
    />
  </svg>
); 