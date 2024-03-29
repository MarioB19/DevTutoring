import React from 'react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Navbar from '@/components/navbar';

const IndexAlumno = () => {
  return (
    <>
    <Navbar></Navbar>
    <div>
      <h1>Bienvenido Alumno</h1>
   
    </div>
    </>
  );
};

export default IndexAlumno;
