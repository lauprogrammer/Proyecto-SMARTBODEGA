import { ChevronDown, ChevronUp, LogOut, Users, Building2, Landmark, LayoutGrid, MapPin, User, Package, Boxes, ClipboardList, Truck, Warehouse, UserPlus, UserCog, UserCheck, Settings, Key, FileText, BarChart2 } from "lucide-react";
import { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import Profile from "./Profile";
import SettingsModal from "./Settings";

const Sidebar = ({ isOpen, toggleSidebar }: { isOpen: boolean; toggleSidebar: () => void }) => {
  const [openMenus, setOpenMenus] = useState<{ [key: string]: boolean }>({});
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleMenu = (menu: string) => {
    setOpenMenus((prev) => ({ ...prev, [menu]: !prev[menu] }));
  };

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    if (path === '/manage-users') {
      return;
    }
    toggleSidebar();
  };

  const handleLogout = () => {
    navigate('/login');
  };

  const menuItems = [
    {
      title: "Inicio",
      path: '/dashboard',
      icon: <LayoutGrid className="w-5 h-5" />,
      submenu: []
    },
    {
      title: "Administración",
      icon: <UserCog className="w-5 h-5" />,
      submenu: [
        { 
          title: "Usuarios", 
          path: '/users',
          icon: <Users className="w-5 h-5" />,
          subItems: [
            {
              title: 'Nuevo Usuario',
              path: '/create-user',
              icon: <UserPlus className="w-5 h-5" />
            },
            {
              title: 'Gestionar Usuarios',
              path: '/manage-users',
              icon: <UserCog className="w-5 h-5" />
            },
            {
              title: 'Roles y Permisos',
              path: '/roles',
              icon: <UserCheck className="w-5 h-5" />
            }
          ]
        },
        { 
          title: "Centros", 
          path: '/centers',
          icon: <Building2 className="w-4 h-4" /> 
        },
        { 
          title: "Sedes", 
          path: '/sedes',
          icon: <Landmark className="w-4 h-4" /> 
        },
        { 
          title: "Áreas", 
          path: '/areas',
          icon: <LayoutGrid className="w-4 h-4" /> 
        },
        { 
          title: "Municipios", 
          path: '/municipios',
          icon: <MapPin className="w-4 h-4" /> 
        }
      ]
    },
    {
      title: "Bodega",
      submenu: [
        { 
          title: "Productos", 
          path: '/productos',
          icon: <Package className="w-4 h-4" /> 
        },
        { 
          title: "Categorías", 
          path: '/features',
          icon: <Boxes className="w-4 h-4" /> 
        },
        { 
          title: "Entradas",
          icon: <ClipboardList className="w-4 h-4" />,
          subItems: [
            {
              title: 'Gestión Entradas',
              path: '/entradas',
              icon: <ClipboardList className="w-4 h-4" />
            }
          ]
        },
        { 
          title: "Salidas",
          icon: <Truck className="w-4 h-4" />,
          subItems: [
            {
              title: 'Gestión Salidas',
              path: '/salidas',
              icon: <Truck className="w-4 h-4" />
            }
          ]
        },
        { title: "Almacenes", icon: <Warehouse className="w-4 h-4" /> }
      ]
    },
    {
      title: "Reportes",
      submenu: [
        {
          title: "Generar Reportes",
          path: '/reports',
          icon: <FileText className="w-4 h-4" />
        }
      ]
    },
    {
      title: "Estadísticas",
      submenu: [
        {
          title: "Ver Estadísticas",
          path: '/statistics',
          icon: <BarChart2 className="w-4 h-4" />
        }
      ]
    }
  ];

  return (
    <>
      <div
        className={`bg-[#5D0F1D] text-white h-screen w-64 p-4 space-y-4 transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } fixed z-50`}
      >
        {/* Header */}
        <div className="mt-8 mb-8 flex flex-col items-center relative">
          <button 
            onClick={toggleProfile}
            className="w-16 h-16 mb-3 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors duration-200"
          >
            <User className="w-10 h-10 text-[#5D0F1D]" />
          </button>
          <div className="text-xl font-bold text-center">ADMINISTRADOR</div>
          
          {/* Menú del perfil */}
          {isProfileOpen && (
            <div className="absolute left-full ml-2 top-0 w-48 bg-white rounded-lg shadow-lg py-2 text-[#5D0F1D] z-50">
              <button 
                onClick={() => {
                  setShowProfileModal(true);
                  setIsProfileOpen(false);
                }}
                className="w-full px-4 py-2 text-left flex items-center hover:bg-gray-100"
              >
                <User className="w-5 h-5 mr-2" />
                Ver Perfil
              </button>
              <button 
                onClick={() => {
                  setShowSettingsModal(true);
                  setIsProfileOpen(false);
                }}
                className="w-full px-4 py-2 text-left flex items-center hover:bg-gray-100"
              >
                <Settings className="w-5 h-5 mr-2" />
                Configuración
              </button>
            </div>
          )}
        </div>

        {/* Menús */}
        {menuItems.map((menu) => (
          <div key={menu.title} className="space-y-1">
            <button
              onClick={() => {
                if (menu.path) {
                  handleNavigation(menu.path);
                } else {
                  toggleMenu(menu.title);
                }
              }}
              className="w-full text-left flex justify-between items-center bg-[#7A1E2E] hover:bg-[#8B2438] px-4 py-2.5 rounded-lg transition-colors duration-200"
            >
              <div className="flex items-center space-x-2">
                {menu.icon}
                <span className="font-medium">{menu.title}</span>
              </div>
              {menu.submenu.length > 0 && (
                openMenus[menu.title] ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
              )}
            </button>
            
            {/* Submenús */}
            {openMenus[menu.title] && menu.submenu.length > 0 && (
              <div className="ml-4 mt-2 space-y-1">
                {menu.submenu.map((submenu) => (
                  <div key={submenu.title}>
                    <button
                      onClick={() => {
                        if (submenu.subItems) {
                          toggleMenu(submenu.title);
                        } else if (submenu.path) {
                          handleNavigation(submenu.path);
                        }
                      }}
                      className="w-full flex items-center justify-between space-x-2 px-4 py-2 text-gray-200 hover:text-white hover:bg-[#7A1E2E] rounded-lg transition-colors duration-200"
                    >
                      <div className="flex items-center space-x-2">
                        {submenu.icon}
                        <span>{submenu.title}</span>
                      </div>
                      {submenu.subItems && (
                        openMenus[submenu.title] ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
                      )}
                    </button>
                    
                    {/* Sub-submenús */}
                    {submenu.subItems && openMenus[submenu.title] && (
                      <div className="ml-4 mt-2 space-y-1">
                        {submenu.subItems.map((subsubmenu) => (
                          <button
                            key={subsubmenu.title}
                            onClick={() => subsubmenu.path && handleNavigation(subsubmenu.path)}
                            className="w-full flex items-center space-x-2 px-4 py-2 text-gray-200 hover:text-white hover:bg-[#7A1E2E] rounded-lg transition-colors duration-200"
                          >
                            {subsubmenu.icon}
                            <span>{subsubmenu.title}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}

        {/* Botón de cerrar sesión */}
        <div className="absolute bottom-4 left-4 right-4">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center justify-center bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-2 rounded-lg transition-colors duration-200"
          >
            <LogOut className="w-5 h-5 mr-2" />
            Cerrar Sesión
          </button>
        </div>
      </div>

      {/* Modals */}
      <Profile isOpen={showProfileModal} onClose={() => setShowProfileModal(false)} />
      <SettingsModal isOpen={showSettingsModal} onClose={() => setShowSettingsModal(false)} />
    </>
  );
};

export default Sidebar;