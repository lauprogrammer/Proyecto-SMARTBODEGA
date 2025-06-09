import React from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import { VerticalDotsIcon } from "../../icons";
import { Site } from "../../types/sitios";

interface SiteActionButtonProps {
  site: Site;
}

export const SiteActionButton: React.FC<SiteActionButtonProps> = ({ site }) => {
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button isIconOnly size="sm" variant="light">
          <VerticalDotsIcon className="text-default-300" />
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Acciones del sitio">
        <DropdownItem
          key="view"
          onClick={() => console.log("Ver detalles", site.id)}
          description="Ver información detallada del sitio"
        >
          Ver detalles
        </DropdownItem>
        <DropdownItem
          key="edit"
          onClick={() => console.log("Editar", site.id)}
          description="Modificar información del sitio"
        >
          Editar
        </DropdownItem>
        <DropdownItem
          key="delete"
          onClick={() => console.log("Eliminar", site.id)}
          description="Eliminar el sitio"
          className="text-danger"
          color="danger"
        >
          Eliminar
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}; 