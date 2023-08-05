import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { Game } from '../types';

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
