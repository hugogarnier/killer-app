import { User } from '@supabase/supabase-js';

import { supabase } from '../lib';
import { Profile } from '../types';

type UserProps = {
  user: Profile | User | undefined;
  username?: string;
};

export const saveUsername = async ({ user, username }: UserProps) => {
  try {
    if (user) {
      const updates = {
        username,
        updated_at: new Date(),
      };

      const { status, error } = await supabase.from('profiles').update(updates).eq('id', user.id);

      return { status, error };
    }
  } catch (error) {
    return { error };
  }
};

export const getUsername = async ({ user }: UserProps) => {
  try {
    if (user) {
      const { data, error } = await supabase.from('profiles').select('*').eq('id', user.id);

      return { data: data[0], error };
    }
  } catch (error) {
    return { error };
  }
};
