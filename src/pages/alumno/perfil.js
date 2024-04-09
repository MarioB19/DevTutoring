// pages/profesor/perfil.js
import React from 'react';
import { useForm } from 'react-hook-form';
import Image from 'next/image';
import Navbar from '@/components/navbar';

export default function Perfil() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  // Simulando datos del usuario cargados desde un backend o API
  const user = {
    nombre: 'John Doe',
    email: 'john@example.com',
    fotoUrl: '/logo.png', // Reemplaza con la URL de la imagen real
  };

  const onSubmit = async (data) => {
    console.log(data);
    // Aquí enviarías los datos a tu API para actualizar el perfil
  };

  return (
    <>
    <Navbar></Navbar>
    <div className="max-w-lg mx-auto my-10">
      <form onSubmit={handleSubmit(onSubmit)}>

        {/* Foto de perfil */}
        <div className="mb-6 text-center">
          <Image
            src={user.fotoUrl}
            alt="Foto de perfil"
            width={100}
            height={100}
            className="rounded-full"
          />
        </div>

        {/* Nombre */}
        <div className="mb-6">
          <label htmlFor="nombre" className="block mb-2 text-sm font-medium text-black">
            Nombre
          </label>
          <input
            type="text"
            id="nombre"
            defaultValue={user.nombre}
            {...register('nombre', { required: 'Este campo es obligatorio.' })}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          />
          {errors.nombre && <p className="text-red-500 text-xs mt-1">{errors.nombre.message}</p>}
        </div>

        {/* Email */}
        <div className="mb-6">
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-black">
            Email
          </label>
          <input
            type="email"
            id="email"
            defaultValue={user.email}
            {...register('email', { required: 'Este campo es obligatorio.' })}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
        </div>

        {/* Botón de envío */}
        <button
          type="submit"
          className="text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
        >
          Actualizar perfil
        </button>
      </form>
    </div>
    </>
  );
}
