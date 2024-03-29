// Importa el componente Navbar que acabas de crear
import Navbar from '../components/navbar';

// Componente de la página de inicio
export default function Home() {
  return (
    <>
      {/* Renderiza el componente Navbar */}
      <Navbar />
      {/* Otros contenidos de la página de inicio pueden ir aquí */}
      {/* Si solo quieres el Navbar, puedes omitir el resto */}
    </>
  );
  
}
