import React from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { motion } from "framer-motion";
import Navbar from "../components/navbar";
import Footer from "./footer";
import ForgotPassword from "@/components/forgot-password";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";

const InicioFormulario = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const formAnimation = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const itemAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-purple-100 to-purple-300">
      <Navbar />
      <main className="flex-grow flex items-center justify-center px-4 py-12">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={formAnimation}
          className="w-full max-w-lg"
        >
          <Card className="bg-white shadow-2xl rounded-xl overflow-hidden">
            <CardHeader className="bg-purple-600 text-white p-6">
              <CardTitle className="text-3xl font-bold text-center">Inicio de Sesión</CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <motion.div variants={itemAnimation} className="space-y-2">
                  <Label htmlFor="correoElectronico" className="text-lg font-medium text-gray-700">Correo Electrónico</Label>
                  <Input
                    {...register("correoElectronico", {
                      required: "Este campo es requerido",
                      pattern: {
                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                        message: "Correo no válido",
                      },
                    })}
                    type="email"
                    id="correoElectronico"
                    placeholder="tu@email.com"
                    className="text-lg p-3"
                  />
                  {errors.correoElectronico && (
                    <p className="text-red-600 text-sm mt-1">{errors.correoElectronico.message}</p>
                  )}
                </motion.div>
                <motion.div variants={itemAnimation} className="space-y-2">
                  <Label htmlFor="password" className="text-lg font-medium text-gray-700">Contraseña</Label>
                  <Input
                    {...register("password", {
                      required: "Este campo es requerido",
                    })}
                    type="password"
                    id="password"
                    placeholder="••••••••"
                    className="text-lg p-3"
                  />
                  {errors.password && (
                    <p className="text-red-600 text-sm mt-1">{errors.password.message}</p>
                  )}
                </motion.div>
                <motion.div variants={itemAnimation}>
                  <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white text-lg py-3 rounded-lg transition-all duration-300 transform hover:scale-105">
                    Iniciar Sesión
                  </Button>
                </motion.div>
              </form>
            </CardContent>
            <CardFooter className="bg-gray-50 p-6 flex flex-col items-center space-y-4">
              <motion.p variants={itemAnimation} className="text-base text-gray-600">
                ¿No tienes una cuenta?{" "}
                <Link href="/register" className="text-purple-600 hover:underline font-medium">
                  Regístrate aquí
                </Link>
              </motion.p>
              <motion.div variants={itemAnimation}>
                <ForgotPassword />
              </motion.div>
            </CardFooter>
          </Card>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default InicioFormulario;