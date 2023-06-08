import { useEffect, useState } from 'react';

import {
  IBMPlexMono_300Light,
  IBMPlexMono_400Regular,
  IBMPlexMono_500Medium,
  IBMPlexMono_600SemiBold,
  IBMPlexMono_700Bold,
} from '@expo-google-fonts/ibm-plex-mono';
import * as Font from 'expo-font';
import { useRouter } from 'expo-router';

import { useAuthStore } from '../stores';

export const useAppInit = () => {
  const [appIsReady, setAppIsReady] = useState(false);
  const router = useRouter();
  const { user } = useAuthStore();
  // const { user } = useAuth0();

  async function loadData() {
    await Font.loadAsync({
      IBMPlexMono_300Light,
      IBMPlexMono_400Regular,
      IBMPlexMono_500Medium,
      IBMPlexMono_600SemiBold,
      IBMPlexMono_700Bold,
    });
    setAppIsReady(true);
  }

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (appIsReady) {
      if (user) {
        return router.replace('/(app)/home/feed');
      }
      return router.replace('/(auth)');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appIsReady, user]);
};
