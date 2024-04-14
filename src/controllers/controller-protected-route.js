import { useEffect, useState } from 'react';
import useAuth from './hooks/auth';
import LoadingIndicator from '@/components/view/loading-indicator';
import { useRouter } from 'next/router';

const ProtectedRoute = ({ children, requiredType = null }) => {
  const { user, tipo, loading } = useAuth();
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    if (router.isReady && !loading) {
      const pathUid = router.query.uid;

      if (!user || (requiredType && tipo !== requiredType) || (pathUid && user.uid !== pathUid)) {
        router.push("/");
      } else {
        setIsAuthorized(true); 
      }
    }
  }, [user, tipo, requiredType, router, loading]);


  if (loading || !router.isReady || !isAuthorized) {
    return <LoadingIndicator />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
