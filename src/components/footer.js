import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white text-center py-4">
      <div className="container mx-auto">
        <div className="flex justify-center space-x-4">
          <Link
            href="/avisos-de-privacidad.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
          >
            Avisos de Privacidad
          </Link>

          <Link
            href="/terminos-y-condiciones.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
          >
            Términos y Condiciones
          </Link>
        </div>
        <p className="mt-4">© {new Date().getFullYear()} DevTutoring. Todos los derechos reservados 2024.</p>
      </div>
    </footer>
  );
};

export default Footer;
