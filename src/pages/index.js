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
  
} from "firebase/firestore"; // Asegúrate de importar estas funciones


import LoadingIndicator from "@/components/view/loading-indicator";
import TutoriaCardView from "@/components/view/card-tutoria-view";
import useAuth from "@/controllers/hooks/auth";



export async function getServerSideProps(context) {
  const now = new Date();

  const tutoriasRef = collection(db, "tutorias").withConverter(Tutoria.converter);

  const q = query(
    tutoriasRef, 
    where("reservada", "==", false),
    where("fechaCreacion", "<=", now)
  );

  const querySnapshot = await getDocs(q);
  const tutorias = querySnapshot.docs.map((doc) => doc.data());

  // Obtener los IDs de profesores únicos de las tutorías
  const profesoresIds = [...new Set(tutorias.map(tutoria => tutoria.id_profesor))];

// Buscar los profesores por los IDs obtenidos
const profesoresRefs = collection(db, "profesores");

const profesoresPromises = profesoresIds.map(id_profesor => 
  getDoc(doc(profesoresRefs, id_profesor))
);

// Esperar a que todas las promesas de obtener los profesores se resuelvan
const profesoresSnapshots = await Promise.all(profesoresPromises);

const profesores = profesoresSnapshots.map(snapshot => ({
  id: snapshot.id,
  ...snapshot.data()
}));

// Combina las tutorías con los profesores correspondientes
const profesoresTutorias = tutorias.map(tutoria => {
  const profesor = profesores.find(prof => prof.id === tutoria.id_profesor);
  return { tutoria, profesor }; // aquí estamos creando un objeto con dos propiedades: tutoria y profesor
});

return {
  props: {
    profesoresTutorias: JSON.parse(JSON.stringify(profesoresTutorias)),
  },
};

}

const Tutorias = ({ profesoresTutorias }) => {
  const router = useRouter();
  const [busqueda, setBusqueda] = useState("");

  const { loading, tipo } = useAuth(); // Asegúrate de que 'tipo' no es necesario si no lo usas

  // Filtra las profesoresTutorias basadas en la búsqueda
  const tutoriasFiltradas = profesoresTutorias.filter((profesorTutoria) =>
    profesorTutoria.tutoria.titulo.toLowerCase().includes(busqueda.toLowerCase())
  );

  const handleSearch = (event) => {
    setBusqueda(event.target.value);
  };

  // Función para manejar la compra de tutorías
  const handleComprarTutoria = async (id) => {

    
    
  };

  const renderView = () => {
    if (loading) {
      return <LoadingIndicator />;
    }

    return (
      <div className="container mx-auto p-4">
        <div className="text-center mt-4 mb-8">
          <input
            type="text"
            placeholder="Buscar tutorías..."
            className="text-black mb-4 p-2 border rounded shadow w-1/2 bg-purple-100 border-purple-500 placeholder-purple-400 focus:ring-2 focus:ring-purple-500 focus:outline-none"
            value={busqueda}
            onChange={handleSearch}
          />
        </div>
        <div className="grid grid-cols-3 gap-4 mt-4">
          {tutoriasFiltradas.map((profesorTutoria) => (
            <TutoriaCardView
              key={profesorTutoria.tutoria.id}
              profesorTutoria={profesorTutoria}
              onComprar={() => handleComprarTutoria(profesorTutoria.tutoria.id)}
              type={tipo}
            
            />
          ))}
        </div>
      </div>
    );
  };

  return (
    <>
      <Navbar />
      <div>{renderView()}</div>
    </>
  );
};


export default Tutorias;
