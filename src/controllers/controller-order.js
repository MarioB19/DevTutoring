// controllers/tutoriaController.js
import { createOrder } from "../models/tutoria";

export const handleCreateOrder = async (costo) => {
  try {
    const orderId = await createOrder(costo);
    return orderId;
  } catch (error) {
    console.error("Error al crear la orden:", error);
    throw new Error("No se pudo crear la orden"); 
  }
};
