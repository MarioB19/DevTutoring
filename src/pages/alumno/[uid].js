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
getDoc
} from "firebase/firestore";
import { isFuture, isPast, parseISO } from "date-fns";
import TutoriaCardView from "@/components/view/card-tutoria-view";

export async function getServerSideProps(context) {
  const { uid } = context.params;

  const now = new Date();

  const tutoriasRef = collection(db, "tutorias").withConverter(Tutoria.converter);

  const q = query(
    tutoriasRef, 
    where("id_alumno", "==", uid),
    
  );

  const querySnapshot = await getDocs(q);
  const tutorias = querySnapshot.docs.map((doc) => doc.data());


  const profesoresIds = [...new Set(tutorias.map(tutoria => tutoria.id_profesor))];

const profesoresRefs = collection(db, "profesores");

const profesoresPromises = profesoresIds.map(id_profesor => 
  getDoc(doc(profesoresRefs, id_profesor))
);


const profesoresSnapshots = await Promise.all(profesoresPromises);

const profesores = profesoresSnapshots.map(snapshot => ({
  id: snapshot.id,
  ...snapshot.data()
}));


const profesoresTutorias = tutorias.map(tutoria => {
  const profesor = profesores.find(prof => prof.id === tutoria.id_profesor);
  return { tutoria, profesor }; 
});

return {
  props: {
    profesoresTutorias: JSON.parse(JSON.stringify(profesoresTutorias)),
  },
};

}




const GestorTutorias = ({ profesoresTutorias }) => {
  const router = useRouter();
  const [busqueda, setBusqueda] = useState("");
  const [vistaActiva, setVistaActiva] = useState("futuras"); 

  const tutoriasFiltradas = profesoresTutorias.filter(({ tutoria }) =>
    tutoria.titulo.toLowerCase().includes(busqueda.toLowerCase())
  );

  const tutoriasFuturas = tutoriasFiltradas.filter(({ tutoria }) => {
    const dateTime = `${tutoria.fechaInicio}T${tutoria.horaInicio}`;
    const date = parseISO(dateTime);
    return isFuture(date);
  });

  const tutoriasPasadas = tutoriasFiltradas.filter(({ tutoria }) => {
    const dateTime = `${tutoria.fechaInicio}T${tutoria.horaInicio}`;
    const date = parseISO(dateTime);
    return isPast(date);
  });

  const handleSearch = (event) => {
    setBusqueda(event.target.value);
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4">
        <div className="flex justify-end items-center mb-6">
          {/* Espacio para otros controles o información si es necesario */}
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
            (profesorTutoria) => (
              <TutoriaCardView
              key={profesorTutoria.tutoria.id}
              profesorTutoria={profesorTutoria}
     
              type={"mine"}
              />

            )
          )}
        </div>
      </div>
    </>
  );
};

export default GestorTutorias;
