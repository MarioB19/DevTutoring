import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../components/navbar";
import Footer from "./footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const RegistroFormulario = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [tipoUsuario, setTipoUsuario] = useState("alumno");

  useEffect(() => {
    setTipoUsuario("alumno");
  }, []);

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

  const buttonAnimation = {
    hover: { scale: 1.05 },
    tap: { scale: 0.95 }
  };

  const professorFieldsAnimation = {
    hidden: { opacity: 0, height: 0 },
    visible: { 
      opacity: 1, 
      height: "auto",
      transition: {
        duration: 0.3,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-purple-100 to-purple-300">
      <Navbar />
      <main className="flex-grow flex items-center justify-center px-4 py-12">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={formAnimation}
          className="w-full max-w-2xl"
        >
          <Card className="bg-white shadow-2xl rounded-xl overflow-hidden">
            <CardHeader className="bg-purple-600 text-white p-6">
              <CardTitle className="text-3xl font-bold text-center">Registro</CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <motion.div variants={itemAnimation} className="flex justify-center space-x-4 mb-6">
                  <motion.div variants={buttonAnimation} whileHover="hover" whileTap="tap">
                    <Button
                      type="button"
                      onClick={() => setTipoUsuario("alumno")}
                      className={`py-2 px-4 rounded-lg transition-colors duration-200 ${
                        tipoUsuario === "alumno"
                          ? "bg-purple-600 text-white"
                          : "bg-gray-200 text-gray-700 hover:bg-purple-600 hover:text-white"
                      }`}
                    >
                      Alumno
                    </Button>
                  </motion.div>
                  <motion.div variants={buttonAnimation} whileHover="hover" whileTap="tap">
                    <Button
                      type="button"
                      onClick={() => setTipoUsuario("profesor")}
                      className={`py-2 px-4 rounded-lg transition-colors duration-200 ${
                        tipoUsuario === "profesor"
                          ? "bg-purple-600 text-white"
                          : "bg-gray-200 text-gray-700 hover:bg-purple-600 hover:text-white"
                      }`}
                    >
                      Profesor
                    </Button>
                  </motion.div>
                </motion.div>

                <input type="hidden" {...register("tipoUsuario")} value={tipoUsuario} />

                <motion.div variants={itemAnimation} className="space-y-2">
                  <Label htmlFor="nombreCompleto">Nombre Completo</Label>
                  <Input
                    {...register("nombreCompleto", {
                      required: "Este campo es requerido",
                      minLength: {
                        value: 10,
                        message: 'El nombre debe tener al menos 10 caracteres.',
                      },
                      maxLength: {
                        value: 100,
                        message: 'El nombre no puede exceder los 100 caracteres.',
                      },
                    })}
                    id="nombreCompleto"
                    placeholder="Ingresa tu nombre completo"
                  />
                  {errors.nombreCompleto && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-600 text-sm"
                    >
                      {errors.nombreCompleto.message}
                    </motion.p>
                  )}
                </motion.div>

                <motion.div variants={itemAnimation} className="space-y-2">
                  <Label htmlFor="correoElectronico">Correo Electrónico</Label>
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
                  />
                  {errors.correoElectronico && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-600 text-sm"
                    >
                      {errors.correoElectronico.message}
                    </motion.p>
                  )}
                </motion.div>

                <AnimatePresence>
                  {tipoUsuario === "profesor" && (
                    <motion.div
                      key="profesor-fields"
                      variants={professorFieldsAnimation}
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                    >
                      <motion.div variants={itemAnimation} className="space-y-2">
                        <Label htmlFor="fechaNacimiento">Fecha de Nacimiento</Label>
                        <Input
                          {...register("fechaNacimiento", {
                            required: "Este campo es requerido",
                            validate: (value) => {
                              const today = new Date();
                              const birthDate = new Date(value);
                              let age = today.getFullYear() - birthDate.getFullYear();
                              const m = today.getMonth() - birthDate.getMonth();
                              if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                                age--;
                              }
                              return age >= 18 || "Debes ser mayor de edad (18 años o más)";
                            },
                          })}
                          type="date"
                          id="fechaNacimiento"
                        />
                        {errors.fechaNacimiento && (
                          <motion.p
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-red-600 text-sm"
                          >
                            {errors.fechaNacimiento.message}
                          </motion.p>
                        )}
                      </motion.div>

                      <motion.div variants={itemAnimation} className="space-y-2 mt-4">
                        <Label htmlFor="descripcionPerfil">Descripción Experiencias</Label>
                        <Textarea
                          {...register("descripcionPerfil", {
                            required: "Este campo es requerido",
                            minLength: {
                              value: 20,
                              message: "La descripción debe tener al menos 20 caracteres",
                            },
                          })}
                          id="descripcionPerfil"
                          rows={5}
                          placeholder="Escribe aquí tu descripción..."
                          className="w-full p-2 border border-gray-300 rounded-md resize-none"
                        />
                        {errors.descripcionPerfil && (
                          <motion.p
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-red-600 text-sm"
                          >
                            {errors.descripcionPerfil.message}
                          </motion.p>
                        )}
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <motion.div variants={itemAnimation} className="space-y-2">
                  <Label htmlFor="password">Contraseña</Label>
                  <Input
                    {...register("password", {
                      required: "Este campo es requerido",
                      minLength: {
                        value: 6,
                        message: "La contraseña debe tener al menos 6 caracteres",
                      },
                    })}
                    type="password"
                    id="password"
                    placeholder="••••••••"
                  />
                  {errors.password && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-600 text-sm"
                    >
                      {errors.password.message}
                    </motion.p>
                  )}
                </motion.div>

                <motion.div variants={itemAnimation}>
                  <motion.div variants={buttonAnimation} whileHover="hover" whileTap="tap">
                    <Button 
                      type="submit" 
                      className="w-full bg-purple-600 hover:bg-purple-700 text-white transition-colors duration-200"
                    >
                      Registrarse
                    </Button>
                  </motion.div>
                </motion.div>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default RegistroFormulario;