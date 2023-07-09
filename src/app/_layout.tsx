import React from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Slot } from 'expo-router';

import { AuthProvider } from '../hooks';
// import { useAuthStore } from '../store';

// This hook will protect the route access based on user authentication.
// function useProtectedRoute({ session }: { session: Session | null }) {
//   const segments = useSegments();
//   const router = useRouter();
//   const rootNavigationState = useRootNavigationState();

//   useEffect(() => {
//     if (!rootNavigationState?.key) return;

//     const inAuthGroup = segments[0] === '(auth)';

//     if (!session && !inAuthGroup) {
//       return router.push('/login/');
//     }
//     if (session) {
//       return router.push('/home/feed/');
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [session]);
// }

export default function Root() {
  // const { session } = useAuthStore();

  const queryClient = new QueryClient();

  // useProtectedRoute({ session });

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Slot />
      </AuthProvider>
    </QueryClientProvider>
  );
}
