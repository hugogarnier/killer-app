import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { supabase } from '../lib';
import { Game } from '../types';

interface AuthState {
  user: { username: string; id: string; uri: string } | null;
  auth: (arg: { user: { username: string; id: string; uri: string } }) => void;
  isLoading: boolean;
  clearUser: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isLoading: false,
      auth: async ({ user }) => {
        try {
          set({ isLoading: true });
          const foundUser = await supabase.from('profiles').select().eq('id', user.id);

          if (foundUser.status === 200) {
            return set({ user: { username: user.username, id: user.id, uri: user.uri } });
          }

          await supabase.from('profiles').insert({
            id: user.id,
            username: user.username,
            avatar_url: user.uri,
          });

          return set({ user: { username: user.username, id: user.id, uri: user.uri } });
        } catch (error) {
          set({ user: null });
        } finally {
          set({ isLoading: false });
        }
      },
      clearUser: () => {
        set({ user: null });
      },
    }),
    {
      name: 'killer-app',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        user: state.user,
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
