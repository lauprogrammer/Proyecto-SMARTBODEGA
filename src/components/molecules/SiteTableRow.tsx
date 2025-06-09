import React from 'react';
import { TableRow, TableCell } from "@nextui-org/react";
import { SiteTypeChip } from '../atoms/SiteTypeChip';
import { SiteStatusChip } from '../atoms/SiteStatusChip';
import { SiteUserAvatar } from '../atoms/SiteUserAvatar';
import { SiteActionButton } from '../atoms/SiteActionButton';

interface Site {
  id: number;
  name: string;
  location: string;
  manager: string;
  content: string;
  status: string;
  type: string;
  avatar: string;
  email: string;
}

interface SiteTableRowProps {
  site: Site;
}

export const SiteTableRow: React.FC<SiteTableRowProps> = ({ site }) => {
  return (
    <TableRow key={site.id}>
      <TableCell>{site.id}</TableCell>
      <TableCell>{site.name}</TableCell>
      <TableCell>
        <SiteTypeChip type={site.type} />
      </TableCell>
      <TableCell>{site.location}</TableCell>
      <TableCell>
        <SiteUserAvatar
          name={site.manager}
          avatar={site.avatar}
          location={site.location}
        />
      </TableCell>
      <TableCell>{site.content}</TableCell>
      <TableCell>
        <SiteStatusChip status={site.status} />
      </TableCell>
      <TableCell>
        <SiteActionButton 
          siteId={site.id} 
          manager={site.manager}
          name={site.name}
          type={site.type}
          status={site.status}
        />
      </TableCell>
    </TableRow>
  );
}; 