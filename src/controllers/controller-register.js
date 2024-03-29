// Controlador.js
import React from 'react';
import RegistroFormulario from '../components/form-register';
import { useRouter } from 'next/router';

const ControllerRegister = () => {

  const router = useRouter();

  const handleSubmit = async (data) => {
    try {
      const response = await fetch("/api/_register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

    

      if (response.ok) {
        alert("Usuario registrado correctamente");
      router.push('/')

      } else {
        const errorResponse = await response.json();
        alert(`Ocurrió un error al registrar al usuario: ${errorResponse.error}`);
      }
    } catch (error) {
      console.error("Error de red:", error);
    }
  };

  return <RegistroFormulario onSubmit={handleSubmit} />;
};

export default ControllerRegister;

