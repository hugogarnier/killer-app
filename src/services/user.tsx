import { supabase } from '../lib';
import { Profile } from '../types';

type UserProps = {
  user: Profile | undefined;
  username: string | undefined;
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
