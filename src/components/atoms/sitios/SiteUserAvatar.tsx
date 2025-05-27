import React from 'react';
import { User } from "@nextui-org/react";

interface SiteUserAvatarProps {
  name: string;
  location: string;
  avatar: string;
}

export const SiteUserAvatar: React.FC<SiteUserAvatarProps> = ({ name, location, avatar }) => {
  return (
    <User
      avatarProps={{ radius: "full", size: "sm", src: avatar }}
      classNames={{
        description: "text-default-500",
      }}
      description={location}
      name={name}
    >
      {location}
    </User>
  );
}; 