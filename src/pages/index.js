import React, { useState } from "react";
import { useRouter } from "next/router";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/navbar";
import { Tutoria } from "@/models/tutoria";
import { db } from "@/config/firebase-config-cliente";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
  updateDoc
} from "firebase/firestore"; 
import Footer from "@/components/footer";
import LoadingIndicator from "@/components/view/loading-indicator";
import TutoriaCardView from "@/components/view/card-tutoria-view";
import useAuth from "@/controllers/hooks/auth";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";

export async function getServerSideProps(context) {
  const now = new Date();

  const tutoriasRef = collection(db, "tutorias").withConverter(Tutoria.converter);

  const q = query(
    tutoriasRef, 
    where("reservada", "==", false),
    where("fechaCreacion", "<=", now)
  );

  const querySnapshot = await getDocs(q);
  const tutorias = querySnapshot.docs.map((doc) => doc.data());

  const profesoresIds = [...new Set(tutorias.map(tutoria => tutoria.id_profesor))];
  const profesoresRefs = collection(db, "profesores");

  const profesoresPromises = profesoresIds.map(id_profesor => 
    getDoc(doc(profesoresRefs, id_profesor))
  );

  const profesoresSnapshots = await Promise.all(profesoresPromises);

  const profesores = profesoresSnapshots.map(snapshot => ({
    id: snapshot.id,
    ...snapshot.data()
  }));

  const profesoresTutorias = tutorias.map(tutoria => {
    const profesor = profesores.find(prof => prof.id === tutoria.id_profesor);
    return { tutoria, profesor }; 
  });

  return {
    props: {
      profesoresTutorias: JSON.parse(JSON.stringify(profesoresTutorias)),
    },
  };
}

const Tutorias = ({ profesoresTutorias }) => {
  const router = useRouter();
  const [busqueda, setBusqueda] = useState("");
  const { loading, tipo, user } = useAuth();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState({ title: "", message: "" });

  const tutoriasFiltradas = profesoresTutorias.filter((profesorTutoria) =>
    profesorTutoria.tutoria.titulo.toLowerCase().includes(busqueda.toLowerCase())
  );

  const handleSearch = (event) => {
    setBusqueda(event.target.value);
  };

  const handleComprarTutoria = async (id) => {
    const tutoriaRef = doc(db, "tutorias", id);
  
    try {
      await updateDoc(tutoriaRef, {
        reservada: true,    
        id_alumno: user.uid,   
        fechaCompra: new Date() 
      });
  
      setDialogContent({
        title: "Compra exitosa",
        message: "La tutoría ha sido comprada con éxito."
      });
      setIsDialogOpen(true);
    } catch (error) {
      console.error("Error al comprar la tutoría: ", error);
      setDialogContent({
        title: "Error",
        message: "Hubo un problema al realizar la compra. Por favor, intenta de nuevo."
      });
      setIsDialogOpen(true);
    }
  };

  const renderView = () => {
    if (loading) {
      return <LoadingIndicator />;
    }

    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center text-purple-800">
              Tutorías Disponibles
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center mb-6">
              <div className="relative w-full max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Buscar tutorías..."
                  className="pl-10 pr-4 py-2 w-full border rounded-full shadow focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  value={busqueda}
                  onChange={handleSearch}
                />
              </div>
            </div>
          </CardContent>
        </Card>
        <AnimatePresence>
          {tutoriasFiltradas.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="col-span-full text-center py-12"
            >
              <Card>
                <CardContent className="p-6">
                  <p className="text-lg text-gray-600">
                    No hay tutorías disponibles en este momento.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ) : (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {tutoriasFiltradas.map((profesorTutoria) => (
                <motion.div
                  key={profesorTutoria.tutoria.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <TutoriaCardView
                    profesorTutoria={profesorTutoria}
                    onComprar={() => handleComprarTutoria(profesorTutoria.tutoria.id)}
                    type={tipo}
                  />
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-purple-100 to-purple-200">
      <Navbar />
      <main className="flex-grow">
        {renderView()}
      </main>
      <Footer />
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-black font-bold">{dialogContent.title}</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-sm text-black">{dialogContent.message}</p>
          </div>
          <DialogFooter>
            <Button onClick={() => {
              setIsDialogOpen(false);
              if (dialogContent.title === "Compra exitosa") {
                router.reload();
              }
            }}>
              Cerrar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Tutorias;