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

  // async function loadData() {
  //   await Font.loadAsync({
  //     IBMPlexMono_300Light,
  //     IBMPlexMono_400Regular,
  //     IBMPlexMono_500Medium,
  //     IBMPlexMono_600SemiBold,
  //     IBMPlexMono_700Bold,
  //   });
  //   setAppIsReady(true);
  // }
  useEffect(() => {
    SplashScreen.hideAsync();
    setAppIsReady(true);
  }, []);

  useEffect(() => {
    if (appIsReady) {
      if (user) {
        return router.replace('/(app)/home');
      }
      return router.replace('/(auth)');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appIsReady, user]);

  if (!fontsLoaded) {
    return null;
  }
};
