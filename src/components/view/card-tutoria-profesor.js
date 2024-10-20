import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { format, parseISO } from 'date-fns';
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, DollarSign, Trash2, Video, BookOpen } from "lucide-react";
import ToggleCardAlumno from "./toggle-card-alumno";

const TutoriaCardProfesor = ({ tutoria, onEliminar, alumno }) => {
  const formatDateString = (dateString) => {
    const date = parseISO(dateString);
    return format(date, 'dd/MM/yyyy');
  };

  const handleEliminarTutoria = (id) => {
    confirmAlert({
      title: "Confirmar eliminación",
      message: "¿Estás seguro de que quieres eliminar esta tutoría?",
      buttons: [
        {
          label: "Sí",
          onClick: () => onEliminar(id),
        },
        {
          label: "No",
        },
      ],
    });
  };

  const {
    titulo,
    descripcion,
    linkMeet,
    areaProgramacion,
    costo,
    reservada,
    id,
    fotografia,
    fechaInicio,
    horaInicio,
  } = tutoria;

  const areasProgramacion = {
    "01": "Programación Básica y Algorítmica",
    "02": "Desarrollo Web Frontend",
    "03": "Desarrollo Web Backend",
    "04": "Desarrollo Móvil",
  };

  const area = areasProgramacion[areaProgramacion] || "Área no especificada";
  const dateFormated = formatDateString(fechaInicio);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="overflow-hidden bg-white dark:bg-gray-800">
        {fotografia && (
          <div className="relative h-48 w-full">
            <Image
              src={fotografia}
              alt={`Imagen de la tutoría ${titulo}`}
              layout="fill"
              objectFit="cover"
              className="rounded-t-lg"
            />
          </div>
        )}
        <CardHeader>
          <CardTitle>{titulo}</CardTitle>
          <Badge variant={reservada ? "destructive" : "secondary"}>
            {reservada ? "Reservada" : "Disponible"}
          </Badge>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">{descripcion}</p>
          <div className="flex items-center space-x-2">
            <BookOpen className="h-4 w-4 text-purple-500" />
            <span className="text-sm">{area}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Calendar className="h-4 w-4 text-purple-500" />
            <span className="text-sm">{dateFormated}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Clock className="h-4 w-4 text-purple-500" />
            <span className="text-sm">{horaInicio}</span>
          </div>
          <div className="flex items-center space-x-2">
            <DollarSign className="h-4 w-4 text-purple-500" />
            <span className="text-lg font-semibold">${costo}</span>
          </div>
          <Button variant="outline" className="w-full" asChild>
            <a
              href={linkMeet}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Video className="mr-2 h-4 w-4" /> Unirse a la reunión
            </a>
          </Button>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          {!reservada && (
            <Button
              variant="destructive"
              className="w-full"
              onClick={() => handleEliminarTutoria(id)}
            >
              <Trash2 className="mr-2 h-4 w-4" /> Eliminar
            </Button>
          )}
          {reservada && <ToggleCardAlumno alumno={alumno} />}
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default TutoriaCardProfesor;