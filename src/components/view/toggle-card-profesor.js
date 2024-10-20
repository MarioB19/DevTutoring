import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { User } from 'lucide-react';
import ProfesorCard from './card-profesor';

const ToggleCardProfesor = ({ profesor }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <motion.div
          className="flex flex-col items-center"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Avatar className="w-24 h-24 border-4 border-purple-500 cursor-pointer">
            <AvatarImage src={profesor.fotoPerfil} alt={`Foto de ${profesor.nombreCompleto}`} />
            <AvatarFallback>
              <User className="w-12 h-12 text-purple-500" />
            </AvatarFallback>
          </Avatar>
          <Button variant="link" className="mt-2 text-purple-600 hover:text-purple-800">
            Ver perfil
          </Button>
        </motion.div>
      </DialogTrigger>
      <AnimatePresence>
        <DialogContent className="sm:max-w-[425px]">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
          >
            <ProfesorCard
              key={profesor.id}
              nombreCompleto={profesor.nombreCompleto}
              correoElectronico={profesor.correoElectronico}
              descripcionPerfil={profesor.descripcionPerfil}
              fotoPerfil={profesor.fotoPerfil}
            />
          </motion.div>
        </DialogContent>
      </AnimatePresence>
    </Dialog>
  );
};

export default ToggleCardProfesor;