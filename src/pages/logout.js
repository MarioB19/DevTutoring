import { useEffect } from "react";
import { useRouter } from "next/router";
import { auth } from "@/config/firebase-config-cliente"; // Ajusta la ruta según tu configuración de Firebase

const Logout = () => {
  const router = useRouter();

  useEffect(() => {
    // Función para cerrar la sesión del usuario
    const logout = async () => {
      try {
        await auth.signOut(); // Cierra la sesión del usuario
        router.push("/"); // Redirige al usuario a la página de inicio u otra página después de cerrar sesión
      } catch (error) {
        console.error("Error al cerrar sesión:", error);
      }
    };

    logout(); // Llama a la función para cerrar sesión cuando el componente se monta
  }, []);

  return <div>Cerrando sesión...</div>; // Puedes mostrar un mensaje mientras se cierra la sesión
};

export default Logout;
