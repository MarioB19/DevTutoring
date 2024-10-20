import { useState } from 'react';
import { db } from "@/config/firebase-config-cliente";
import { doc, updateDoc, deleteDoc } from 'firebase/firestore';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Users, BookOpen, LogOut, CheckCircle, XCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const MotionCard = motion(Card);
const MotionButton = motion(Button);

const AdminPanel = ({ initialAlumnos, initialProfesores, initialTutorias }) => {
  const [alumnos] = useState(initialAlumnos);
  const [profesores, setProfesores] = useState(initialProfesores);
  const [tutorias] = useState(initialTutorias);

  const acceptedProfesores = profesores.filter(profesor => profesor.aceptado === true);
  const pendingProfesores = profesores.filter(profesor => profesor.aceptado === false);

  const handleAcceptProfesor = async (id) => {
    const profesorRef = doc(db, "profesores", id);
    await updateDoc(profesorRef, { aceptado: true });
    setProfesores(profesores.map(profesor => profesor.id === id ? { ...profesor, aceptado: true } : profesor));
  };

  const handleRejectProfesor = async (id) => {
    await deleteDoc(doc(db, "profesores", id));
    setProfesores(profesores.filter(profesor => profesor.id !== id));
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <motion.div 
      className="container mx-auto p-4 space-y-6"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div className="flex justify-between items-center" variants={itemVariants}>
        <h1 className="text-3xl font-bold text-purple-800">Panel de Administración</h1>
        <Link href="/logout" passHref>
          <MotionButton 
            variant="destructive"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <LogOut className="mr-2 h-4 w-4" /> Cerrar Sesión
          </MotionButton>
        </Link>
      </motion.div>

      <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-4" variants={itemVariants}>
        <MotionCard whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 300 }}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Profesores</CardTitle>
            <Users className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <motion.div 
              className="text-2xl font-bold"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
            >
              {acceptedProfesores.length}
            </motion.div>
          </CardContent>
        </MotionCard>
        <MotionCard whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 300 }}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Alumnos</CardTitle>
            <Users className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <motion.div 
              className="text-2xl font-bold"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 100, delay: 0.3 }}
            >
              {alumnos.length}
            </motion.div>
          </CardContent>
        </MotionCard>
        <MotionCard whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 300 }}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Tutorías</CardTitle>
            <BookOpen className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <motion.div 
              className="text-2xl font-bold"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 100, delay: 0.4 }}
            >
              {tutorias.length}
            </motion.div>
          </CardContent>
        </MotionCard>
      </motion.div>

      <motion.div className="space-y-6" variants={itemVariants}>
        <div>
          <h2 className="text-2xl font-bold text-purple-800 mb-4">Alumnos Registrados</h2>
          <MotionCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nombre Completo</TableHead>
                  <TableHead>Correo Electrónico</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <AnimatePresence>
                  {alumnos.map(alumno => (
                    <motion.tr
                      key={alumno.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <TableCell className="font-medium">{alumno.nombreCompleto}</TableCell>
                      <TableCell>{alumno.correoElectronico}</TableCell>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </TableBody>
            </Table>
          </MotionCard>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-purple-800 mb-4">Profesores Aceptados</h2>
          <MotionCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nombre Completo</TableHead>
                  <TableHead>Correo Electrónico</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <AnimatePresence>
                  {acceptedProfesores.map(profesor => (
                    <motion.tr
                      key={profesor.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <TableCell className="font-medium">{profesor.nombreCompleto}</TableCell>
                      <TableCell>{profesor.correoElectronico}</TableCell>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </TableBody>
            </Table>
          </MotionCard>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-purple-800 mb-4">Solicitudes de Profesores</h2>
          <MotionCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nombre Completo</TableHead>
                  <TableHead>Correo Electrónico</TableHead>
                  <TableHead>Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <AnimatePresence>
                  {pendingProfesores.map(profesor => (
                    <motion.tr
                      key={profesor.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <TableCell className="font-medium">{profesor.nombreCompleto}</TableCell>
                      <TableCell>{profesor.correoElectronico}</TableCell>
                      <TableCell>
                        <div className="space-x-2">
                          <MotionButton
                            variant="outline"
                            size="sm"
                            onClick={() => handleAcceptProfesor(profesor.id)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <CheckCircle className="mr-2 h-4 w-4" /> Aceptar
                          </MotionButton>
                          <MotionButton
                            variant="destructive"
                            size="sm"
                            onClick={() => handleRejectProfesor(profesor.id)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <XCircle className="mr-2 h-4 w-4" /> Rechazar
                          </MotionButton>
                        </div>
                      </TableCell>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </TableBody>
            </Table>
          </MotionCard>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AdminPanel;