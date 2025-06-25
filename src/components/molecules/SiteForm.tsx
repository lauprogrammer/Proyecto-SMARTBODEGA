import React, { useState } from "react";
import SiteTypeSelect from "../atoms/SiteTypeSelect";
import { statusOptions } from "../../types/sitios";

interface SiteFormProps {
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

const initialState = {
  name: "",
  manager: "",
  content: "",
  status: "active",
  type: "",
};

const SiteForm: React.FC<SiteFormProps> = ({ onSubmit, onCancel }) => {
  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState<any>({});

  const validate = () => {
    const newErrors: any = {};
    if (!form.name) newErrors.name = "El nombre es requerido";
    if (!form.manager) newErrors.manager = "El gerente es requerido";
    if (!form.content) newErrors.content = "El contenido es requerido";
    if (!form.type) newErrors.type = "El tipo es requerido";
    return newErrors;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validate();
    setErrors(validation);
    if (Object.keys(validation).length === 0) {
      onSubmit(form);
      setForm(initialState);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <label className="font-medium text-sm text-gray-700">Nombre</label>
        <input
          className={`border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#5D0F1D] ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
          name="name"
          value={form.name}
          onChange={handleChange}
        />
        {errors.name && <span className="text-xs text-red-500">{errors.name}</span>}
      </div>
      <div className="flex flex-col gap-1">
        <label className="font-medium text-sm text-gray-700">Gerente</label>
        <input
          className={`border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#5D0F1D] ${errors.manager ? 'border-red-500' : 'border-gray-300'}`}
          name="manager"
          value={form.manager}
          onChange={handleChange}
        />
        {errors.manager && <span className="text-xs text-red-500">{errors.manager}</span>}
      </div>
      <div className="flex flex-col gap-1">
        <label className="font-medium text-sm text-gray-700">Contenido</label>
        <input
          className={`border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#5D0F1D] ${errors.content ? 'border-red-500' : 'border-gray-300'}`}
          name="content"
          value={form.content}
          onChange={handleChange}
        />
        {errors.content && <span className="text-xs text-red-500">{errors.content}</span>}
      </div>
      <div className="flex flex-col gap-1">
        <label className="font-medium text-sm text-gray-700">Estado</label>
        <select
          className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#5D0F1D] border-gray-300"
          name="status"
          value={form.status}
          onChange={handleChange}
        >
          {statusOptions.map((opt) => (
            <option key={opt.uid} value={opt.uid}>{opt.name}</option>
          ))}
        </select>
      </div>
      <SiteTypeSelect value={form.type} onChange={handleChange} error={errors.type} />
      <div className="flex gap-2 justify-end mt-2">
        <button type="button" onClick={onCancel} className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300">Cancelar</button>
        <button type="submit" className="px-4 py-2 rounded-lg bg-[#5D0F1D] text-white hover:bg-[#7A1E2E]">Guardar</button>
      </div>
    </form>
  );
};

export default SiteForm; 