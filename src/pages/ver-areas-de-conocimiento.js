import React from 'react';

import InfoCard from '@/components/view/info-card';
import CardsGrid from '@/components/view/cards-grid';
import Navbar from '@/components/navbar';

import Head from 'next/head';


const TutoringSection = () => {
    return (

        <>
        <Navbar/>

        <Head>
        <title>Nuestras Áreas de Conocimiento</title>
        <meta name="description" content="Explora las áreas de conocimiento que ofrecemos en nuestras tutorías de programación." />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" />
      </Head>

      <main className="bg-purple-50">
  <section className="text-center py-10 bg-purple-600 text-white">
    <h1 className="text-4xl font-bold mb-4">Nuestras Áreas de Conocimiento</h1>
    <p className="text-xl">Explora las áreas de conocimiento que ofrecemos en nuestras tutorías de programación.</p>
  </section>
</main>


        
        <CardsGrid>
        <InfoCard
        title="Programación Básica y Algorítmica"
        image="/programacion-basica.jpg"
        description="Antes de sumergirse en áreas especializadas, es crucial tener una sólida comprensión de los fundamentos de la programación y la algorítmica, incluyendo variables, tipos de datos, estructuras de control, bucles, funciones, y la construcción de algoritmos eficientes."
      />
      
      <InfoCard
        title="Desarrollo Web Frontend"
        image="/programacion-web-fronted.jpg"
        description="Aprende sobre la parte del software con la que interactúan los usuarios, dominando tecnologías como HTML, CSS, JavaScript y frameworks como React, Angular, o Vue.js."
      />
      
      <InfoCard
        title="Desarrollo Web Backend"
        image="/programacion-web-backend.jpg"
        description="Profundiza en el servidor, la base de datos y la aplicación, manejando la lógica detrás de las aplicaciones web con lenguajes como Python, Ruby, Java, o Node.js."
      />

<InfoCard
        title="Desarrollo Móvil"
        image="/programacion-movil.jpg"
        description="Desarrolla aplicaciones para dispositivos móviles, utilizando Swift para iOS, Kotlin para Android, o frameworks multiplataforma como Flutter o React Native."
      />
      
  {/*
      <InfoCard
        title="Ciencias de la Computación y Teoría de la Computación"
        image="/programacion-ciencia.jpg"
        description="Explora conceptos teóricos subyacentes como complejidad computacional, estructuras de datos, algoritmos avanzados, y teoría de grafos."
      />
      
      <InfoCard
        title="Desarrollo de Videojuegos"
        image="/programacion-videojuegos.jpg"
        description="Aprende sobre la creación de videojuegos, incluyendo gráficos por computadora, física de juegos, inteligencia artificial en juegos, y motores de juegos como Unity o Unreal Engine."
      />
      
      <InfoCard
        title="Inteligencia Artificial y Aprendizaje Automático"
        image="/programacion-ia.jpg"
        description="Adéntrate en la creación de sistemas que pueden aprender de los datos o imitar la inteligencia humana, utilizando algoritmos de aprendizaje automático y profundo."
      />

      <InfoCard
      title="Seguridad Informática"
      image="/programacion-seguridad.jpg"
      description="Enfócate en la protección de la información y los sistemas, aprendiendo sobre criptografía, seguridad de redes, pruebas de penetración, y aspectos éticos y legales de la seguridad."
    />

    */
  }
      
  
      
   
      


</CardsGrid>

      </>
      

    
    
    );
};

export default TutoringSection;