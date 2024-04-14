import { useState, useEffect } from 'react';
import { auth, onAuthStateChanged } from '@/config/firebase-config-cliente';

const useAuth = () => {
  const [authData, setAuthData] = useState({ user: null, tipo: null });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const response = await fetch("/api/_getTypeUser", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ uid: user.uid }),
          });
          
          if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
          }
          
          const { tipo } = await response.json();
          setAuthData({ user, tipo });
          setLoading(false);
        } catch (error) {
          console.error("Error fetching user type:", error);
          setAuthData({ user: null, tipo: null });
          setLoading(false);
        }
      } else {
        setAuthData({ user: null, tipo: null });
        setLoading(false);
      }
    });


    return () => unsubscribe();
  }, []);

  return { ...authData, loading };
};

export default useAuth;
