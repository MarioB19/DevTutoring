// pages/purchase-confirmation.js
import React from "react";
import { useRouter } from "next/router";
import PurchaseConfirmation from "@/components/view/purchase-confirmation";
import { db } from "@/config/firebase-config-cliente";
import {
  doc,
  updateDoc
} from "firebase/firestore"; 
import useAuth from "@/controllers/hooks/auth";
import LoadingIndicator from "@/components/view/loading-indicator";
import ProtectedRoute from "@/controllers/controller-protected-route";

const PurchaseConfirmationPage = () => {
  const router = useRouter();
  const {
    query: { costo, id, titulo, descripcion, areaProgramacion, fotografia, fechaInicio, horaInicio, profesor }
  } = router;


  const { user, loading } = useAuth(); 


  const handleCompraExitosa = async(id) =>  {
    const tutoriaRef = doc(db, "tutorias", id);

    try {
      await updateDoc(tutoriaRef, {
        reservada: true,    
        id_alumno: user.uid,   
        fechaCompra: new Date() 
      });
  
    
      alert("Compra realizada con éxito!");
      router.push("/");
    } catch (error) {

      console.error("Error al comprar la tutoría: ", error);
      alert("Error al realizar la compra.");
    }

  };

  if (loading) {
    return <LoadingIndicator />;
  }


  return (
    <>

    <ProtectedRoute requiredType={"alumno"}>
  
    <PurchaseConfirmation
      costo={costo}
      id={id}
      titulo={titulo}
      descripcion={descripcion}
      areaProgramacion={areaProgramacion}
      fotografia={fotografia}
      fechaInicio={fechaInicio}
      horaInicio={horaInicio}
      profesor={profesor ? JSON.parse(profesor) : {}}
      onComprar={() => handleCompraExitosa(id)}
    />
       </ProtectedRoute>
    </>

  );
};

export default PurchaseConfirmationPage;
