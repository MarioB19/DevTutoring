import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Mail } from "lucide-react";

const AlumnoCard = ({ fotoPerfil, nombreCompleto, correoElectronico }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="overflow-hidden bg-white dark:bg-gray-800">
        <CardContent className="p-6">
          <motion.div
            className="mb-6 flex justify-center"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Avatar className="h-32 w-32">
              <AvatarImage src={fotoPerfil} alt={nombreCompleto} />
              <AvatarFallback>{nombreCompleto.charAt(0)}</AvatarFallback>
            </Avatar>
          </motion.div>
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <div className="flex items-center space-x-3">
              <User className="h-5 w-5 text-purple-500" />
              <span className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                {nombreCompleto}
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <Mail className="h-5 w-5 text-purple-500" />
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {correoElectronico}
              </span>
            </div>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default AlumnoCard;