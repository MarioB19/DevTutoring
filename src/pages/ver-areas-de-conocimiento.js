import React from 'react';
import { motion } from 'framer-motion';
import InfoCard from '@/components/view/info-card';
import CardsGrid from '@/components/view/cards-grid';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import Head from 'next/head';

const TutoringSection = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const areas = [
    {
      title: "Programación Básica y Algorítmica",
      image: "/programacion-basica.jpg",
      description: "Antes de sumergirse en áreas especializadas, es crucial tener una sólida comprensión de los fundamentos de la programación y la algorítmica, incluyendo variables, tipos de datos, estructuras de control, bucles, funciones, y la construcción de algoritmos eficientes."
    },
    {
      title: "Desarrollo Web Frontend",
      image: "/programacion-web-fronted.jpg",
      description: "Aprende sobre la parte del software con la que interactúan los usuarios, dominando tecnologías como HTML, CSS, JavaScript y frameworks como React, Angular, o Vue.js."
    },
    {
      title: "Desarrollo Web Backend",
      image: "/programacion-web-backend.jpg",
      description: "Profundiza en el servidor, la base de datos y la aplicación, manejando la lógica detrás de las aplicaciones web con lenguajes como Python, Ruby, Java, o Node.js."
    },
    {
      title: "Desarrollo Móvil",
      image: "/programacion-movil.jpg",
      description: "Desarrolla aplicaciones para dispositivos móviles, utilizando Swift para iOS, Kotlin para Android, o frameworks multiplataforma como Flutter o React Native."
    }
  ];

  return (
    <>
      <Head>
        <title>Nuestras Áreas de Conocimiento</title>
        <meta name="description" content="Explora las áreas de conocimiento que ofrecemos en nuestras tutorías de programación." />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" />
      </Head>

      <div className="flex flex-col min-h-screen bg-gradient-to-br from-purple-50 to-purple-100">
        <Navbar />

        <main className="flex-grow">
          <motion.section 
            className="text-center py-16 bg-gradient-to-r from-purple-600 to-purple-800 text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1 
              className="text-4xl font-bold mb-4"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              Nuestras Áreas de Conocimiento
            </motion.h1>
            <motion.p 
              className="text-xl max-w-2xl mx-auto"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              Explora las áreas de conocimiento que ofrecemos en nuestras tutorías de programación.
            </motion.p>
          </motion.section>

          <motion.section 
            className="py-16"
            variants={staggerChildren}
            initial="initial"
            animate="animate"
          >
            <div className="container mx-auto px-4">
              <CardsGrid>
                {areas.map((area, index) => (
                  <motion.div key={index} variants={fadeInUp}>
                    <InfoCard
                      title={area.title}
                      image={area.image}
                      description={area.description}
                    />
                  </motion.div>
                ))}
              </CardsGrid>
            </div>
          </motion.section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default TutoringSection;