import React, { useState } from "react";
import Navbar from "../components/navbar";
import { useForm } from "react-hook-form";
import ForgotPassword from "@/components/forgot-password";
import Footer from "./footer";

import Link from "next/link";

const InicioFormulario = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <>
      <Navbar> </Navbar>

      <div className="max-w-md mx-auto mt-8 p-6 bg-gray-100 rounded-lg text-black">
        <h2 className="text-xl font-bold mb-4">Inicio de Sesion</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label htmlFor="correoElectronico" className="block mb-2">
              Correo Electronico
            </label>
            <input
              {...register("correoElectronico", {
                required: "Este campo es requerido",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "Correo no válido",
                },
              })}
              type="email"
              id="correoElectronico"
              className="w-full px-3 py-2 border rounded-md"
            />

            {errors.correoElectronico && (
              <p className="text-red-600">{errors.correoElectronico.message}</p>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block mb-2">
              Contraseña
            </label>
            <input
              {...register("password", {
                required: "Este campo es requerido",
              })}
              type="password"
              id="password"
              className="w-full px-3 py-2 border rounded-md"
            />

            {errors.password && (
              <p className="text-red-600">{errors.password.message}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md"
          >
            Iniciar Sesión
          </button>
        </form>

        <div className="mb-4 text-center">
          <p className="mb-4">
            ¿No tienes una cuenta?{" "}
            <Link href="/register" className="text-blue-500 hover:underline">
              Regístrate aquí
            </Link>
          </p>

          <ForgotPassword></ForgotPassword>
        </div>
      </div>

      <Footer></Footer>
    </>
  );
};

export default InicioFormulario;
