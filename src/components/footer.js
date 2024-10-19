import * as React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

export default function Footer() {
  return (
    <footer className="bg-purple-900 text-purple-100">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-center space-y-4 md:flex-row md:space-y-0 md:space-x-4">
          <Button asChild variant="ghost" className="text-purple-100 hover:text-white hover:bg-purple-800">
            <Link href="/avisos-de-privacidad.pdf" target="_blank" rel="noopener noreferrer">
              Avisos de Privacidad
            </Link>
          </Button>
          <Separator className="hidden md:block bg-purple-700 h-6" orientation="vertical" />
          <Button asChild variant="ghost" className="text-purple-100 hover:text-white hover:bg-purple-800">
            <Link href="/terminos-y-condiciones.pdf" target="_blank" rel="noopener noreferrer">
              Términos y Condiciones
            </Link>
          </Button>
        </div>
        <Separator className="my-6 bg-purple-700" />
        <p className="text-center text-sm text-purple-300">
          © {new Date().getFullYear()} DevTutoring. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  )
}