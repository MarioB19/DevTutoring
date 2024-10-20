import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { useRouter } from "next/router";
import { motion, AnimatePresence } from "framer-motion";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL, getStorage } from 'firebase/storage';
import { db } from "@/config/firebase-config-cliente";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import ProtectedRoute from "@/controllers/controller-protected-route";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Pencil } from "lucide-react";

export default function Perfil({ user }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const router = useRouter();
  const [file, setFile] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState(user.fotoUrl);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState({ title: "", message: "" });

  const onSubmit = async (data) => {
    const nombreCompleto = data.nombreCompleto;
    const alumnosRef = doc(db, "alumnos", user.uid);
  
    try {
      await updateDoc(alumnosRef, {
        nombreCompleto: nombreCompleto,     
      });

      await handleUploadImage();
  
      setDialogContent({
        title: "Perfil actualizado",
        message: "Tu información ha sido actualizada correctamente."
      });
      setIsDialogOpen(true);
    } catch (error) {
      setDialogContent({
        title: "Error",
        message: "Hubo un problema al actualizar tu información. Por favor, intenta de nuevo."
      });
      setIsDialogOpen(true);
    }
  };

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
  
    const storage = getStorage();
    const storageRef = ref(storage, `fotoPerfil/alumno/${user.uid}`);
  
    const snapshot = await uploadBytes(storageRef, file);
    const imageUrl = await getDownloadURL(snapshot.ref);
  
    const userRef = doc(db, "alumnos", user.uid);
    await updateDoc(userRef, {
      fotoPerfil: imageUrl,
    });
  };

  return (
    <ProtectedRoute requiredType="alumno">
      <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-100 to-blue-200">
        <Navbar />
        <main className="flex-grow flex items-center justify-center px-4 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-md"
          >
            <Card className="bg-white shadow-xl rounded-xl overflow-hidden">
              <CardHeader className="bg-blue-600 text-white p-6">
                <CardTitle className="text-2xl font-bold text-center">Perfil de Usuario</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="relative mb-6 text-center">
                    <div className="relative w-32 h-32 mx-auto overflow-hidden rounded-full">
                      <Image src={imagePreviewUrl} layout="fill" objectFit="cover" className="rounded-full" alt="Profile" />
                    </div>
                    <input
                      type="file"
                      id="imageInput"
                      hidden
                      onChange={handleImageChange}
                      className="absolute top-0 right-0"
                    />
                    <motion.button
                      type="button"
                      className="absolute bottom-0 right-0 bg-white p-2 rounded-full text-blue-500 hover:text-blue-600 focus:outline-none border border-gray-300 shadow-lg"
                      onClick={handleEditPicture}
                      style={{ transform: "translate(25%, 25%)" }}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Pencil size={16} />
                    </motion.button>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="nombreCompleto">Nombre Completo</Label>
                    <Input
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
                    />
                    {errors.nombreCompleto && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.nombreCompleto.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      type="email"
                      id="email"
                      readOnly
                      defaultValue={user.email}
                    />
                  </div>
                </form>
              </CardContent>
              <CardFooter className="bg-gray-50 p-6">
                <Button 
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                  onClick={handleSubmit(onSubmit)}
                >
                  Actualizar perfil
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        </main>
        <Footer />
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className = "text-black" >{dialogContent.title}</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-sm text-gray-500">{dialogContent.message}</p>
          </div>
          <DialogFooter>
            <Button onClick={() => {
              setIsDialogOpen(false);
              if (dialogContent.title === "Perfil actualizado") {
                router.reload();
              }
            }}>
              Cerrar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </ProtectedRoute>
  );
}

export async function getServerSideProps(context) {
  const { uid } = context.params; 

  const userDocRef = doc(db, "alumnos", uid);
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
    uid: uid
  };

  return {
    props: { user }, 
  };
}