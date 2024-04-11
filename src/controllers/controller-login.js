import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import useAuth from './hooks/auth';
import InicioFormulario from '@/components/form-login'; // Ajusta la ruta al componente del formulario
import { auth, signInWithEmailAndPassword } from '@/config/firebase-config-cliente';

const ControllerLogin = () => {
  const { user, tipo, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (user) {
        if (tipo === "profesor") {
          router.push('/');
        } else if (tipo === "alumno") {
          router.push('/');
        }
      }
    }
  }, [user, tipo, loading, router]);

  const handleSubmit = async (data) => {

    const  {correoElectronico , password} = data;
 

    try {
     const result = await signInWithEmailAndPassword(auth,correoElectronico, password);
     console.log('Usuario autenticado', result);
     alert('Usuario autenticado', result);
     // Redirigir al usuario o manejar el inicio de sesión exitoso
   } catch (error) {
     console.error('Error en la autenticación', error);
     alert('Error en la autenticación', error);
   }
 
   };
 

  if (loading) return <div>Cargando...</div>;

  return <InicioFormulario onSubmit={handleSubmit} />;
};

export default ControllerLogin;
