import React from "react";
import { typeOptions } from "../../types/sitios";

interface SiteTypeSelectProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  error?: string;
}

const SiteTypeSelect: React.FC<SiteTypeSelectProps> = ({ value, onChange, error }) => (
  <div className="flex flex-col gap-1">
    <label className="font-medium text-sm text-gray-700">Tipo de Sitio</label>
    <select
      className={`border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#5D0F1D] ${error ? 'border-red-500' : 'border-gray-300'}`}
      value={value}
      onChange={onChange}
      name="type"
    >
      <option value="">Seleccione un tipo</option>
      {typeOptions.map((opt) => (
        <option key={opt.uid} value={opt.uid}>{opt.name}</option>
      ))}
    </select>
    {error && <span className="text-xs text-red-500">{error}</span>}
  </div>
);

export default SiteTypeSelect; 