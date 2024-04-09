// Controlador.js
import React from 'react';
import FormularioTutorias from '@/components/form-tutorias';
import useAuth from './hooks/auth';


const ControllerCreateTutorias = () => {
    const { user } = useAuth(); 

  const handleSubmit = async (data) => {
    try {
           
      const requestData = {
        ...data,
        id_profesor: user.uid
      };

      const response = await fetch("/api/_create_tutoria", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

    

      if (response.ok) {
        alert("Tutoria creada correctamente");
      }
      else{
        alert("Error al crear tutorias")
      }

 
    } catch (error) {
      console.error("Error de red:", error);
    }
  };

  return <FormularioTutorias onSubmit={handleSubmit} />;
};

export default ControllerCreateTutorias;

