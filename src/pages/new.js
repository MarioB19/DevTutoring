import { useState } from 'react';
import { db } from "@/config/firebase-config-cliente";
import { collection, addDoc } from 'firebase/firestore';
import { useRouter } from 'next/router';
import ProtectedRoute from '@/controllers/controller-protected-route';

const NewAlumno = () => {
  const [nombreCompleto, setNombreCompleto] = useState('');
  const [correoElectronico, setCorreoElectronico] = useState('');
  const [fotoPerfil, setFotoPerfil] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addDoc(collection(db, "alumnos"), {
      nombreCompleto,
      correoElectronico,
      fotoPerfil
    });
    router.push('/');
  };

  return (

    <ProtectedRoute requiredType={"admin"}>
    <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-8 mt-10">
      <h1 className="text-3xl font-bold mb-6 text-center text-black">Agregar Nuevo Alumno</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold">Nombre Completo</label>
          <input
            type="text"
            value={nombreCompleto}
            onChange={(e) => setNombreCompleto(e.target.value)}
            className="w-full px-4 py-2 border rounded text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold">Correo Electrónico</label>
          <input
            type="email"
            value={correoElectronico}
            onChange={(e) => setCorreoElectronico(e.target.value)}
            className="w-full px-4 py-2 border rounded text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold">Foto de Perfil</label>
          <input
            type="url"
            value={fotoPerfil}
            onChange={(e) => setFotoPerfil(e.target.value)}
            className="w-full px-4 py-2 border rounded text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-200" type="submit">
          Guardar
        </button>
      </form>
    </div>
    </ProtectedRoute>
  );
};

export default NewAlumno;
