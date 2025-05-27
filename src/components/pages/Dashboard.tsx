import React from "react";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-6xl mx-auto w-full">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Contenedor de la imagen con gradiente */}
          <div className="relative">
            <img
              src="/src/img/Dash.jpg"
              alt="Dashboard"
              className="w-full object-cover h-[70vh]"
            />
            {/* Overlay con gradiente */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#5D0F1D]/30 to-transparent"></div>
            
            {/* Texto superpuesto */}
            <div className="absolute bottom-0 left-0 p-8 text-white">
              <p className="text-xl opacity-90">
                Bienvenido al sistema de gestión SMARTBODEGA
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 