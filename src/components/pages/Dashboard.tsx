import React from "react";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      {/* Header */}
      <header className="flex items-center gap-4 mb-8">
        <img src="/src/img/logo SENA.png" alt="Logo SENA" className="h-14 w-14 rounded-full shadow-lg bg-white p-1" />
        <div>
          <h1 className="text-3xl font-bold text-[#5D0F1D] tracking-tight">SMARTBODEGA</h1>
          <p className="text-gray-600 text-sm">Sistema de gestión de inventarios</p>
        </div>
      </header>

      {/* Sección de Áreas del Proyecto */}
      <section className="bg-white rounded-2xl shadow-xl p-8 mb-8 flex flex-col md:flex-row gap-8 items-center">
        <div className="flex-1 flex flex-col gap-4 items-center">
          <img src="/src/img/Tecnologia e innovación.webp" alt="Área de Innovación" className="rounded-xl shadow-md object-cover h-40 w-full" />
          <img src="/src/img/imagen sena.jpg" alt="Área de Formación" className="rounded-xl shadow-md object-cover h-40 w-full" />
        </div>
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-[#5D0F1D] mb-2">¿Cómo funciona SMARTBODEGA?</h2>
          <p className="text-gray-700 text-lg mb-4">
            SMARTBODEGA integra tecnología y gestión para que puedas controlar, visualizar y optimizar tu inventario de manera sencilla y eficiente. Cada área del sistema está pensada para facilitar el trabajo de los usuarios, desde el registro de productos hasta la generación de reportes y el análisis de datos.
          </p>
          <ul className="list-disc pl-6 text-gray-600 space-y-1 mb-4">
            <li>Gestión centralizada de productos y materiales.</li>
            <li>Control de entradas y salidas en tiempo real.</li>
            <li>Alertas y notificaciones para bajo stock.</li>
            <li>Acceso seguro y personalizado para cada usuario.</li>
          </ul>
        </div>
      </section>

      {/* Sección Visión y Misión */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center text-center">
          <img src="/src/img/logo SENA.png" alt="Visión" className="h-20 w-20 mb-4 rounded-full bg-white shadow" />
          <h3 className="text-xl font-bold text-[#5D0F1D] mb-2">Visión</h3>
          <p className="text-gray-700 text-lg">
            Ser la plataforma líder en gestión de inventarios, reconocida por su innovación, facilidad de uso y aporte al crecimiento de las organizaciones y centros educativos.
          </p>
        </div>
        <div className="bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center text-center">
          <img src="/src/img/Dash.jpg" alt="Misión" className="h-20 w-20 mb-4 rounded-xl object-cover shadow" />
          <h3 className="text-xl font-bold text-[#5D0F1D] mb-2">Misión</h3>
          <p className="text-gray-700 text-lg">
            Brindar una solución integral y moderna para la gestión de inventarios, facilitando el control, la transparencia y la toma de decisiones inteligentes en cualquier organización.
          </p>
        </div>
      </section>

      {/* Sección Inspiracional */}
      <section className="bg-gradient-to-r from-[#5D0F1D]/90 to-[#8B2438]/80 rounded-2xl shadow-xl p-8 flex flex-col items-center text-center text-white">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">¡Transforma tu gestión con SMARTBODEGA!</h2>
        <p className="text-lg max-w-2xl mb-4">
          La tecnología y la innovación están a tu alcance para que tu inventario nunca sea un problema, sino una oportunidad de crecimiento y eficiencia.
        </p>
        <img src="/src/img/Tecnologia e innovación.webp" alt="Inspiración" className="rounded-xl shadow-md object-cover h-32 w-64 mb-2" />
      </section>
    </div>
  );
};

export default Dashboard; 