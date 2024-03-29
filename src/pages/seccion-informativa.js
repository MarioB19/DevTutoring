import Head from 'next/head';


import MemberCard from '@/components/view/member-card';
import Navbar from '@/components/navbar';

const AboutPage = () => {
  return (
    <>
    <Navbar></Navbar>
      <Head>
  <title>Acerca de Nuestras Tutorías</title>
  <meta name="description" content="Misión, Visión y Valores de nuestro proyecto de tutorías en programación" />
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" />
</Head>

<main className="bg-purple-50">
  <section className="text-center py-10 bg-purple-600 text-white">
    <h1 className="text-4xl font-bold mb-4">Acerca de Nuestras Tutorías</h1>
    <p className="text-xl">Empodera tu futuro con nuestra enseñanza en programación.</p>
  </section>

  <div className="container mx-auto px-4">
    <div className="grid md:grid-cols-2 gap-10 my-10">
      {/* Misión */}
      <div className="bg-purple-200 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-purple-900 mb-2">Misión</h2>
        <p className="text-purple-700">
          Nuestra misión es democratizar el aprendizaje de la programación ofreciendo tutorías personalizadas y accesibles para todos, fortaleciendo las habilidades que el mercado actual demanda.
        </p>
      </div>
      {/* Visión */}
      <div className="bg-purple-200 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-purple-900 mb-2">Visión</h2>
        <p className="text-purple-700">
          Aspiramos a ser el recurso educativo preferido para aprender a programar, creando una comunidad global de desarrolladores competentes y creativos.
        </p>
      </div>
    </div>

    {/* Valores */}
    <div className="bg-purple-200 my-10 p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-purple-900 mb-2">Valores</h2>
      <ul className="list-disc pl-5 text-purple-700">
        <li>Enseñanza personalizada y enfocada en el estudiante.</li>
        <li>Compromiso con la excelencia y la actualización constante del material de aprendizaje.</li>
        <li>Transparencia, integridad y apoyo continuo a nuestros estudiantes.</li>
        <li>Impulso a la innovación y al pensamiento crítico.</li>
      </ul>
    </div>
  



          {/* Integrantes */}
          <section className="my-10">
            <h2 className="text-3xl font-bold text-center text-purple-900 mb-6">Integrantes</h2>
            <div className="grid md:grid-cols-1 gap-1">
              {/* Iterar sobre un array de integrantes para renderizar las tarjetas */}
              {/* Aquí colocarías un .map si estuvieras iterando sobre datos */}
              <MemberCard
                name="Mario Brandon Muro Ramos"
                role="CEO"
                imageUrl="/foto-mario.jpg"
                socialMedia={[
                  { icon: 'fa-instagram', url: 'https://www.instagram.com/brandon_mur_/' },
                  { icon: 'fa-github', url: 'https://github.com/MarioB19' }
                ]}
              />
              {/* Repetir MemberCard para otros integrantes */}
            </div>
          </section>
        </div>
      </main>
    </>
  );
};

export default AboutPage;
