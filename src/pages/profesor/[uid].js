import React, { useState } from "react";
import { useRouter } from "next/router";
import Navbar from "@/components/navbar";
import { Tutoria } from "@/models/tutoria";
import { db } from "@/config/firebase-config-cliente";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  deleteDoc,
} from "firebase/firestore"; // Asegúrate de importar estas funciones
import { isFuture, isPast, parseISO } from "date-fns"; // Importa las funciones isFuture y isPast de date-fns
import TutoriaCardProfesor from "@/components/view/card-tutoria-profesor";

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
  const router = useRouter();
  const [busqueda, setBusqueda] = useState("");
  const [vistaActiva, setVistaActiva] = useState("futuras"); // Estado para manejar qué grupo de tutorías se muestra

  // Filtra las tutorías basadas en la búsqueda y determina cuáles son futuras o pasadas
  const tutoriasFiltradas = tutorias.filter((tutoria) =>
    tutoria.titulo.toLowerCase().includes(busqueda.toLowerCase())
  );
  const tutoriasFuturas = tutoriasFiltradas.filter((tutoria) => {
    // Combina fecha y hora en una sola cadena ISO
    const dateTime = `${tutoria.fechaInicio}T${tutoria.horaInicio}`;
    // Convierte la cadena ISO en un objeto Date
    const date = parseISO(dateTime);
    return isFuture(date);
  });

  const tutoriasPasadas = tutoriasFiltradas.filter((tutoria) => {
    const dateTime = `${tutoria.fechaInicio}T${tutoria.horaInicio}`;
    const date = parseISO(dateTime);
    return isPast(date);
  });

  const handleSearch = (event) => {
    setBusqueda(event.target.value);
  };

  const handleEliminarTutoria = async (id) => {
    const tutoriaRef = doc(db, "tutorias", id);
    try {
      await deleteDoc(tutoriaRef);
      router.reload();
      console.log("Tutoría eliminada con éxito");
      // Aquí podrías actualizar el estado o realizar otra acción después de eliminar la tutoría
    } catch (error) {
      console.error("Error al eliminar la tutoría: ", error);
    }
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
        <div className="text-center mt-4 mb-8">
          {" "}
          <input
            type="text"
            placeholder="Buscar tutorías..."
            className="text-black mb-4 p-2 border rounded shadow w-1/2 bg-purple-100 border-purple-500 placeholder-purple-400 focus:ring-2 focus:ring-purple-500 focus:outline-none"
            value={busqueda}
            onChange={handleSearch}
          />
        </div>

        <div className="flex justify-center space-x-4 mb-6">
          <button
            className={`px-4 py-2 rounded ${
              vistaActiva === "futuras"
                ? "bg-purple-700 text-white"
                : "bg-white text-purple-700"
            }`}
            onClick={() => setVistaActiva("futuras")}
          >
            Tutorías Futuras
          </button>
          <button
            className={`px-4 py-2 rounded ${
              vistaActiva === "pasadas"
                ? "bg-purple-700 text-white"
                : "bg-white text-purple-700"
            }`}
            onClick={() => setVistaActiva("pasadas")}
          >
            Tutorías Pasadas
          </button>
        </div>

        <div className="grid grid-cols-3 gap-4 mt-4">
          {(vistaActiva === "futuras" ? tutoriasFuturas : tutoriasPasadas).map(
            (tutoria) => (
              <TutoriaCardProfesor
                key={tutoria.id}
                tutoria={tutoria}
                onEliminar={() => handleEliminarTutoria(tutoria.id)} // Suponiendo que tienes esta función
              />
            )
          )}
        </div>
      </div>
    </>
  );
};

export default GestorTutorias;
