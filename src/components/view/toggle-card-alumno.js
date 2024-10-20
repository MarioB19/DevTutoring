import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import AlumnoCard from './card-alumno';

const ToggleCardAlumno = ({ alumno }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <motion.div
          className="absolute bottom-4 right-4 cursor-pointer"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Avatar className="w-12 h-12 border-2 border-purple-500">
            <AvatarImage src={alumno.fotoPerfil} alt={`Foto de ${alumno.nombreCompleto}`} />
            <AvatarFallback>{alumno.nombreCompleto.charAt(0)}</AvatarFallback>
          </Avatar>
        </motion.div>
      </DialogTrigger>
      <AnimatePresence>
        {isOpen && (
          <DialogContent className="sm:max-w-[425px]">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
            >
              <AlumnoCard
                key={alumno.id}
                nombreCompleto={alumno.nombreCompleto}
                correoElectronico={alumno.correoElectronico}
                fotoPerfil={alumno.fotoPerfil}
              />
            </motion.div>
          </DialogContent>
        )}
      </AnimatePresence>
    </Dialog>
  );
};

export default ToggleCardAlumno;