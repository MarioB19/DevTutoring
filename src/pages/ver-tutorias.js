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

import TutoriaCardView from "@/components/view/card-tutoria-view";
export async function getServerSideProps(context) {

    const now = new Date();
  
    const tutoriasRef = collection(db, "tutorias").withConverter(Tutoria.converter);
  
    const q = query(
      tutoriasRef, 
      where("reservada", "==", false),
      where("fechaCreacion", "<=", now) // Obtener tutorías con fechaInicio antes o igual a la fecha actual
    );
  
    const querySnapshot = await getDocs(q);
    const tutorias = querySnapshot.docs.map((doc) => doc.data());
  
    return {
      props: {
        tutorias: JSON.parse(JSON.stringify(tutorias)), // Serializar tutorías para evitar errores de serialización
      },
    };
  }

const Tutorias = ({ tutorias }) => {
  const router = useRouter();
  const [busqueda, setBusqueda] = useState("");

  // Filtra las tutorías basadas en la búsqueda y determina cuáles son futuras o pasadas
  const tutoriasFiltradas = tutorias.filter((tutoria) =>
    tutoria.titulo.toLowerCase().includes(busqueda.toLowerCase())
  );


  const handleSearch = (event) => {
    setBusqueda(event.target.value);
  };

  const handleComprarTutoria = async (id) => {
    const tutoriaRef = doc(db, "tutorias", id);
    try {

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

       
        <div className="grid grid-cols-3 gap-4 mt-4">
          {(tutorias).map(
            (tutoria) => (
              <TutoriaCardView
                key={tutoria.id}
                tutoria={tutoria}
                onComprar={() => handleComprarTutoria(tutoria.id)} // Suponiendo que tienes esta función
              />
            )
          )}
        </div>
      </div>
    </>
  );
};

export default Tutorias;
