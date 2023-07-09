import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';

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

export const AuthContext = createContext({} as any);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [appIsReady, setAppIsReady] = useState(false);
  const router = useRouter();
  const { session } = useAuthStore();

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
      if (session) {
        return router.replace('/(app)/home/feed');
      }
      return router.replace('/(auth)');
    }
  }, [appIsReady, router, session]);

  const value = {} as any;

  return (
    <AuthContext.Provider value={value}>{appIsReady ? children : undefined}</AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  return context;
}
