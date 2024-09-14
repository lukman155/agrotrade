// components/ProtectedRoute.tsx
'use client';

import { ReactNode, useEffect } from 'react';
import { useAuth } from '../app/context/AuthContext';
import { useRouter } from 'next/navigation';

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/auth'); 
    }
  }, [user, loading, router]);

  if (loading) return <div>Loading...</div>;

  if (!user) return null; 

  return <>{children}</>; 
};

export default ProtectedRoute;
