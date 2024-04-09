// Controlador.js
import React from 'react';
import FormularioTutorias from '@/components/form-tutorias';
import useAuth from './hooks/auth';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage"; // Importar funciones de Firebase Storage
import { useRouter } from 'next/navigation';
const ControllerCreateTutorias = () => {
    const { user } = useAuth(); 
    const router = useRouter();

    const handleSubmit = async (data) => {
        try {
            // Primero, manejar la carga de la imagen si existe
            let imageUrl = ''; // Inicializar la URL de la imagen como vacía
            if (data.foto && data.foto.length > 0) {
                const storage = getStorage();
                const storageRef = ref(storage, `imageTutorias/${user.uid}/${data.foto[0].name}`);

                // Cargar la imagen
                const snapshot = await uploadBytes(storageRef, data.foto[0]);
                
                // Obtener la URL de la imagen cargada
                imageUrl = await getDownloadURL(snapshot.ref);
            }

            const requestData = {
                ...data,
                id_profesor: user.uid,
                foto: imageUrl, // Agregar la URL de la imagen al requestData
            };

          

            const response = await fetch("/api/_create_tutoria", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestData),
            });

            if (response.ok) {
                alert("Tutoría creada correctamente");
                router.back()
            } else {
                alert("Error al crear la tutoría");
            }
        } catch (error) {
            console.error("Error de red:", error);
        }
    };

    return <FormularioTutorias onSubmit={handleSubmit} />;
};

export default ControllerCreateTutorias;
