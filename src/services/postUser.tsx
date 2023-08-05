import { useMutation } from '@tanstack/react-query';
import { User } from 'react-native-auth0';

import { MUTATIONS } from './types';
import { supabase } from '../lib';

const postUser = async ({ user }: { user: User }): Promise<{ message: string }> => {
  try {
    const foundUser = await supabase.from('profiles').select().eq('id', user.id);

    if (foundUser.data && foundUser.data.length) {
      return { message: 'User already exists' };
    }

    const { error } = await supabase.from('profiles').insert({
      id: user.sub,
      username: user.name,
      avatar_url: user.picture,
    });

    if (error) throw new Error();

    return { message: 'User created' };
  } catch (error) {
    if (error instanceof Error) {
      return { message: error.message };
    }
    return { message: 'Error creating user' };
  }
};

export const usePostUser = () => {
  return useMutation([MUTATIONS.USER], postUser);
};
