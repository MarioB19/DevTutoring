import React from "react";
import Image from "next/image";
import { UserIcon, MailIcon, AnnotationIcon } from "@heroicons/react/solid";

const ProfesorCard = ({
  fotoPerfil,
  nombreCompleto,
  correoElectronico,
  descripcionPerfil,
}) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
      <div className="relative h-48 w-48 mx-auto">
        <Image
          src={fotoPerfil}
          alt="Foto de perfil"
          layout="fill"
          className="rounded-full"
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
        <div className="flex items-start mb-3">
          <AnnotationIcon className="h-5 w-5 text-purple-500 mt-1 mr-2" />
          <div className="overflow-y-auto overflow-x-hidden max-h-24 w-full text-gray-700 text-base p-1 whitespace-pre-wrap break-words">
            {descripcionPerfil}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfesorCard;
