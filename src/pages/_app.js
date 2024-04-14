import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (

      <Component {...pageProps} />

  );
}

export async function getServerSideProps(context) {
  const user = await getUserData(context.req);

  return { props: { user } }; 
}

