import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import './styles/themes.css';
import LandingPage from './components/pages/LandingPage';
import Login from './components/pages/Login';
import Dashboard from './components/pages/Dashboard';
import CreateUser from './components/pages/CreateUser';
import UsersList from './components/pages/UsersList';
import UserManagement from './components/templates/UserManagement';
import RolesAndPermissions from './components/pages/RolesAndPermissions';
import CentersManagement from './components/templates/CentersManagement';
import SedesManagement from './components/templates/SedesManagement';
import AreasManagement from './components/templates/AreasManagement';
import MunicipiosManagement from './components/templates/MunicipiosManagement';
import ProductosManagement from './components/templates/ProductosManagement';
import EntradasManagement from './components/templates/EntradasManagement';
import SalidasManagement from './components/templates/SalidasManagement';
import Reports from './components/pages/Reports';
import Statistics from './components/pages/Statistics';
import Features from './components/pages/Features';
import Navbar from './components/organisms/navbar';
import Sidebar from './components/sidebar';

const LayoutWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  return (
    <div className={`min-h-screen bg-gray-100 dark:bg-gray-900 ${theme}`}>
      <Navbar toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} toggleTheme={toggleTheme} />
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <main 
        className={`transition-all duration-300 ease-in-out pt-20 px-6 ${
          isSidebarOpen ? 'ml-64' : 'ml-0'
        }`}
      >
        {children}
      </main>
    </div>
  );
};

const App = () => {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  return (
    <>
      <Toaster position="top-right" />
      <div className="app-container" data-theme={theme}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<LayoutWrapper><Dashboard /></LayoutWrapper>} />
          <Route path="/users" element={<LayoutWrapper><UsersList /></LayoutWrapper>} />
          <Route path="/create-user" element={<LayoutWrapper><CreateUser /></LayoutWrapper>} />
          <Route path="/manage-users" element={<LayoutWrapper><UserManagement /></LayoutWrapper>} />
          <Route path="/roles" element={<LayoutWrapper><RolesAndPermissions /></LayoutWrapper>} />
          <Route path="/centers" element={<LayoutWrapper><CentersManagement /></LayoutWrapper>} />
          <Route path="/sedes" element={<LayoutWrapper><SedesManagement /></LayoutWrapper>} />
          <Route path="/areas" element={<LayoutWrapper><AreasManagement /></LayoutWrapper>} />
          <Route path="/municipios" element={<LayoutWrapper><MunicipiosManagement /></LayoutWrapper>} />
          <Route path="/productos" element={<LayoutWrapper><ProductosManagement /></LayoutWrapper>} />
          <Route path="/entradas" element={<LayoutWrapper><EntradasManagement /></LayoutWrapper>} />
          <Route path="/salidas" element={<LayoutWrapper><SalidasManagement /></LayoutWrapper>} />
          <Route path="/reports" element={<LayoutWrapper><Reports /></LayoutWrapper>} />
          <Route path="/statistics" element={<LayoutWrapper><Statistics /></LayoutWrapper>} />
          <Route path="/features" element={<LayoutWrapper><Features /></LayoutWrapper>} />
        </Routes>
      </div>
    </>
  );
};

export default App;