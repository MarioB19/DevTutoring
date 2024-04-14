import React from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";
import Navbar from "@/components/navbar";
import { storage, db } from "@/config/firebase-config-cliente";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL, getStorage } from "firebase/storage";
import { useState } from "react";
import { useRouter } from "next/router";
export default function Perfil({ user }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const router = useRouter();
  const onSubmit = async (data) => {
    const nombreCompleto = data.nombreCompleto;
    const descripcionExperiencias = data.descripcionExperiencias;
    const profesorRef = doc(db, "profesores", user.uid);

    try {
      await updateDoc(profesorRef, {
        nombreCompleto: nombreCompleto,
        descripcionPerfil: descripcionExperiencias,
      });

      await handleUploadImage();

      alert("Informacion actualizada correctamente");

      router.reload();
    } catch (error) {
      alert("Error al actualizar info: " + error);
    }
  };

  const [file, setFile] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState(user.fotoUrl);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFile(file);
      const imageUrl = URL.createObjectURL(file);
      setImagePreviewUrl(imageUrl);
    }
  };

  const handleEditPicture = () => {
    const fileInput = document.getElementById("imageInput");
    fileInput.click();
  };

  const handleUploadImage = async () => {
    if (!file) return;

    let imageUrl = "";

    const storage = getStorage();
    const storageRef = ref(storage, `fotoPerfil/profesor/${user.uid}`);

    const snapshot = await uploadBytes(storageRef, file);

    imageUrl = await getDownloadURL(snapshot.ref);

    const userRef = doc(db, "profesores", user.uid);
    await updateDoc(userRef, {
      fotoPerfil: imageUrl,
    });
  };

  return (
    <>
      <Navbar />
      <div className="max-w-lg mx-auto my-10">
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Foto de perfil */}
          <div className="relative mb-6 text-center">
            {/* Muestra la imagen seleccionada o la imagen por defecto */}
            <div className="relative w-24 h-24 mx-auto overflow-hidden rounded-full">
              <Image
                src={imagePreviewUrl}
                layout="fill"
                className="rounded-full"
              />
            </div>

            <input
              type="file"
              id="imageInput"
              hidden="hidden"
              onChange={handleImageChange}
              className="absolute top-0 right-0"
            />
            <button
              type="button"
              className="absolute bottom-0 right-0 bg-white p-1 rounded-full text-blue-500 hover:text-blue-600 focus:outline-none border border-gray-300"
              onClick={handleEditPicture}
              style={{ transform: "translate(50%, 50%)" }}
            >
              ✏️
            </button>
          </div>

          {/* Nombre Completo */}
          <div className="mb-6">
            <label
              htmlFor="nombreCompleto"
              className="block mb-2 text-sm font-medium text-black"
            >
              Nombre Completo
            </label>
            <input
              type="text"
              id="nombreCompleto"
              defaultValue={user.nombreCompleto}
              {...register("nombreCompleto", {
                required: "Este campo es obligatorio.",
                minLength: {
                  value: 10,
                  message: "El nombre debe tener al menos 10 caracteres.",
                },
                maxLength: {
                  value: 100,
                  message: "El nombre no puede exceder los 100 caracteres.",
                },
              })}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
            {errors.nombreCompleto && (
              <p className="text-red-500 text-xs mt-1">
                {errors.nombreCompleto.message}
              </p>
            )}
          </div>

          <div className="mb-6">
            <label
              htmlFor="descripcionExperiencias"
              className="block mb-2 text-sm font-medium text-black"
            >
              Descripción de Experiencias
            </label>
            <textarea
              id="descripcionExperiencias"
              defaultValue={user.descripcionExperiencias}
              {...register("descripcionExperiencias", {
                required: "Este campo es obligatorio.",
                minLength: {
                  value: 20,
                  message: "La descripción debe tener al menos 10 caracteres.",
                },
              })}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 h-40 overflow-auto"
            />
            {errors.descripcionExperiencias && (
              <p className="text-red-500 text-xs mt-1">
                {errors.descripcionExperiencias.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div className="mb-6">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-black"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              readOnly
              defaultValue={user.email}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
          </div>

          {/* Botón de envío */}
          <button
            type="submit"
            className="text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            Actualizar perfil
          </button>
        </form>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const { uid } = context.params;

  const userDocRef = doc(db, "profesores", uid);
  const docSnap = await getDoc(userDocRef);

  if (!docSnap.exists()) {
    return {
      notFound: true,
    };
  }

  const user = {
    nombreCompleto: docSnap.data().nombreCompleto,
    email: docSnap.data().correoElectronico,
    fotoUrl: docSnap.data().fotoPerfil, 
    descripcionExperiencias: docSnap.data().descripcionPerfil,

    uid: uid,
  };

  return {
    props: { user }, // Pasar el usuario como prop
  };
}
