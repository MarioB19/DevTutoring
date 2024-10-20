"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const FormularioTutorias = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm()

  const watchFoto = watch("foto")
  const [fotoURL, setFotoURL] = useState("")

  useEffect(() => {
    if (watchFoto && watchFoto.length > 0) {
      const file = watchFoto[0]
      setFotoURL(URL.createObjectURL(file))

      return () => {
        URL.revokeObjectURL(fotoURL)
      }
    }
  }, [watchFoto])

  const [minDateTime, setMinDateTime] = useState({
    date: "",
    time: "",
  })

  useEffect(() => {
    const now = new Date()
    const date = now.toISOString().split("T")[0]
    let hours = now.getHours().toString().padStart(2, "0")
    let minutes = now.getMinutes().toString().padStart(2, "0")
    const time = `${hours}:${minutes}`
    setMinDateTime({ date, time })
  }, [])

  const selectedDate = watch("fechaInicio")
  useEffect(() => {
    if (selectedDate === minDateTime.date) {
      const now = new Date()
      let hours = now.getHours().toString().padStart(2, "0")
      let minutes = now.getMinutes().toString().padStart(2, "0")
      setMinDateTime((prevState) => ({
        ...prevState,
        time: `${hours}:${minutes}`,
      }))
    } else {
      setMinDateTime((prevState) => ({
        ...prevState,
        time: "",
      }))
    }
  }, [selectedDate, minDateTime.date])

  const onFormSubmit = async (data) => {
    await onSubmit(data)
    reset()
  }

  return (
    <Card className="w-full max-w-2xl mx-auto my-8">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Crear Nueva Tutoría</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Label htmlFor="title">Título de la Tutoría</Label>
            <Input
              id="title"
              {...register("title", { required: "El título es obligatorio." })}
              placeholder="Introduce el título"
            />
            {errors.title && (
              <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <Label htmlFor="description">Descripción</Label>
            <Textarea
              id="description"
              {...register("description", { required: "La descripción es obligatoria." })}
              placeholder="Detalles de la tutoría"
              rows={4}
            />
            {errors.description && (
              <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <Label htmlFor="foto">Fotografía</Label>
            <Input
              type="file"
              id="foto"
              {...register("foto", { required: "Se requiere una imagen." })}
              className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
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
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            <Label htmlFor="area">Área de programación</Label>
            <Select {...register("area", { required: "Este campo es obligatorio." })}>
              <SelectTrigger>
                <SelectValue placeholder="Selecciona un área" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="01">Programación Básica y Algorítmica</SelectItem>
                <SelectItem value="02">Desarrollo Web Frontend</SelectItem>
                <SelectItem value="03">Desarrollo Web Backend</SelectItem>
                <SelectItem value="04">Desarrollo Móvil</SelectItem>
              </SelectContent>
            </Select>
            {errors.area && (
              <p className="text-red-500 text-xs mt-1">{errors.area.message}</p>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.4 }}
          >
            <Label htmlFor="costo">Costo de la Tutoría (mínimo $100)</Label>
            <Input
              type="number"
              id="costo"
              {...register("costo", { required: true, min: 100 })}
              placeholder="Introduce el costo"
            />
            {errors.costo && (
              <p className="text-red-500 text-xs mt-1">
                El costo es obligatorio y debe ser mínimo $100.
              </p>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.5 }}
          >
            <Label htmlFor="linkMeet">Link de Meet</Label>
            <Input
              type="text"
              id="linkMeet"
              {...register("linkMeet", {
                required: "Se requiere un link de Meet.",
                pattern: {
                  value: /^https:\/\/meet\.google\.com\/[a-zA-Z0-9]{3}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{3}$/,
                  message: "Ingresa un link de Google Meet válido.",
                },
              })}
              placeholder="https://meet.google.com/xxx-xxxx-xxx"
            />
            {errors.linkMeet && (
              <p className="text-red-500 text-xs mt-1">{errors.linkMeet.message}</p>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.6 }}
          >
            <Label htmlFor="fechaInicio">Fecha de inicio</Label>
            <Input
              type="date"
              id="fechaInicio"
              {...register("fechaInicio", {
                required: "Se requiere una fecha de inicio.",
              })}
              min={minDateTime.date}
            />
            {errors.fechaInicio && (
              <p className="text-red-500 text-xs mt-1">{errors.fechaInicio.message}</p>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.7 }}
          >
            <Label htmlFor="horaInicio">Hora de inicio</Label>
            <Input
              type="time"
              id="horaInicio"
              {...register("horaInicio", {
                required: "Se requiere una hora de inicio.",
              })}
              min={selectedDate === minDateTime.date ? minDateTime.time : ""}
            />
            {errors.horaInicio && (
              <p className="text-red-500 text-xs mt-1">{errors.horaInicio.message}</p>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.8 }}
          >
            <Button type="submit" className="w-full">
              Crear Tutoría
            </Button>
          </motion.div>
        </form>
      </CardContent>
    </Card>
  )
}

export default FormularioTutorias