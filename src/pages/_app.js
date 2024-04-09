import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export async function getServerSideProps(context) {
  // Obtener datos del usuario desde el servidor o la sesión
  const user = await getUserData(context.req);

  return { props: { user } }; // Pasar los datos del usuario como props
}
