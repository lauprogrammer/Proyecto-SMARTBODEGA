import React, { useState, useRef } from 'react';
import { User, Mail, Phone, Building2, Shield, Camera, X, Save } from 'lucide-react';

const Profile = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState({
    nombre: 'Juan Pérez',
    email: 'juan@example.com',
    telefono: '1234567890',
    rol: 'Administrador',
    centro: 'Centro Principal',
    sede: 'Sede Norte'
  });

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageClick = () => {
    if (isEditing) {
      fileInputRef.current?.click();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl w-full max-w-2xl overflow-hidden shadow-xl">
        {/* Header */}
        <div className="relative h-48 bg-gradient-to-r from-[#5D0F1D] to-[#8B2438]">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-white hover:bg-white/20 p-2 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          
          <div className="absolute -bottom-16 left-8 flex items-end space-x-4">
            <div className="relative">
              <div 
                className="w-32 h-32 bg-white rounded-full flex items-center justify-center border-4 border-white shadow-lg overflow-hidden cursor-pointer"
                onClick={handleImageClick}
              >
                {profileImage ? (
                  <img 
                    src={profileImage} 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User className="w-16 h-16 text-[#5D0F1D]" />
                )}
              </div>
              {isEditing && (
                <button 
                  onClick={handleImageClick}
                  className="absolute bottom-0 right-0 bg-[#5D0F1D] text-white p-2 rounded-full hover:bg-[#7A1E2E] transition-colors"
                >
                  <Camera className="w-4 h-4" />
                </button>
              )}
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageChange}
                accept="image/*"
                className="hidden"
              />
            </div>
            <div className="mb-4 text-white">
              <h2 className="text-2xl font-bold">{formData.nombre}</h2>
              <p className="flex items-center space-x-2">
                <Shield className="w-4 h-4" />
                <span>{formData.rol}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="pt-20 p-8">
          <div className="flex justify-end mb-6">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="flex items-center space-x-2 px-4 py-2 border border-[#5D0F1D] text-[#5D0F1D] rounded-lg hover:bg-[#5D0F1D] hover:text-white transition-colors"
            >
              <span>{isEditing ? 'Cancelar' : 'Editar Perfil'}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Nombre Completo</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.nombre}
                    onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#5D0F1D]"
                  />
                ) : (
                  <div className="flex items-center space-x-2 text-gray-700">
                    <User className="w-5 h-5 text-[#5D0F1D]" />
                    <span>{formData.nombre}</span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Email</label>
                {isEditing ? (
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#5D0F1D]"
                  />
                ) : (
                  <div className="flex items-center space-x-2 text-gray-700">
                    <Mail className="w-5 h-5 text-[#5D0F1D]" />
                    <span>{formData.email}</span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Teléfono</label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={formData.telefono}
                    onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#5D0F1D]"
                  />
                ) : (
                  <div className="flex items-center space-x-2 text-gray-700">
                    <Phone className="w-5 h-5 text-[#5D0F1D]" />
                    <span>{formData.telefono}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Rol</label>
                <div className="flex items-center space-x-2 text-gray-700">
                  <Shield className="w-5 h-5 text-[#5D0F1D]" />
                  <span>{formData.rol}</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Centro</label>
                {isEditing ? (
                  <select
                    value={formData.centro}
                    onChange={(e) => setFormData({ ...formData, centro: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#5D0F1D]"
                  >
                    <option value="Centro Principal">Centro Principal</option>
                    <option value="Centro Secundario">Centro Secundario</option>
                  </select>
                ) : (
                  <div className="flex items-center space-x-2 text-gray-700">
                    <Building2 className="w-5 h-5 text-[#5D0F1D]" />
                    <span>{formData.centro}</span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Sede</label>
                {isEditing ? (
                  <select
                    value={formData.sede}
                    onChange={(e) => setFormData({ ...formData, sede: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#5D0F1D]"
                  >
                    <option value="Sede Norte">Sede Norte</option>
                    <option value="Sede Sur">Sede Sur</option>
                  </select>
                ) : (
                  <div className="flex items-center space-x-2 text-gray-700">
                    <Building2 className="w-5 h-5 text-[#5D0F1D]" />
                    <span>{formData.sede}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {isEditing && (
            <div className="flex justify-end mt-8">
              <button
                onClick={() => setIsEditing(false)}
                className="flex items-center space-x-2 px-6 py-2 bg-[#5D0F1D] text-white rounded-lg hover:bg-[#7A1E2E] transition-colors"
              >
                <Save className="w-5 h-5" />
                <span>Guardar Cambios</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile; 