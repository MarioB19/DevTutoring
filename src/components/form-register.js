import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import Navbar from "../components/navbar";

const RegistroFormulario = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();
  const tipoUsuario = watch("tipoUsuario", "alumno");

  useEffect(() => {
    setValue("tipoUsuario", "alumno");
  }, [setValue]);

  return (
    <>
      <Navbar />
      <div className="max-w-md mx-auto mt-8 p-6 bg-gray-800 rounded-lg text-white">
        <h2 className="text-2xl font-bold mb-4">Registro</h2>
        <div className="flex justify-between mb-4">
          <button
            type="button"
            onClick={() => setValue("tipoUsuario", "alumno")}
            className={`py-2 px-4 rounded-lg ${
              tipoUsuario === "alumno"
                ? "bg-blue-500"
                : "bg-gray-500 text-gray-300"
            }`}
          >
            Alumno
          </button>
          <button
            type="button"
            onClick={() => setValue("tipoUsuario", "profesor")}
            className={`py-2 px-4 rounded-lg ${
              tipoUsuario === "profesor"
                ? "bg-blue-500"
                : "bg-gray-500 text-gray-300"
            }`}
          >
            Profesor
          </button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input type="hidden" {...register("tipoUsuario")} />

          <div className="mb-4">
            <label htmlFor="nombreCompleto" className="block mb-2">
              Nombre Completo
            </label>
            <input
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
              type="text"
              id="nombreCompleto"
              className="w-full px-3 py-2 border rounded-md bg-gray-200 text-gray-800"
            />
            {errors.nombreCompleto && (
              <p className="text-red-600">{errors.nombreCompleto.message}</p>
            )}
          </div>


          <div className="mb-4">
            <label htmlFor="correoElectronico" className="block mb-2">
              Correo Electrónico
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
              className="w-full px-3 py-2 border rounded-md bg-gray-200 text-gray-800"
            />
            {errors.correoElectronico && (
              <p className="text-red-600">{errors.correoElectronico.message}</p>
            )}
          </div>

   

          {tipoUsuario === "profesor" && (
            <>
              <div className="mb-4">
                <label htmlFor="fechaNacimiento" className="block mb-2">
                  Fecha de Nacimiento
                </label>
                <input
                  {...register("fechaNacimiento", {
                    required: "Este campo es requerido",
                    validate: (value) => {
                      const today = new Date();
                      const birthDate = new Date(value);
                      let age = today.getFullYear() - birthDate.getFullYear();
                      const m = today.getMonth() - birthDate.getMonth();
                      if (
                        m < 0 ||
                        (m === 0 && today.getDate() < birthDate.getDate())
                      ) {
                        age--;
                      }
                      return (
                        age >= 18 || "Debes ser mayor de edad (18 años o más)"
                      );
                    },
                  })}
                  type="date"
                  id="fechaNacimiento"
                  className="w-full px-3 py-2 border rounded-md bg-gray-200 text-gray-800"
                />
                {errors.fechaNacimiento && (
                  <p className="text-red-600">
                    {errors.fechaNacimiento.message}
                  </p>
                )}
              </div>
              <div className="mb-4">
                <label htmlFor="descripcionPerfil" className="block mb-2">
                  Descripción Experiencias
                </label>
                <textarea
                  {...register("descripcionPerfil", {
                    required: "Este campo es requerido",
                    minLength: {
                      value: 20,
                      message:
                        "La descripción debe tener al menos 20 caracteres",
                    },
                  })}
                  id="descripcionPerfil"
                  rows="5"
                  className="w-full px-3 py-2 border rounded-md bg-gray-200 text-gray-800"
                  placeholder="Escribe aquí tu descripción..."
                ></textarea>
                {errors.descripcionPerfil && (
                  <p className="text-red-600">
                    {errors.descripcionPerfil.message}
                  </p>
                )}
              </div>
            </>
          )}
          <div className="mb-4">
            <label htmlFor="password" className="block mb-2">
              Password
            </label>
            <input
              {...register("password", {
                required: "Este campo es requerido",
                minLength: {
                  value: 6,
                  message: "La contraseña debe tener al menos 6 caracteres",
                },
              })}
              type="password"
              id="password"
              className="w-full px-3 py-2 border rounded-md bg-gray-200 text-gray-800"
            />
            {errors.password && (
              <p className="text-red-600">{errors.password.message}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md"
          >
            Registrarse
          </button>
        </form>
      </div>
    </>
  );
};

export default RegistroFormulario;
