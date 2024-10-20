import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/navbar";
import ProfesorCard from "@/components/view/card-profesor";
import { db } from "@/config/firebase-config-cliente";
import { collection, getDocs } from "firebase/firestore";
import { Profesor } from "@/models/profesor";
import Footer from "@/components/footer";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search } from "lucide-react";

export const getServerSideProps = async () => {
  const profesoresRef = collection(db, "profesores")
  
  const querySnapshot = await getDocs(profesoresRef);
  const profesores = querySnapshot.docs.map((doc) => doc.data());

  return {
    props: {
      profesores: JSON.parse(JSON.stringify(profesores)),
    },
  };
};

const Maestros = ({ profesores }) => {
  const [filtro, setFiltro] = useState("");

  const profesoresFiltrados = profesores.filter((profesor) =>
    profesor.nombreCompleto.toLowerCase().includes(filtro.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-purple-50 to-purple-100">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl md:text-3xl font-bold text-center text-purple-800">
                Nuestros Profesores
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center mb-6">
                <div className="relative w-full max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Buscar profesor..."
                    className="pl-10 pr-4 py-2 w-full border rounded-full shadow focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    onChange={(e) => setFiltro(e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <AnimatePresence>
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial="hidden"
            animate="visible"
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
          >
            {profesoresFiltrados.map((profesor) => (
              <motion.div
                key={profesor.id}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
                transition={{ duration: 0.5 }}
              >
                <ProfesorCard
                  nombreCompleto={profesor.nombreCompleto}
                  correoElectronico={profesor.correoElectronico}
                  descripcionPerfil={profesor.descripcionPerfil}
                  fotoPerfil={profesor.fotoPerfil}
                />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {profesoresFiltrados.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center py-12"
          >
            <Card>
              <CardContent className="p-6">
                <p className="text-lg text-gray-600">
                  No se encontraron profesores que coincidan con tu búsqueda.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Maestros;