import React, { useState } from 'react';
import { X, Shield, Key, Lock, User, Save, Bell, Database, Printer, Calendar, Globe, FileText } from 'lucide-react';

interface SettingsProps {
  isOpen: boolean;
  onClose: () => void;
}

const Settings: React.FC<SettingsProps> = ({ isOpen, onClose }) => {
  const [settings, setSettings] = useState({
    // Seguridad
    twoFactorAuth: false,
    passwordExpiration: 30,
    maxLoginAttempts: 3,
    sessionTimeout: 30,
    ipRestriction: false,
    
    // Notificaciones
    emailNotifications: true,
    pushNotifications: false,
    lowStockAlert: true,
    expirationAlert: true,
    movementAlert: true,
    
    // Sistema
    language: 'es',
    dateFormat: 'DD/MM/YYYY',
    timeFormat: '24h',
    defaultPrinter: 'default',
    reportFormat: 'PDF',
    autoSave: true
  });

  const [showChangePassword, setShowChangePassword] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleChange = (key: string, value: string | boolean | number) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí iría la lógica para cambiar la contraseña
    console.log('Cambiando contraseña...', passwordData);
    setShowChangePassword(false);
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-xl">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-gradient-to-r from-[#5D0F1D] to-[#8B2438] px-8 py-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">Configuración del Sistema</h2>
          <button 
            onClick={onClose}
            className="text-white hover:bg-white/20 p-2 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Seguridad */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Seguridad
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Autenticación de Dos Factores</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.twoFactorAuth}
                      onChange={(e) => handleChange('twoFactorAuth', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#5D0F1D]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#5D0F1D]"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Expiración de Contraseña</span>
                  <select
                    value={settings.passwordExpiration}
                    onChange={(e) => handleChange('passwordExpiration', Number(e.target.value))}
                    className="w-32 px-3 py-1 border rounded-lg focus:ring-2 focus:ring-[#5D0F1D]"
                  >
                    <option value={15}>15 días</option>
                    <option value={30}>30 días</option>
                    <option value={60}>60 días</option>
                    <option value={90}>90 días</option>
                  </select>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Intentos de Inicio de Sesión</span>
                  <select
                    value={settings.maxLoginAttempts}
                    onChange={(e) => handleChange('maxLoginAttempts', Number(e.target.value))}
                    className="w-32 px-3 py-1 border rounded-lg focus:ring-2 focus:ring-[#5D0F1D]"
                  >
                    <option value={3}>3 intentos</option>
                    <option value={5}>5 intentos</option>
                    <option value={10}>10 intentos</option>
                  </select>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Tiempo de Sesión</span>
                  <select
                    value={settings.sessionTimeout}
                    onChange={(e) => handleChange('sessionTimeout', Number(e.target.value))}
                    className="w-32 px-3 py-1 border rounded-lg focus:ring-2 focus:ring-[#5D0F1D]"
                  >
                    <option value={15}>15 minutos</option>
                    <option value={30}>30 minutos</option>
                    <option value={60}>1 hora</option>
                    <option value={120}>2 horas</option>
                  </select>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Restricción por IP</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.ipRestriction}
                      onChange={(e) => handleChange('ipRestriction', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#5D0F1D]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#5D0F1D]"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Cambiar Contraseña</span>
                  <button
                    onClick={() => setShowChangePassword(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-[#5D0F1D] text-white rounded-lg hover:bg-[#7A1E2E] transition-colors"
                  >
                    <Key className="w-4 h-4" />
                    Cambiar
                  </button>
                </div>
              </div>
            </div>

            {/* Notificaciones */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <Bell className="w-5 h-5" />
                Notificaciones
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Notificaciones por Email</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.emailNotifications}
                      onChange={(e) => handleChange('emailNotifications', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#5D0F1D]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#5D0F1D]"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Notificaciones Push</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.pushNotifications}
                      onChange={(e) => handleChange('pushNotifications', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#5D0F1D]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#5D0F1D]"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Alertas de Stock Bajo</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.lowStockAlert}
                      onChange={(e) => handleChange('lowStockAlert', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#5D0F1D]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#5D0F1D]"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Alertas de Expiración</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.expirationAlert}
                      onChange={(e) => handleChange('expirationAlert', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#5D0F1D]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#5D0F1D]"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Alertas de Movimiento</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.movementAlert}
                      onChange={(e) => handleChange('movementAlert', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#5D0F1D]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#5D0F1D]"></div>
                  </label>
                </div>
              </div>
            </div>

            {/* Sistema */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <Database className="w-5 h-5" />
                Sistema
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Idioma</span>
                  <select
                    value={settings.language}
                    onChange={(e) => handleChange('language', e.target.value)}
                    className="w-32 px-3 py-1 border rounded-lg focus:ring-2 focus:ring-[#5D0F1D]"
                  >
                    <option value="es">Español</option>
                    <option value="en">English</option>
                  </select>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Formato de Fecha</span>
                  <select
                    value={settings.dateFormat}
                    onChange={(e) => handleChange('dateFormat', e.target.value)}
                    className="w-32 px-3 py-1 border rounded-lg focus:ring-2 focus:ring-[#5D0F1D]"
                  >
                    <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                    <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                    <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                  </select>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Formato de Hora</span>
                  <select
                    value={settings.timeFormat}
                    onChange={(e) => handleChange('timeFormat', e.target.value)}
                    className="w-32 px-3 py-1 border rounded-lg focus:ring-2 focus:ring-[#5D0F1D]"
                  >
                    <option value="24h">24 horas</option>
                    <option value="12h">12 horas</option>
                  </select>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Impresora Predeterminada</span>
                  <select
                    value={settings.defaultPrinter}
                    onChange={(e) => handleChange('defaultPrinter', e.target.value)}
                    className="w-32 px-3 py-1 border rounded-lg focus:ring-2 focus:ring-[#5D0F1D]"
                  >
                    <option value="default">Predeterminada</option>
                    <option value="printer1">Impresora 1</option>
                    <option value="printer2">Impresora 2</option>
                  </select>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Formato de Reporte</span>
                  <select
                    value={settings.reportFormat}
                    onChange={(e) => handleChange('reportFormat', e.target.value)}
                    className="w-32 px-3 py-1 border rounded-lg focus:ring-2 focus:ring-[#5D0F1D]"
                  >
                    <option value="PDF">PDF</option>
                    <option value="Excel">Excel</option>
                    <option value="CSV">CSV</option>
                  </select>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Guardado Automático</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.autoSave}
                      onChange={(e) => handleChange('autoSave', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#5D0F1D]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#5D0F1D]"></div>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Modal de Cambio de Contraseña */}
          {showChangePassword && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[60]">
              <div className="bg-white rounded-2xl p-8 max-w-md w-full">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-semibold text-gray-800">Cambiar Contraseña</h3>
                  <button
                    onClick={() => setShowChangePassword(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
                <form onSubmit={handlePasswordSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Contraseña Actual
                    </label>
                    <input
                      type="password"
                      name="currentPassword"
                      value={passwordData.currentPassword}
                      onChange={handlePasswordChange}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#5D0F1D]"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nueva Contraseña
                    </label>
                    <input
                      type="password"
                      name="newPassword"
                      value={passwordData.newPassword}
                      onChange={handlePasswordChange}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#5D0F1D]"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Confirmar Nueva Contraseña
                    </label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={passwordData.confirmPassword}
                      onChange={handlePasswordChange}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#5D0F1D]"
                      required
                    />
                  </div>
                  <div className="flex justify-end gap-4 mt-6">
                    <button
                      type="button"
                      onClick={() => setShowChangePassword(false)}
                      className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-[#5D0F1D] text-white rounded-lg hover:bg-[#7A1E2E]"
                    >
                      Cambiar Contraseña
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="mt-8 flex justify-end">
            <button
              onClick={onClose}
              className="px-6 py-2 bg-[#5D0F1D] text-white rounded-lg hover:bg-[#7A1E2E] transition-colors flex items-center gap-2"
            >
              <Save className="w-5 h-5" />
              Guardar Cambios
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings; 