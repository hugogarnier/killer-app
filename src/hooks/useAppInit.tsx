import { useEffect, useState } from 'react';

import {
  IBMPlexMono_300Light,
  IBMPlexMono_400Regular,
  IBMPlexMono_500Medium,
  IBMPlexMono_600SemiBold,
  IBMPlexMono_700Bold,
  useFonts,
} from '@expo-google-fonts/ibm-plex-mono';
import { SplashScreen, useRouter } from 'expo-router';

import { useAuthStore } from '../stores';

export const useAppInit = () => {
  const [appIsReady, setAppIsReady] = useState(false);
  const router = useRouter();
  const { user } = useAuthStore();

  SplashScreen.preventAutoHideAsync();

  const [fontsLoaded] = useFonts({
    IBMPlexMono_300Light,
    IBMPlexMono_400Regular,
    IBMPlexMono_500Medium,
    IBMPlexMono_600SemiBold,
    IBMPlexMono_700Bold,
  });

  useEffect(() => {
    SplashScreen.hideAsync();
    setAppIsReady(true);
  }, []);

  useEffect(() => {
    console.log('appinit');
    if (appIsReady) {
      console.log('appready');
      if (user) {
        console.log('user');
        return router.replace('/(app)/home/feed');
      }
      return router.replace('/(auth)');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appIsReady, user]);

  if (!fontsLoaded) {
    return null;
  }
};
