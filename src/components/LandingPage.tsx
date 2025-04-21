import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#5D0F1D] to-[#8B1728]">
      {/* Navbar */}
      <nav className="bg-[#5D0F1D] px-6 py-4 flex justify-between items-center shadow-lg">
        <div className="flex flex-col">
          <h1 className="text-white text-2xl font-bold">SMARTBODEGA</h1>
          <p className="text-sm text-gray-300">Todo lo que necesitas, al instante.</p>
        </div>
        <button
          onClick={() => navigate('/login')}
          className="bg-white text-[#5D0F1D] px-6 py-2 rounded-full font-semibold hover:bg-gray-100 transition duration-200"
        >
          Inicio de Sesión
        </button>
      </nav>

      {/* Contenido Principal */}
      <div className="container mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-8">
            BIENVENIDO A SMARTBODEGA
          </h1>
        </div>

        {/* Imagen y Texto */}
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <img
              src="/img/Tecnologia e innovación.webp"
              alt="Tecnología e Innovación"
              className="rounded-lg shadow-xl w-full max-w-sm mx-auto transform transition-all duration-700 hover:scale-105 animate-[fadeIn_1s_ease-in] motion-safe:animate-[fadeInUp_1s_ease-out]" //Manejo de animaciones de la imagen
            />
          </div>
          <div className="space-y-6 text-white">
            <div>
              <h3 className="text-2xl font-semibold mb-4">
                Tu aliado estratégico en soluciones tecnológicas y de innovación
              </h3>
              <p className="text-gray-200">
                Nos especializamos en brindarte todo lo que necesitas, al instante, para optimizar la
                gestión y el almacenamiento de tus productos.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-4">Nuestra Misión</h3>
              <p className="text-gray-200">
                Nuestra misión es transformar la manera en que accedes a insumos, con procesos
                eficientes y tecnología de vanguardia. Nos impulsa la innovación, y trabajamos para
                ofrecerte herramientas que simplifiquen tu operación y maximicen tu productividad.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage; 