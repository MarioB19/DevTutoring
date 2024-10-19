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
  getDoc,
  updateDoc
} from "firebase/firestore"; 
import Footer from "@/components/footer";
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

const Tutorias = ({ profesoresTutorias }) => {
  const router = useRouter();
  const [busqueda, setBusqueda] = useState("");
  const { loading, tipo, user } = useAuth(); 

  const tutoriasFiltradas = profesoresTutorias.filter((profesorTutoria) =>
    profesorTutoria.tutoria.titulo.toLowerCase().includes(busqueda.toLowerCase())
  );

  const handleSearch = (event) => {
    setBusqueda(event.target.value);
  };

  const handleComprarTutoria = async (id) => {
    const tutoriaRef = doc(db, "tutorias", id);
  
    try {
      await updateDoc(tutoriaRef, {
        reservada: true,    
        id_alumno: user.uid,   
        fechaCompra: new Date() 
      });
  
      alert("Compra realizada con éxito!");
      router.reload();
    } catch (error) {
      console.error("Error al comprar la tutoría: ", error);
      alert("Error al realizar la compra.");
    }
  };

  const renderView = () => {
    if (loading) {
      return <LoadingIndicator />;
    }

    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <input
            type="text"
            placeholder="Buscar tutorías..."
            className="w-full md:w-2/3 lg:w-1/2 text-black mb-4 p-3 border rounded-lg shadow bg-purple-100 border-purple-500 placeholder-purple-400 focus:ring-2 focus:ring-purple-500 focus:outline-none"
            value={busqueda}
            onChange={handleSearch}
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        {renderView()}
      </main>
      <Footer />
    </div>
  );
};

export default Tutorias;