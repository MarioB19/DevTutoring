import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { User, Mail, MessageSquare } from "lucide-react";

const ProfesorCard = ({ fotoPerfil, nombreCompleto, correoElectronico, descripcionPerfil }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="overflow-hidden bg-white dark:bg-gray-800">
        <CardHeader className="pb-2">
          <motion.div
            className="flex justify-center"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Avatar className="h-32 w-32">
              <AvatarImage src={fotoPerfil} alt={nombreCompleto} />
              <AvatarFallback>{nombreCompleto.charAt(0)}</AvatarFallback>
            </Avatar>
          </motion.div>
        </CardHeader>
        <CardContent className="space-y-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <CardTitle className="flex items-center space-x-3 mb-2">
              <User className="h-5 w-5 text-purple-500" />
              <span className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                {nombreCompleto}
              </span>
            </CardTitle>
            <div className="flex items-center space-x-3 mb-3">
              <Mail className="h-5 w-5 text-purple-500" />
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {correoElectronico}
              </span>
            </div>
            <div className="flex items-start space-x-3">
              <MessageSquare className="h-5 w-5 text-purple-500 mt-1" />
              <ScrollArea className="h-24 w-full rounded-md border p-2">
                <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap break-words">
                  {descripcionPerfil}
                </p>
              </ScrollArea>
            </div>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ProfesorCard;