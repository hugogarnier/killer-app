/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';

import {
  IBMPlexMono_300Light,
  IBMPlexMono_400Regular,
  IBMPlexMono_500Medium,
  IBMPlexMono_600SemiBold,
  IBMPlexMono_700Bold,
  useFonts,
} from '@expo-google-fonts/ibm-plex-mono';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// eslint-disable-next-line import/no-named-as-default
import Constants from 'expo-constants';
import { Slot, SplashScreen, useRootNavigation, useRouter, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Auth0Provider, useAuth0, User } from 'react-native-auth0';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(app)',
};

// This hook will protect the route access based on user authentication.
const useProtectedRoute = (user: User | null | undefined) => {
  const segments = useSegments();
  const router = useRouter();

  // checking that navigation is all good;
  const [isNavigationReady, setNavigationReady] = useState(false);
  const rootNavigation = useRootNavigation();

  useEffect(() => {
    const unsubscribe = rootNavigation?.addListener('state', () => {
      setNavigationReady(true);
    });
    return function cleanup() {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [rootNavigation]);

  useEffect(() => {
    if (!isNavigationReady) {
      return;
    }

    const inAuthGroup = segments[0] === '(auth)';

    if (
      // If the user is not signed in and the initial segment is not anything in the auth group.
      !user &&
      !inAuthGroup
    ) {
      // Redirect to the sign-in page.
      router.push('/(auth)/signIn');
    } else if (user && inAuthGroup) {
      // Redirect away from the sign-in page.
      router.push('/(app)/home/feed');
    }
  }, [user, segments, isNavigationReady]);
};

export default function RootLayout() {
  const AUTH_DOMAIN = Constants.expoConfig?.extra?.AUTH_DOMAIN;
  const AUTH_CLIENT_ID = Constants.expoConfig?.extra?.AUTH_CLIENT_ID;

  const [loaded, error] = useFonts({
    IBMPlexMono_300Light,
    IBMPlexMono_400Regular,
    IBMPlexMono_500Medium,
    IBMPlexMono_600SemiBold,
    IBMPlexMono_700Bold,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <Auth0Provider domain={AUTH_DOMAIN} clientId={AUTH_CLIENT_ID}>
      <RootLayoutNav />
    </Auth0Provider>
  );
}
function RootLayoutNav() {
  const queryClient = new QueryClient();
  const { user, isLoading } = useAuth0();

  useProtectedRoute(user);

  if (!user && isLoading) return null;

  return (
    <QueryClientProvider client={queryClient}>
      <BottomSheetModalProvider>
        <StatusBar style="dark" />
        <Slot />
      </BottomSheetModalProvider>
    </QueryClientProvider>
  );
}
