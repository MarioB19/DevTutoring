import React, { useState } from 'react';

import { getAuth, sendPasswordResetEmail  } from "firebase/auth";
import { db } from '@/config/firebase-config-cliente';
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";

import { useRouter } from 'next/router';


function ForgotPassword() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');

  const auth = getAuth();
  const router = useRouter();



  async function emailExists(email) {
    const collections = ['profesores', 'alumnos'];
    const queries = collections.map(col => query(collection(db, col), where("correoElectronico", "==", email)));
  
    try {
      for (let q of queries) {
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
   
          return true;
        }
      }

      return false;
    } catch (error) {
      console.error("Error al verificar el correo electrónico:", error);
      return false;
    }
  }

  async function resetPassword(email) {
    try {
      await sendPasswordResetEmail(auth, email);
      console.log("Correo de restablecimiento de contraseña enviado.");
 
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error("Error en el envío del correo de restablecimiento: ", errorCode, errorMessage);
  
    }
  }
  
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    const existsCorreo = await emailExists(email);

    if(existsCorreo === false){
      alert("No hay una cuenta asociada a dicho correo");
    }
    else{
      await resetPassword(email)

      alert("Ya se envio un correo electronico para recuperar la contrasena");
      router.push("/login")

 

    }
  };

  return (
    <div className="text-center">
      <button 
        onClick={() => setIsOpen(true)}
        className="text-blue-500 hover:underline"
      >
        Olvidaste tu contraseña
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <form 
            onSubmit={handleSubmit}
            className="bg-white p-8 rounded shadow-md"
          >
            <p className="text-lg mb-4">Restablecer contraseña</p>
            <input
              type="email"
              placeholder="Ingresa tu correo electrónico"
              className="border border-gray-300 p-2 w-full mb-4"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Enviar
            </button>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-4"
            >
              Cancelar
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default ForgotPassword;
