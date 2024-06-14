import { useState, useEffect } from 'react';
import { db } from "@/config/firebase-config-cliente";
import { collection, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import Link from 'next/link';


const AdminPanel = ({ initialAlumnos, initialProfesores, initialTutorias }) => {

  const [alumnos, setAlumnos] = useState(initialAlumnos);
  const [profesores, setProfesores] = useState(initialProfesores);
  const [tutorias, setTutorias] = useState(initialTutorias);

  const acceptedProfesores = profesores.filter(profesor => profesor.aceptado === true);
  const pendingProfesores = profesores.filter(profesor => profesor.aceptado === false);

  const handleDeleteAlumno = async (id) => {
    await deleteDoc(doc(db, "alumnos", id));
    setAlumnos(alumnos.filter(alumno => alumno.id !== id));
  };

  const handleDeleteProfesor = async (id) => {
    await deleteDoc(doc(db, "profesores", id));
    setProfesores(profesores.filter(profesor => profesor.id !== id));
  };

  const handleAcceptProfesor = async (id) => {
    const profesorRef = doc(db, "profesores", id);
    await updateDoc(profesorRef, { aceptado: true });
    setProfesores(profesores.map(profesor => profesor.id === id ? { ...profesor, aceptado: true } : profesor));
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-black">Panel de Administración</h1>
      
          <div className="flex items-center">
        
            <Link href="/logout" passHref>
              <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700">
                Cerrar Sesión
              </button>
            </Link>
          </div>
 
      </div>

      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-white p-4 rounded-lg shadow-md text-center">
          <h2 className="text-xl font-bold text-black">Total de Profesores</h2>
          <p className="text-2xl text-black">{acceptedProfesores.length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md text-center">
          <h2 className="text-xl font-bold text-black">Total de Alumnos</h2>
          <p className="text-2xl text-black">{alumnos.length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md text-center">
          <h2 className="text-xl font-bold text-black">Total de Tutorías</h2>
          <p className="text-2xl text-black">{tutorias.length}</p>
        </div>
      </div>
      <Link href="/new">
        <button className="bg-blue-500 text-white px-4 py-2 rounded mb-4 hover:bg-blue-700">
          Agregar Nuevo Alumno
        </button>
      </Link>
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-4 text-black">Alumnos</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre Completo</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Correo Electrónico</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {alumnos.map(alumno => (
                <tr key={alumno.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black">{alumno.nombreCompleto}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-black">{alumno.correoElectronico}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-black">
                    <Link href={`/edit/${alumno.id}`}>
                      <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 mr-2">Editar</button>
                    </Link>
                    <button
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
                      onClick={() => handleDeleteAlumno(alumno.id)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-4 text-black">Profesores</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre Completo</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Correo Electrónico</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {acceptedProfesores.map(profesor => (
                <tr key={profesor.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black">{profesor.nombreCompleto}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-black">{profesor.correoElectronico}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-black">
                    <button
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
                      onClick={() => handleDeleteProfesor(profesor.id)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-4 text-black">Solicitudes de Profesores</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre Completo</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Correo Electrónico</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {pendingProfesores.map(profesor => (
                <tr key={profesor.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black">{profesor.nombreCompleto}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-black">{profesor.correoElectronico}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-black">
                    <button
                      className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700 mr-2"
                      onClick={() => handleAcceptProfesor(profesor.id)}
                    >
                      Aceptar
                    </button>
                    <button
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
                      onClick={() => handleDeleteProfesor(profesor.id)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
