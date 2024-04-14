
import React from 'react';
import FormularioTutorias from '@/components/form-tutorias';
import useAuth from './hooks/auth';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage"; 
import { useRouter } from 'next/navigation';
const ControllerCreateTutorias = () => {
    const { user } = useAuth(); 
    const router = useRouter();

    const handleSubmit = async (data) => {
        try {

            let imageUrl = ''; 
            if (data.foto && data.foto.length > 0) {
                const storage = getStorage();
                const storageRef = ref(storage, `imageTutorias/${user.uid}/${data.foto[0].name}`);

             
                const snapshot = await uploadBytes(storageRef, data.foto[0]);
                
              
                imageUrl = await getDownloadURL(snapshot.ref);
            }

            const requestData = {
                ...data,
                id_profesor: user.uid,
                foto: imageUrl,
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
