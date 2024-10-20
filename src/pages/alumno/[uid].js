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
  getDoc
} from "firebase/firestore";
import { isFuture, isPast, parseISO } from "date-fns";
import TutoriaCardView from "@/components/view/card-tutoria-view";
import ProtectedRoute from "@/controllers/controller-protected-route";
import Footer from "@/components/footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search } from "lucide-react";

export async function getServerSideProps(context) {
  const { uid } = context.params;

  const now = new Date();

  const tutoriasRef = collection(db, "tutorias").withConverter(Tutoria.converter);

  const q = query(
    tutoriasRef, 
    where("id_alumno", "==", uid),
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

const GestorTutorias = ({ profesoresTutorias }) => {
  const router = useRouter();
  const [busqueda, setBusqueda] = useState("");
  const [vistaActiva, setVistaActiva] = useState("futuras");

  const tutoriasFiltradas = profesoresTutorias.filter(({ tutoria }) =>
    tutoria.titulo.toLowerCase().includes(busqueda.toLowerCase())
  );

  const tutoriasFuturas = tutoriasFiltradas.filter(({ tutoria }) => {
    const dateTime = `${tutoria.fechaInicio}T${tutoria.horaInicio}`;
    const date = parseISO(dateTime);
    return isFuture(date);
  });

  const tutoriasPasadas = tutoriasFiltradas.filter(({ tutoria }) => {
    const dateTime = `${tutoria.fechaInicio}T${tutoria.horaInicio}`;
    const date = parseISO(dateTime);
    return isPast(date);
  });

  const handleSearch = (event) => {
    setBusqueda(event.target.value);
  };

  const tutoriasActivas = vistaActiva === "futuras" ? tutoriasFuturas : tutoriasPasadas;

  return (
    <ProtectedRoute requiredType={"alumno"}>
      <div className="min-h-screen bg-gradient-to-br from-purple-100 to-purple-200 flex flex-col">
        <Navbar />
        <main className="container mx-auto p-4 pt-8 flex-grow">
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-center text-purple-800">
                Gestor de Tutorías
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
              <div className="flex justify-center space-x-4 mb-6">
                <Button
                  variant={vistaActiva === "futuras" ? "default" : "outline"}
                  onClick={() => setVistaActiva("futuras")}
                  className="w-40"
                >
                  Tutorías Futuras
                </Button>
                <Button
                  variant={vistaActiva === "pasadas" ? "default" : "outline"}
                  onClick={() => setVistaActiva("pasadas")}
                  className="w-40"
                >
                  Tutorías Pasadas
                </Button>
              </div>
            </CardContent>
          </Card>

          <AnimatePresence mode="wait">
            {tutoriasActivas.length > 0 ? (
              <motion.div
                key={vistaActiva}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {tutoriasActivas.map((profesorTutoria) => (
                  <motion.div
                    key={profesorTutoria.tutoria.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <TutoriaCardView
                      profesorTutoria={profesorTutoria}
                      type={"mine"}
                    />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="text-center py-12"
              >
                <Card>
                  <CardContent className="p-6">
                    <p className="text-lg text-gray-600">
                      No hay tutorías {vistaActiva === "futuras" ? "futuras" : "pasadas"} disponibles.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
        <Footer />
      </div>
    </ProtectedRoute>
  );
};

export default GestorTutorias;