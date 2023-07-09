import AsyncStorage from '@react-native-async-storage/async-storage';
import { Session } from '@supabase/supabase-js';
import { dismissAuthSession, openAuthSessionAsync } from 'expo-web-browser';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { supabase } from '../lib';
import { Game } from '../types';
import { extractParamsFromUrl } from '../utils';

interface AuthState {
  session: Session | null;
  user: { username: string; id: string } | null;
  isLoading: boolean;
  oauth: (provider: 'google' | 'apple') => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      session: null,
      user: null,
      isLoading: false,
      oauth: async (provider) => {
        try {
          set({ isLoading: true });
          const response = await supabase.auth.signInWithOAuth({
            provider,
            options: {
              redirectTo: 'killer-app://google-auth',
            },
          });

          if (!response.data.url) return;

          const result = await openAuthSessionAsync(
            response.data.url,
            'killer-app://google-auth?',
            {
              showInRecents: true,
            },
          );

          if (result.type === 'success') {
            const data = extractParamsFromUrl(result.url);

            if (!data.access_token || !data.refresh_token) return;

            const resultSession = await supabase.auth.setSession({
              access_token: data.access_token,
              refresh_token: data.refresh_token,
            });

            if (resultSession.error) throw resultSession.error;

            set({
              session: resultSession.data.session,
              user: {
                id: resultSession.data.user.id,
                username: resultSession.data.user.user_metadata.name.split(' ')[0],
              },
            });
          }
        } catch (err: any) {
          set({ session: null, user: null });
        } finally {
          set({ isLoading: false });
          dismissAuthSession();
        }
      },
      logout: async () => {
        const { error } = await supabase.auth.signOut();
        if (error) return Promise.reject(error);

        set({ session: null });
        return Promise.resolve();
      },
    }),
    {
      name: 'killer-app',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        session: state.session,
      }),
    },
  ),
);

interface GameState {
  games: Game[];
  setGames: (arg: { games: Game[] }) => void;
}

export const useGameStore = create<GameState>()(
  persist(
    (set) => ({
      games: [],
      setGames: async ({ games }) => {
        set(() => ({ games }));
      },
    }),
    {
      name: 'killer-app-games',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        games: state.games,
      }),
    },
  ),
);
