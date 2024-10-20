import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { db } from '@/config/firebase-config-cliente';
import { collection, query, where, getDocs } from "firebase/firestore";
import { useRouter } from 'next/router';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [showErrorDialog, setShowErrorDialog] = useState(false);
  const auth = getAuth();
  const router = useRouter();

  async function emailExists(email) {
    const collections = ['profesores', 'alumnos'];
    const queries = collections.map(col => query(collection(db, col), where("correoElectronico", "==", email)));
  
    try {
      for (let q of queries) {
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          return true;
        }
      }
      return false;
    } catch (error) {
      console.error("Error al verificar el correo electrónico:", error);
      return false;
    }
  }

  async function resetPassword(email) {
    try {
      await sendPasswordResetEmail(auth, email);
      alert("Se ha enviado un correo para restablecer tu contraseña.");
    } catch (error) {
      console.error("Error en el envío del correo de restablecimiento: ", error.code, error.message);
      alert("Hubo un problema al enviar el correo. Por favor, intenta de nuevo.");
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const existsCorreo = await emailExists(email);

    if (!existsCorreo) {
      setShowErrorDialog(true);
    } else {
      await resetPassword(email);
      setIsOpen(false);
      router.push("/login");
    }
  };

  return (
    <div className="text-center">
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button variant="link" className="text-purple-500 hover:text-purple-700">
            ¿Olvidaste tu contraseña?
          </Button>
        </DialogTrigger>
        <AnimatePresence>
          {isOpen && (
            <DialogContent className="sm:max-w-[425px] bg-white">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <DialogHeader>
                  <DialogTitle className="text-black">Restablecer contraseña</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-black">Correo electrónico</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Ingresa tu correo electrónico"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="text-black placeholder-gray-500"
                    />
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button type="button" variant="outline" onClick={() => setIsOpen(false)} className="text-black">
                      Cancelar
                    </Button>
                    <Button type="submit" className="bg-purple-500 text-white hover:bg-purple-600">Enviar</Button>
                  </div>
                </form>
              </motion.div>
            </DialogContent>
          )}
        </AnimatePresence>
      </Dialog>

      <Dialog open={showErrorDialog} onOpenChange={setShowErrorDialog}>
        <DialogContent className="sm:max-w-[425px] bg-white">
          <DialogHeader>
            <DialogTitle className="text-black">Correo no encontrado</DialogTitle>
          </DialogHeader>
          <p className="text-black">No hay una cuenta asociada a este correo electrónico.</p>
          <DialogFooter>
            <Button onClick={() => setShowErrorDialog(false)} className="bg-purple-500 text-white hover:bg-purple-600">
              Entendido
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default ForgotPassword;