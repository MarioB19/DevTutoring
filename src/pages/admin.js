import { collection, getDocs } from 'firebase/firestore';
import { db } from "@/config/firebase-config-cliente";
import { Alumno } from "@/models/alumno";
import { Profesor } from "@/models/profesor";
import { Tutoria } from "@/models/tutoria";
import AdminPanel from '@/components/view/admin-panel';
import ProtectedRoute from '@/controllers/controller-protected-route';

export async function getStaticProps() {
  const alumnosSnapshot = await getDocs(collection(db, "alumnos"));
  const alumnos = alumnosSnapshot.docs.map(doc => {
    const data = Alumno.converter.fromFirestore(doc);
    return {
      ...data,
    };
  });

  const profesoresSnapshot = await getDocs(collection(db, "profesores"));
  const profesores = profesoresSnapshot.docs.map(doc => {
    const data = Profesor.converter.fromFirestore(doc);
    return {
      ...data,
    };
  });

  const tutoriasSnapshot = await getDocs(collection(db, "tutorias"));
  const tutorias = tutoriasSnapshot.docs.map(doc => {
    const data = Tutoria.converter.fromFirestore(doc);
    return {
      ...data,
    };
  });

  return {
    props: {
      initialAlumnos: JSON.parse(JSON.stringify(alumnos)),
      initialProfesores: JSON.parse(JSON.stringify(profesores)),
      initialTutorias: JSON.parse(JSON.stringify(tutorias)),
    },
  };
}


const HomeAdmin = ({ initialAlumnos, initialProfesores, initialTutorias }) => {
  return (
    <ProtectedRoute requiredType={"admin"}>
    <AdminPanel
      initialAlumnos={initialAlumnos}
      initialProfesores={initialProfesores}
      initialTutorias={initialTutorias}
    />
    </ProtectedRoute>
  );
};

export default HomeAdmin;
