import React, { useState } from 'react';
import Navbar from "@/components/navbar";
import ProfesorCard from '@/components/view/card-profesor';
import { db } from '@/config/firebase-config-cliente';
import { collection, getDocs } from "firebase/firestore"; 
import { Profesor } from "@/models/profesor";

export const getServerSideProps = async () => {
  const profesoresRef = collection(db, "profesores").withConverter(Profesor.converter);
  const querySnapshot = await getDocs(profesoresRef);
  const profesores = querySnapshot.docs.map(doc => doc.data());

  return {
    props: {
      profesores: JSON.parse(JSON.stringify(profesores)),
    },
  };
};

const Maestros = ({ profesores }) => {
  const [filtro, setFiltro] = useState('');

  const profesoresFiltrados = profesores.filter(profesor =>
    profesor.nombreCompleto.toLowerCase().includes(filtro.toLowerCase())
  );

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4">
        {/* Añadir un buscador */}
        <div className="mb-6 flex justify-center">
  <input
    type="text"
    placeholder="Buscar profesor..."
    className="text-black mb-4 p-2 border rounded shadow w-1/2 bg-purple-100 border-purple-500 placeholder-purple-400 focus:ring-2 focus:ring-purple-500 focus:outline-none"
    onChange={(e) => setFiltro(e.target.value)}
  />
</div>


        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {profesoresFiltrados.map((profesor) => (
            <ProfesorCard
              key={profesor.id}
              nombreCompleto={profesor.nombreCompleto}
              correoElectronico={profesor.correoElectronico}
              descripcionPerfil={profesor.descripcionPerfil}
              fotoPerfil={profesor.fotoPerfil}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Maestros;
