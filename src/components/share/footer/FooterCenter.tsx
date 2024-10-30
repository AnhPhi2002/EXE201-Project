import React from 'react';

const FooterCenter: React.FC = () => {
  return (
    <div className="flex space-x-20">
      <div>
        <h3 className="font-semibold mb-2">Empresa</h3>
        <ul>
          <li><a href="#" className="hover:text-purple-400">Sobre Nosotros</a></li>
          <li><a href="#" className="hover:text-purple-400">Soluciones</a></li>
          <li><a href="#" className="hover:text-purple-400">Insights</a></li>
        </ul>
      </div>
      <div>
        <h3 className="font-semibold mb-2">Categorías</h3>
        <ul>
          <li><a href="#" className="hover:text-purple-400">Contratar Talento</a></li>
          <li><a href="#" className="hover:text-purple-400">Desarrollar Talento</a></li>
          <li><a href="#" className="hover:text-purple-400">Herramientas de Gamificación</a></li>
          <li><a href="#" className="hover:text-purple-400">Competencias Digitales</a></li>
          <li><a href="#" className="hover:text-purple-400">Competencias Comerciales</a></li>
          <li><a href="#" className="hover:text-purple-400">Liderazgo</a></li>
        </ul>
      </div>
    </div>
  );
};

export default FooterCenter;
