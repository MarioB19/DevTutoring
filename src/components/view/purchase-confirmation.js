import React from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { motion } from "framer-motion";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { handleCreateOrder } from "@/controllers/controller-order";
import ToggleCardProfesor from "./toggle-card-profesor";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, DollarSign, BookOpen } from 'lucide-react';

const PurchaseConfirmation = ({ costo, id, titulo, descripcion, areaProgramacion, fotografia, fechaInicio, horaInicio, profesor, onComprar }) => {
  const router = useRouter();

  const handleCancel = () => {
    router.back();
  };

  const areaMap = {
    "01": "Programación Básica y Algorítmica",
    "02": "Desarrollo Web Frontend",
    "03": "Desarrollo Web Backend",
    "04": "Desarrollo Móvil"
  };

  const area = areaMap[areaProgramacion] || "Área desconocida";

  return (
    <motion.div 
      className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-100 to-purple-200 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="w-full max-w-2xl overflow-hidden bg-white dark:bg-gray-800">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-purple-600 dark:text-purple-400">Confirmar Compra</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {fotografia && (
            <div className="relative h-64 w-full rounded-lg overflow-hidden">
              <Image
                src={fotografia}
                alt={`Imagen de la tutoría ${titulo}`}
                layout="fill"
                objectFit="cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-purple-900 via-purple-900/70 to-transparent opacity-60"></div>
              <h2 className="absolute bottom-4 left-4 text-white font-bold text-2xl">{titulo}</h2>
            </div>
          )}
          <p className="text-gray-700 dark:text-gray-300 text-base">{descripcion}</p>
          <div className="flex items-center space-x-2 text-purple-700 dark:text-purple-400">
            <BookOpen size={18} />
            <span>{area}</span>
          </div>
          <div className="flex items-center space-x-2 text-purple-700 dark:text-purple-400">
            <Calendar size={18} />
            <span>{fechaInicio}</span>
          </div>
          <div className="flex items-center space-x-2 text-purple-700 dark:text-purple-400">
            <Clock size={18} />
            <span>{horaInicio}</span>
          </div>
          <div className="flex items-center space-x-2 text-green-600 dark:text-green-400 font-bold">
            <DollarSign size={18} />
            <span className="text-xl">{costo} pesos MXN</span>
          </div>
          <ToggleCardProfesor profesor={profesor} />
          <PayPalScriptProvider
            options={{
              clientId: "AeebljmVdQuktuS4FyaIXDjI_JU29ceXgDaIlwy49WCuBrsVqktOKbEhlnkcl4n3URjmiUxXz1TVq2yR",
              currency: "MXN",
            }}
          >
            <PayPalButtons
              createOrder={() => handleCreateOrder(costo)}
              onCancel={() => alert("Compra cancelada")}
              onApprove={(data, actions) => {
                actions.order.capture().then(() => {
                  onComprar(id);
                });
              }}
              style={{ layout: "horizontal", color: "blue" }}
            />
          </PayPalScriptProvider>
        </CardContent>
        <CardFooter>
          <Button variant="destructive" onClick={handleCancel} className="w-full">
            Cancelar
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default PurchaseConfirmation;