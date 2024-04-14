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
  getDoc,
} from "firebase/firestore";
import { isFuture, isPast, parseISO } from "date-fns"; 
import TutoriaCardProfesor from "@/components/view/card-tutoria-profesor";



export async function getServerSideProps(context) {
  const { uid } = context.params;

  const tutoriasRef = collection(db, "tutorias").withConverter(Tutoria.converter);
  const qTutorias = query(tutoriasRef, where("id_profesor", "==", uid));
  const querySnapshotTutorias = await getDocs(qTutorias);
  const tutorias = querySnapshotTutorias.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));

  const tutoriasReservadas = tutorias.filter(tutoria => tutoria.reservada);
  const alumnoIds = [...new Set(tutoriasReservadas.map(tutoria => tutoria.id_alumno))];

  const alumnosRef = collection(db, "alumnos");
  const alumnosPromises = alumnoIds.map(id => getDoc(doc(alumnosRef, id)));
  const alumnosSnapshots = await Promise.all(alumnosPromises);
  const alumnos = alumnosSnapshots.reduce((acc, snapshot) => {
    if (snapshot.exists()) {
      acc[snapshot.id] = snapshot.data();
    }
    return acc;
  }, {});

  const tutoriasConAlumnos = tutorias.map(tutoria => {
    const alumnoData = tutoria.reservada ? alumnos[tutoria.id_alumno] : null;
    return {
      tutoria: { ...tutoria, id_alumno: undefined },
      alumno: alumnoData
    };
  });

  return {
    props: {
      tutoriasConAlumnos: JSON.parse(JSON.stringify(tutoriasConAlumnos)),
    },
  };
}



const GestorTutorias = ({ tutoriasConAlumnos }) => {
  const router = useRouter();
  const [busqueda, setBusqueda] = useState("");
  const [vistaActiva, setVistaActiva] = useState("futuras");


  const tutoriasFiltradas = tutoriasConAlumnos.filter(({ tutoria }) =>
    tutoria.titulo.toLowerCase().includes(busqueda.toLowerCase())
  );

  const tutoriasFuturas = tutoriasFiltradas.filter(({ tutoria }) => {
    const dateTime = `${tutoria.fechaInicio}T${tutoria.horaInicio}`;
    return isFuture(parseISO(dateTime));
  });

  const tutoriasPasadas = tutoriasFiltradas.filter(({ tutoria }) => {
    const dateTime = `${tutoria.fechaInicio}T${tutoria.horaInicio}`;
    return isPast(parseISO(dateTime));
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
            ({ tutoria, alumno }) => (
              <TutoriaCardProfesor
                key={tutoria.id}
                tutoria={tutoria}
                alumno={alumno} 
                onEliminar={() => handleEliminarTutoria(tutoria.id)}
              />
            )
          )}
        </div>
      </div>
    </>
  );
};

export default GestorTutorias;