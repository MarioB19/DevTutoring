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
  deleteDoc,
  getDoc,
} from "firebase/firestore";
import { isFuture, isPast, parseISO } from "date-fns";
import TutoriaCardProfesor from "@/components/view/card-tutoria-profesor";
import ProtectedRoute from "@/controllers/controller-protected-route";
import Footer from "@/components/footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Plus } from "lucide-react";

export async function getServerSideProps(context) {
  const { uid } = context.params;

  const tutoriasRef = collection(db, "tutorias").withConverter(Tutoria.converter);
  const qTutorias = query(tutoriasRef, where("id_profesor", "==", uid));
  const querySnapshotTutorias = await getDocs(qTutorias);
  const tutorias = querySnapshotTutorias.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));

  const tutoriasReservadas = tutorias.filter(tutoria => tutoria.reservada);
  const alumnoIds = [...new Set(tutoriasReservadas.map(tutoria => tutoria.id_alumno))];

  const alumnosRef = collection(db, "alumnos");
  const alumnosPromises = alumnoIds.map(id => getDoc(doc(alumnosRef, id)));
  const alumnosSnapshots = await Promise.all(alumnosPromises);
  const alumnos = alumnosSnapshots.reduce((acc, snapshot) => {
    if (snapshot.exists()) {
      acc[snapshot.id] = snapshot.data();
    }
    return acc;
  }, {});

  const tutoriasConAlumnos = tutorias.map(tutoria => {
    const alumnoData = tutoria.reservada ? alumnos[tutoria.id_alumno] : null;
    return {
      tutoria: { ...tutoria, id_alumno: undefined },
      alumno: alumnoData
    };
  });

  return {
    props: {
      tutoriasConAlumnos: JSON.parse(JSON.stringify(tutoriasConAlumnos)),
    },
  };
}

const GestorTutorias = ({ tutoriasConAlumnos }) => {
  const router = useRouter();
  const [busqueda, setBusqueda] = useState("");
  const [vistaActiva, setVistaActiva] = useState("futuras");

  const tutoriasFiltradas = tutoriasConAlumnos.filter(({ tutoria }) =>
    tutoria.titulo.toLowerCase().includes(busqueda.toLowerCase())
  );

  const tutoriasFuturas = tutoriasFiltradas.filter(({ tutoria }) => {
    const dateTime = `${tutoria.fechaInicio}T${tutoria.horaInicio}`;
    return isFuture(parseISO(dateTime));
  });

  const tutoriasPasadas = tutoriasFiltradas.filter(({ tutoria }) => {
    const dateTime = `${tutoria.fechaInicio}T${tutoria.horaInicio}`;
    return isPast(parseISO(dateTime));
  });

  const handleSearch = (event) => {
    setBusqueda(event.target.value);
  };

  const handleEliminarTutoria = async (id) => {
    const tutoriaRef = doc(db, "tutorias", id);
    try {
      await deleteDoc(tutoriaRef);
      router.reload();
      console.log("Tutoría eliminada con éxito");
    } catch (error) {
      console.error("Error al eliminar la tutoría: ", error);
    }
  };

  return (
    <ProtectedRoute requiredType="profesor">
      <div className="min-h-screen bg-gradient-to-br from-purple-100 to-purple-200 flex flex-col">
        <Navbar />
        <main className="flex-grow container mx-auto p-4 pt-8">
          <Card className="mb-8">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-2xl font-bold text-purple-800">
                Gestor de Tutorías
              </CardTitle>
              <Button
                className="bg-purple-600 hover:bg-purple-700 text-white"
                onClick={() => router.push("/profesor/crear-tutoria")}
              >
                <Plus className="mr-2 h-4 w-4" /> Crear Tutoría
              </Button>
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
            <motion.div
              key={vistaActiva}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {(vistaActiva === "futuras" ? tutoriasFuturas : tutoriasPasadas).map(
                ({ tutoria, alumno }) => (
                  <motion.div
                    key={tutoria.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <TutoriaCardProfesor
                      tutoria={tutoria}
                      alumno={alumno}
                      onEliminar={() => handleEliminarTutoria(tutoria.id)}
                    />
                  </motion.div>
                )
              )}
            </motion.div>
          </AnimatePresence>
          
          {(vistaActiva === "futuras" ? tutoriasFuturas : tutoriasPasadas).length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
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
        </main>
        <Footer />
      </div>
    </ProtectedRoute>
  );
};

export default GestorTutorias;