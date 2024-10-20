import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { format, parseISO } from 'date-fns';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, DollarSign, BookOpen, Video } from 'lucide-react';
import ToggleCardProfesor from "./toggle-card-profesor";

const TutoriaCardView = ({ profesorTutoria, type }) => {
  const router = useRouter();

  const formatDateString = (dateString) => {
    const date = parseISO(dateString);
    return format(date, 'dd/MM/yyyy');
  };

  const {
    tutoria: {
      titulo,
      descripcion,
      linkMeet,
      areaProgramacion,
      costo,
      reservada,
      id,
      fotografia,
      fechaInicio,
      horaInicio
    },
  } = profesorTutoria;

  const dateFormated = formatDateString(fechaInicio);
  const { profesor } = profesorTutoria;

  const handleComprarClick = () => {
    router.push({
      pathname: '/purchase-confirmation',
      query: { costo, id, titulo, descripcion, areaProgramacion, fotografia, fechaInicio, horaInicio, profesor: JSON.stringify(profesor) },
    });
  };

  const renderAction = () => {
    if (type === "alumno" && reservada === false) {
      return (
        <Button 
          onClick={handleComprarClick} 
          className="w-full"
        >
          Comprar Tutoría
        </Button>
      );
    }
  };

  const areasProgramacion = {
    "01": "Programación Básica y Algorítmica",
    "02": "Desarrollo Web Frontend",
    "03": "Desarrollo Web Backend",
    "04": "Desarrollo Móvil",
  };

  const area = areasProgramacion[areaProgramacion] || "Área no especificada";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="overflow-hidden bg-white dark:bg-gray-800">
        {fotografia && (
          <div className="relative h-56 w-full">
            <Image
              src={fotografia}
              alt={`Imagen de la tutoría ${titulo}`}
              layout="fill"
              objectFit="cover"
              className="rounded-t-lg"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-purple-900 via-purple-900/70 to-transparent opacity-60"></div>
            <CardHeader className="absolute bottom-0 left-0 right-0 text-white">
              <CardTitle className="text-2xl font-bold">{titulo}</CardTitle>
              <Badge variant={reservada ? "secondary" : "default"}>
                {reservada ? "Reservada" : "Disponible"}
              </Badge>
            </CardHeader>
          </div>
        )}
        <CardContent className="p-6 space-y-4">
          <p className="text-gray-600 dark:text-gray-300 text-sm">{descripcion}</p>
          <div className="flex items-center text-purple-700 dark:text-purple-400">
            <BookOpen size={18} className="mr-2" />
            <p className="text-sm">{area}</p>
          </div>
          <div className="flex items-center text-purple-700 dark:text-purple-400">
            <Calendar size={18} className="mr-2" />
            <p className="text-sm">{dateFormated}</p>
          </div>
          <div className="flex items-center text-purple-700 dark:text-purple-400">
            <Clock size={18} className="mr-2" />
            <p className="text-sm">{horaInicio}</p>
          </div>
          <div className="flex items-center text-green-600 dark:text-green-400 font-bold">
            <DollarSign size={18} className="mr-2" />
            <p className="text-xl">{costo} pesos MXN</p>
          </div>

          {type === "mine" && (
            <Button variant="outline" className="w-full" asChild>
              <a
                href={linkMeet}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Video size={18} className="mr-2" />
                Unirse a la reunión
              </a>
            </Button>
          )}
        </CardContent>

        <CardFooter className="flex flex-col space-y-4">
          <ToggleCardProfesor profesor={profesor} />
          {renderAction()}
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default TutoriaCardView;