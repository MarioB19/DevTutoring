import React from 'react';
import Navbar from '@/components/navbar';

const TutoringCard = ({ title, image, cost, description }) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg">
      <img src={image} alt={title} className="w-full" />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{title}</div>
        <p className="text-gray-700 text-base">{description}</p>
        <p className="text-gray-700 text-base">Costo: {cost}</p>
      </div>
    </div>
  );
};

const TutoringList = ({ tutorings }) => {
  return (
    <>

      <div className="flex flex-wrap justify-center">
        {tutorings.map((tutoring, index) => (
          <TutoringCard
            key={index}
            title={tutoring.title}
            image={tutoring.image}
            cost={tutoring.cost}
            description={tutoring.description}
          />
        ))}
      </div>
    </>
  );
};

const App = () => {
  // Datos de ejemplo de tutorías
  const tutorings = [
    {
      title: 'Tutoría de Matemáticas',
      image: '/logo.png',
      cost: '$20',
      description: 'Tutoría de matemáticas para estudiantes de secundaria.'
    },
    {
      title: 'Tutoría de Ciencias',
      image: '/logo.png',
      cost: '$25',
      description: 'Tutoría de ciencias para estudiantes de bachillerato.'
    },
    {
      title: 'Tutoría de Programación',
      image: '/logo.png',
      cost: '$30',
      description: 'Tutoría de programación para principiantes.'
    }
  ];

  return (
    <>   
    <Navbar></Navbar> <div className="app">
      <h1 className="text-center text-3xl font-semibold mb-4">Tutorías Disponibles</h1>
      <TutoringList tutorings={tutorings} />
    </div>
    </>
  );
};

export default App;
