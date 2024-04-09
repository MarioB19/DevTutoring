import React from "react";
import Link from "next/link";
import Image from "next/image";
import useAuth from "@/controllers/hooks/auth";

const Navbar = () => {
  const { user, tipo, loading } = useAuth();

  // Función para renderizar los enlaces dependiendo del tipo de usuario
  const renderLinks = () => {
    if (loading) {
      return <div>Cargando...</div>;
    }

    if (user) {
      if (tipo === "profesor") {
        return (
          <>

            <Link
              href="/profesor/mis-tutorias"
              className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >
              Mis tutorias
            </Link>

            <Link
              href="/profesor/perfil"
              className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >
              Mi perfil
            </Link>

            <Link
              href="/logout"
              className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >
              Cerrar Sesion
            </Link>

            <div className="flex justify-end">
              <h1 className="text-blue-400 hover:text-blue px-3 py-2 rounded-md text-sm font-medium">
                Profesor
              </h1>
            </div>
          </>
        );
      } else if (tipo === "alumno") {
        return (
          <>

          <Link
              href="/alumno/mis-tutorias"
              className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >
              Mis tutorias
            </Link>

            <Link
              href="/alumno/perfil"
              className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >
              Mi perfil
            </Link>

            <Link
              href="/logout"
              className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >
              Cerrar Sesion
            </Link>

            <div className="flex justify-end">
              <h1 className="text-blue-400 hover:text-blue px-3 py-2 rounded-md text-sm font-medium">
                Alumno
              </h1>
            </div>
          </>
        );
      }
    }

    // Si no hay usuario logeado, o si no se reconoce el tipo de usuario, muestra solo el enlace de Iniciar Sesión
    return (
      <>
        <Link
          href="/login"
          className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
        >
          Iniciar Sesión
        </Link>
      </>
    );
  };

  return (
    <nav className="bg-gray-800">
      <div className="container mx-auto flex items-center justify-between p-4">
        {/* Agrupación del Logo y Enlaces de Navegación a la izquierda */}
        <div className="flex items-center">
          {/* Logo como enlace a la página de inicio */}
          <Link
            href="/ver-tutorias"
            className="flex items-center cursor-pointer"
          >
            <Image
              src="/logo.png" // Asegúrate de que la ruta a tu imagen sea correcta
              alt="Logo"
              width={100}
              height={100}
              layout="intrinsic" // Esto mantendrá las dimensiones originales de la imagen
            />
          </Link>

          <Link
            href="/ver-tutorias"
            className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
          >
            Ver tutorías
          </Link>

          <Link
            href="/ver-maestros"
            className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
          >
            Ver maestros
          </Link>
          <Link
            href="/seccion-informativa"
            className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
          >
            Sección Informativa
          </Link>
          <Link
            href="/ver-areas-de-conocimiento"
            className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
          >
            Ver áreas de conocimientos
          </Link>

          <div className="flex">{renderLinks()}</div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
