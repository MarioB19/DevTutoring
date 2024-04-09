import React, { useState } from "react";
import { useRouter } from "next/router";
import Navbar from "@/components/navbar";
import { Tutoria } from "@/models/tutoria";
import { db } from "@/config/firebase-config-cliente";
import { collection, query, where, getDocs } from "firebase/firestore"; // Asegúrate de importar estas funciones

export async function getServerSideProps(context) {
  const { uid } = context.params;

  const tutoriasRef = collection(db, "tutorias").withConverter(
    Tutoria.converter
  );
  const q = query(tutoriasRef, where("id_profesor", "==", uid));
  const querySnapshot = await getDocs(q);
  const tutorias = querySnapshot.docs.map((doc) => doc.data());

  return {
    props: {
      tutorias: JSON.parse(JSON.stringify(tutorias)), // Serializar tutorías para evitar errores de serialización
    },
  };
}

const GestorTutorias = ({ tutorias }) => {
  // Recibe las tutorías como props
  const router = useRouter();
  const [busqueda, setBusqueda] = useState("");

  const handleSearch = (event) => {
    setBusqueda(event.target.value);
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4">
        <div className="flex justify-end items-center mb-6">
          <button
            className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => router.push("/profesor/crear-tutoria")}
          >
            Crear Tutoría
          </button>
        </div>
        <div className="text-center mt-4">
          <input
            type="text"
            placeholder="Buscar tutorías..."
            className="py-2 px-4 rounded border border-purple-300 text-black"
            value={busqueda}
            onChange={handleSearch}
          />
        </div>

        <div className="grid grid-cols-3 gap-4 mt-4">
          {tutorias
            .filter((tutoria) =>
              tutoria.titulo.toLowerCase().includes(busqueda.toLowerCase())
            )
            .map((tutoria) => (
              <div
                key={tutoria.id}
                className="max-w-sm rounded overflow-hidden shadow-lg bg-white"
              >
                <img
                  className="w-full"
                  src={tutoria.fotografia}
                  alt="Imagen de la tutoría"
                />
                <div className="px-6 py-4">
                  <div className="font-bold text-xl mb-2 text-purple-700">
                    {tutoria.titulo}
                  </div>
                  <p className="text-gray-700 text-base">
                    {tutoria.descripcion}
                  </p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default GestorTutorias;
