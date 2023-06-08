import React, { useEffect } from 'react';

import { Session } from '@supabase/supabase-js';
import { Slot, useRouter, useSegments } from 'expo-router';

import { useAuthStore } from '../src/store';

// This hook will protect the route access based on user authentication.
function useProtectedRoute({ session }: { session: Session | null }) {
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    const inAuthGroup = segments[0] === '(auth)';

    if (!session && !inAuthGroup) {
      return router.push('/login');
    }
    if (session) {
      return router.push('/home');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);
}

export default function Root() {
  const { session } = useAuthStore();

  useProtectedRoute({ session });

  return <Slot />;
}
