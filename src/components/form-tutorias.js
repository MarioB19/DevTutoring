
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

const FormularioTutorias = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const watchFoto = watch("foto"); 
  const [fotoURL, setFotoURL] = useState("");

  useEffect(() => {
 
    if (watchFoto && watchFoto.length > 0) {
      const file = watchFoto[0];
      setFotoURL(URL.createObjectURL(file));

 
      return () => {
        URL.revokeObjectURL(fotoURL);
      };
    }
  }, [watchFoto]);

  const [minDateTime, setMinDateTime] = useState({
    date: "",
    time: "",
  });

  useEffect(() => {
    const now = new Date();
    const date = now.toISOString().split("T")[0];
    let hours = now.getHours().toString().padStart(2, "0");
    let minutes = now.getMinutes().toString().padStart(2, "0");
    const time = `${hours}:${minutes}`;
    setMinDateTime({ date, time });
  }, []);

 
  const selectedDate = watch("fechaInicio");
  useEffect(() => {
    if (selectedDate === minDateTime.date) {
 
      const now = new Date();
      let hours = now.getHours().toString().padStart(2, "0");
      let minutes = now.getMinutes().toString().padStart(2, "0");
      setMinDateTime((prevState) => ({
        ...prevState,
        time: `${hours}:${minutes}`,
      }));
    } else {

      setMinDateTime((prevState) => ({
        ...prevState,
        time: "",
      }));
    }
  }, [selectedDate, minDateTime.date]);


  const onFormSubmit = async (data) => {
    await onSubmit(data);  
    reset();  
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onFormSubmit)}
        className="max-w-lg mx-auto my-10"
      >
        <div className="mb-6">
          <label
            htmlFor="title"
            className="block mb-2 text-sm font-medium text-black"
          >
            Título de la Tutoría
          </label>
          <input
            type="text"
            id="title"
            {...register("title", { required: true })}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Introduce el título"
          />
          {errors.title && (
            <p className="text-red-500 text-xs mt-1">
              El título es obligatorio.
            </p>
          )}
        </div>



        <div className="mb-6">
          <label
            htmlFor="description"
            className="block mb-2 text-sm font-medium text-black"
          >
            Descripción
          </label>
          <textarea
            id="description"
            {...register("description", { required: true })}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Detalles de la tutoría"
            rows="4"
          />
          {errors.description && (
            <p className="text-red-500 text-xs mt-1">
              La descripción es obligatoria.
            </p>
          )}
        </div>

        <div className="mb-6">
          <label
            htmlFor="foto"
            className="block mb-2 text-sm font-medium text-black"
          >
            Fotografía
          </label>
          <input
            type="file"
            id="foto"
            {...register("foto", { required: "Se requiere una imagen." })}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
          />
          {errors.foto && (
            <p className="text-red-500 text-xs mt-1">{errors.foto.message}</p>
          )}

          {watchFoto && watchFoto.length > 0 && (
            <img
              src={fotoURL}
              alt="Vista previa"
              className="mt-2 max-w-xs h-auto rounded"
            />
          )}
        </div>

        

        {/* Selector de opciones */}
        <div className="mb-6">
          <label
            htmlFor="area"
            className="block mb-2 text-sm font-medium text-black"
          >
            Área de programación
          </label>
          <select
            id="area"
            {...register("area", { required: "Este campo es obligatorio." })}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          >
            <option value="">Selecciona un área</option>
            <option value="01">Programación Básica y Algorítmica</option>
            <option value="02">Desarrollo Web Frontend</option>
            <option value="03">Desarrollo Web Backend</option>
            <option value="04">Desarrollo Móvil</option>
          </select>
          {errors.area && (
            <p className="text-red-500 text-xs mt-1">{errors.area.message}</p>
          )}
        </div>

        <div className="mb-6">
          <label htmlFor="cost" className="block mb-2 text-sm font-medium text-black">
            Costo de la Tutoría (mínimo $100)
          </label>
          <input
            type="number"
            id="cost"
            {...register("costo", { required: true, min: 100 })}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Introduce el costo"
          />
          {errors.cost && (
            <p className="text-red-500 text-xs mt-1">
              El costo es obligatorio y debe ser mínimo $100.
            </p>
          )}
        </div>


        <div className="mb-6">
          <label
            htmlFor="linkMeet"
            className="block mb-2 text-sm font-medium text-black"
          >
            Link de Meet
          </label>
          <input
            type="text"
            id="linkMeet"
            {...register("linkMeet", {
              required: "Se requiere un link de Meet.",
              pattern: {
                value: /^https:\/\/meet\.google\.com\/[a-zA-Z0-9]{3}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{3}$/
                ,
                message: "Ingresa un link de Google Meet válido.",
              },
            })}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="https://meet.google.com/xxx-xxxx-xxx"
          />
          {errors.linkMeet && (
            <p className="text-red-500 text-xs mt-1">
              {errors.linkMeet.message}
            </p>
          )}
        </div>
        <div className="mb-6">
          <label
            htmlFor="fechaInicio"
            className="block mb-2 text-sm font-medium text-black"
          >
            Fecha de inicio
          </label>
          <input
            type="date"
            id="fechaInicio"
            {...register("fechaInicio", {
              required: "Se requiere una fecha de inicio.",
            })}
            min={minDateTime.date} // Fecha actual como mínimo
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          />
          {errors.fechaInicio && (
            <p className="text-red-500 text-xs mt-1">
              {errors.fechaInicio.message}
            </p>
          )}
        </div>

        {/* Selector de hora de inicio */}
        <div className="mb-6">
          <label
            htmlFor="horaInicio"
            className="block mb-2 text-sm font-medium text-black"
          >
            Hora de inicio
          </label>
          <input
            type="time"
            id="horaInicio"
            {...register("horaInicio", {
              required: "Se requiere una hora de inicio.",
            })}
            min={selectedDate === minDateTime.date ? minDateTime.time : ""} // Hora actual como mínimo si es el día de hoy
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          />
          {errors.horaInicio && (
            <p className="text-red-500 text-xs mt-1">
              {errors.horaInicio.message}
            </p>
          )}
        </div>

        {/* Añade más campos según sea necesario */}

        <button
          type="submit"
          className="text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
        >
          Crear Tutoría
        </button>
      </form>
    </>
  );
};

export default FormularioTutorias;
