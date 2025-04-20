import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import './styles/themes.css';
import LandingPage from './components/LandingPage';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import CreateUser from './pages/CreateUser';
import UsersList from './pages/UsersList';
import UserManagement from './pages/UserManagement';
import RolesAndPermissions from './pages/RolesAndPermissions';
import CentersManagement from './pages/CentersManagement';
import SedesManagement from './pages/SedesManagement';
import AreasManagement from './pages/AreasManagement';
import MunicipiosManagement from './pages/MunicipiosManagement';
import ProductosManagement from './pages/ProductosManagement';
import EntradasManagement from './pages/EntradasManagement';
import SalidasManagement from './pages/SalidasManagement';
import Reports from './pages/Reports';
import Statistics from './pages/Statistics';
import Features from './pages/Features';
import Navbar from './components/navbar';
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