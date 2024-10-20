import React from "react";
import Head from "next/head";
import { motion } from "framer-motion";
import MemberCard from "@/components/view/member-card";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AboutPage = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <>
      <Head>
        <title>Acerca de Nuestras Tutorías</title>
        <meta
          name="description"
          content="Misión, Visión y Valores de nuestro proyecto de tutorías en programación"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
        />
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
              className="text-4xl md:text-5xl font-bold mb-4"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              Acerca de Nuestras Tutorías
            </motion.h1>
            <motion.p 
              className="text-xl md:text-2xl max-w-2xl mx-auto"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              Empodera tu futuro con nuestra enseñanza en programación.
            </motion.p>
          </motion.section>

          <div className="container mx-auto px-4 py-16">
            <motion.div 
              className="grid md:grid-cols-2 gap-8 mb-16"
              variants={staggerChildren}
              initial="initial"
              animate="animate"
            >
              <motion.div variants={fadeInUp}>
                <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 h-full">
                  <CardHeader>
                    <CardTitle className="text-2xl font-bold text-purple-900">Misión</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-purple-700">
                      Nuestra misión es democratizar el aprendizaje de la programación
                      ofreciendo tutorías personalizadas y accesibles para todos,
                      fortaleciendo las habilidades que el mercado actual demanda.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={fadeInUp}>
                <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 h-full">
                  <CardHeader>
                    <CardTitle className="text-2xl font-bold text-purple-900">Visión</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-purple-700">
                      Aspiramos a ser el recurso educativo preferido para aprender a
                      programar, creando una comunidad global de desarrolladores
                      competentes y creativos.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>

            <motion.div 
              variants={fadeInUp}
              initial="initial"
              animate="animate"
              className="mb-16"
            >
              <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-purple-900">Valores</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-5 text-purple-700 space-y-2">
                    <li>Enseñanza personalizada y enfocada en el estudiante.</li>
                    <li>
                      Compromiso con la excelencia y la actualización constante del
                      material de aprendizaje.
                    </li>
                    <li>
                      Transparencia, integridad y apoyo continuo a nuestros
                      estudiantes.
                    </li>
                    <li>Impulso a la innovación y al pensamiento crítico.</li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            <motion.section 
              variants={fadeInUp}
              initial="initial"
              animate="animate"
              className="mb-16"
            >
              <h2 className="text-3xl font-bold text-center text-purple-900 mb-8">
                Integrantes
              </h2>
              <motion.div 
                className="grid md:grid-cols-3 gap-8"
                variants={staggerChildren}
                initial="initial"
                animate="animate"
              >
                <motion.div variants={fadeInUp}>
                  <MemberCard
                    name="Mario Brandon Muro Ramos"
                    role="Founder and Dev"
                    imageUrl="/foto-mario.jpg"
                    socialMedia={[
                      {
                        icon: "fa-instagram",
                        url: "https://www.instagram.com/brandon.muro.mx",
                      },
                      { icon: "fa-github", url: "https://github.com/MarioB19" },
                    ]}
                  />
                </motion.div>

                <motion.div variants={fadeInUp}>
                  <MemberCard
                    name="Omar Mendoza Hernandez"
                    role="Dev"
                    imageUrl="/foto-omar.jpg"
                    socialMedia={[
                      {
                        icon: "fa-instagram",
                        url: "https://www.instagram.com/omarh__23/",
                      },
                    ]}
                  />
                </motion.div>

                <motion.div variants={fadeInUp}>
                  <MemberCard
                    name="Axel Marron Vazquez Pelayo"
                    role="Dev"
                    imageUrl="/foto-axel.jpg"
                    socialMedia={[
                      {
                        icon: "fa-instagram",
                        url: "https://www.instagram.com/brandon_mur_/",
                      },
                    ]}
                  />
                </motion.div>
              </motion.div>
            </motion.section>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default AboutPage;