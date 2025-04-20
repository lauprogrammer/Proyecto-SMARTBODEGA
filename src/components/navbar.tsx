import React from 'react';
import { Menu } from 'lucide-react';

interface NavbarProps {
  toggleSidebar: () => void;
  isSidebarOpen: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ toggleSidebar, isSidebarOpen }) => {
  return (
    <nav 
      className={`bg-[#5D0F1D] text-white p-4 shadow-md fixed top-0 right-0 left-0 z-10 transition-all duration-300 ease-in-out ${
        isSidebarOpen ? 'ml-64' : 'ml-0'
      }`}
    >
      <div className="flex items-center">
        <button
          onClick={toggleSidebar}
          className="p-2 hover:bg-[#7A1E2E] rounded-lg transition-colors duration-200"
        >
          <Menu className="w-6 h-6" />
        </button>
        <div className="flex-1 flex flex-col items-center">
          <h1 className="text-xl font-semibold">SMARTBODEGA</h1>
          <p className="text-sm text-gray-300">Todo lo que necesitas, al instante.</p>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;