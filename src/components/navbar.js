import React, { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import useAuth from "@/controllers/hooks/auth";
import Logo from "./logo";

// Componente NavLink con estilos responsivos
const NavLink = ({ href, children }) => (
  <Link
    href={href}
    className="text-purple-200 hover:text-white hover:bg-purple-700 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
  >
    {children}
  </Link>
);

const Navbar = () => {
  const { user, tipo, loading } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const renderLinks = () => {
    if (loading) {
      return <div className="text-purple-200">Cargando...</div>;
    }

    if (user) {
      const links = [
        { href: `/${tipo}/${user.uid}`, label: "Mis tutorías" },
        { href: `/${tipo}/perfil/${user.uid}`, label: "Mi perfil" },
        { href: "/logout", label: "Cerrar Sesión" },
      ];

      return (
        <>
          {links.map((link) => (
            <NavLink key={link.href} href={link.href}>
              {link.label}
            </NavLink>
          ))}
          <div className="flex items-center ml-4">
            <span className="text-purple-300 font-medium capitalize">{tipo}</span>
          </div>
        </>
      );
    }

    return <NavLink href="/login">Iniciar Sesión</NavLink>;
  };

  return (
    <nav className="bg-purple-900 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Logo />
          </div>

          {/* Desktop links */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <NavLink href="/">Ver tutorías</NavLink>
              <NavLink href="/ver-maestros">Ver maestros</NavLink>
              <NavLink href="/seccion-informativa">Sección Informativa</NavLink>
              <NavLink href="/ver-areas-de-conocimiento">Ver áreas de conocimiento</NavLink>
              {renderLinks()}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-purple-200 hover:text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Abrir menú principal</span>
              {isOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-purple-800 bg-opacity-95"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 flex flex-col items-center">
              <NavLink href="/">Ver tutorías</NavLink>
              <NavLink href="/ver-maestros">Ver maestros</NavLink>
              <NavLink href="/seccion-informativa">Sección Informativa</NavLink>
              <NavLink href="/ver-areas-de-conocimiento">Ver áreas de conocimiento</NavLink>
              {renderLinks()}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
