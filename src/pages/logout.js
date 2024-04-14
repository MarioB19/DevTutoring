import { useEffect } from "react";
import { useRouter } from "next/router";
import { auth } from "@/config/firebase-config-cliente"; 

const Logout = () => {
  const router = useRouter();

  useEffect(() => {
  
    const logout = async () => {
      try {
        await auth.signOut(); // Cierra la sesión del usuario
        router.push("/");
      } catch (error) {
        console.error("Error al cerrar sesión:", error);
      }
    };

    logout(); 
  }, []);

  return <div>Cerrando sesión...</div>; 
};

export default Logout;
