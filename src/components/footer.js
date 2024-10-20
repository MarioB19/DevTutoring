import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

import Logo from "./logo"
const MotionLink = motion(Link)
const MotionImage = motion(Image)

export default function Footer() {
  return (
    <footer className="bg-purple-900 text-purple-100">
      <div className="container mx-auto px-4 py-8">
        <motion.div 
          className="flex flex-col items-center justify-center space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Logo></Logo>
          <motion.div 
            className="flex flex-col items-center justify-center space-y-4 md:flex-row md:space-y-0 md:space-x-4"
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.2
                }
              }
            }}
            initial="hidden"
            animate="show"
          >
            <motion.div variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}>
              <Button asChild variant="ghost" className="text-purple-100 hover:text-white hover:bg-purple-800 transition-colors duration-200">
                <Link href="/avisos-de-privacidad.pdf" target="_blank" rel="noopener noreferrer">
                  Avisos de Privacidad
                </Link>
              </Button>
            </motion.div>
            <Separator className="hidden md:block bg-purple-700 h-6" orientation="vertical" />
            <motion.div variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}>
              <Button asChild variant="ghost" className="text-purple-100 hover:text-white hover:bg-purple-800 transition-colors duration-200">
                <Link href="/terminos-y-condiciones.pdf" target="_blank" rel="noopener noreferrer">
                  Términos y Condiciones
                </Link>
              </Button>
            </motion.div>
          </motion.div>
          <Separator className="w-full max-w-md bg-purple-700" />
          <motion.div 
            className="text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <p className="text-sm text-purple-300">
              © {new Date().getFullYear()} DevTutoring. Todos los derechos reservados.
            </p>
            <p className="text-xs text-purple-400 mt-2">
              Desarrollado con pasión por el equipo de DevTutoring
            </p>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  )
}