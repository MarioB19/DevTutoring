import React from "react";
import Image from "next/image";
import { UserIcon, MailIcon, AnnotationIcon } from "@heroicons/react/solid";

const AlumnoCard = ({
  fotoPerfil,
  nombreCompleto,
  correoElectronico,
}) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
      <div className="relative h-48 w-48 mx-auto">
        <Image
          src={fotoPerfil}
          alt="Foto de perfil"
          layout="fill"
          className="rounded-full" // Hace la imagen redonda
        />
      </div>
      <div className="px-6 py-4">
        <div className="flex items-center mb-3">
          <UserIcon className="h-5 w-5 text-purple-500 mr-2" />
          <span className="font-bold text-xl text-gray-800">
            {nombreCompleto}
          </span>
        </div>
        <div className="flex items-center mb-3">
          <MailIcon className="h-5 w-5 text-purple-500 mr-2" />
          <span className="text-gray-700 text-base">{correoElectronico}</span>
        </div>

      </div>
    </div>
  );
};

export default AlumnoCard;
