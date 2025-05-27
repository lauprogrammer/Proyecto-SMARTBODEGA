import React from 'react';
import { SitesPage } from './sitios/SitesPage';

const Sitios: React.FC = () => {
  return (
    <div className="py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Gestión de Sitios</h1>
      </div>
      <div className="bg-content1 rounded-lg shadow-lg">
        <SitesPage />
      </div>
    </div>
  );
};

export default Sitios;
