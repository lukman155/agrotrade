'use client';

import { signOut } from 'firebase/auth';
import { useAuth } from './context/AuthContext'
import { auth } from './firebaseConfig';
import { Button } from '@/components/ui/button';
import ProtectedRoute from '@/components/ProtectedRoute';

export default function Home() {
  
  const handleSignOut = async() => {
    await signOut(auth)
  }
  const { user } = useAuth()

  return (
    <ProtectedRoute>
      <div className="">
        <p>{user ? `You are logged in as ${user?.email}` : 'Please log in.'}</p>
        <Button onClick={handleSignOut}>Sign Out</Button>
      </div>
    </ProtectedRoute>
  );
}
