import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthError, Session, User } from '@supabase/supabase-js';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { supabase } from '../lib';
import { saveUsername } from '../services';

interface AuthState {
  session: Session | null;
  login: (email: string, password: string) => Promise<User | AuthError | string | null>;
  register: (
    pseudo: string,
    email: string,
    password: string,
  ) => Promise<User | AuthError | string | number | undefined | null>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      session: null,
      login: async (email, password) => {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) return error.message;

        set({ session: data.session });
        return Promise.resolve(data.user);
      },
      register: async (pseudo, email, password) => {
        const { data: resultSearch } = await supabase
          .from('profiles')
          .select('username')
          .textSearch('username', `${pseudo}`);

        if (resultSearch && !!resultSearch.length) {
          return 209;
        }

        const { data, error } = await supabase.auth.signUp({
          email,
          password,
        });

        if (error) return error.status;

        if (data.user) {
          const user = {
            id: data.user.id,
            username: pseudo,
          };
          await saveUsername({ user, username: pseudo });

          set({ session: data.session });
          return Promise.resolve(data.user);
        }
        return 400;
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
