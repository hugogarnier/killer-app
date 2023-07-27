import { useMutation, useQueryClient } from '@tanstack/react-query';

import { MUTATIONS, QUERIES } from './types';
import { supabase } from '../lib';
import { CreateGame } from '../types';

const postCreateGame = async ({
  name,
  admin,
}: {
  name: string;
  admin: string;
}): Promise<CreateGame> => {
  try {
    const gameExists = await supabase.from('games').select().ilike('name', `%${name}%`);

    if (gameExists.data && gameExists.data.length) {
      throw new Error('le nom existe déjà');
    }

    const randomCode = Math.random().toString(36).substring(2, 7).toUpperCase();

    const actions = await supabase.from('actions').select();

    // create a new game
    const { status, error } = await supabase.from('games').insert({
      name: name,
      code: randomCode,
      admin: admin,
      created_at: new Date(),
      started: false,
      ended: false,
      actions: actions.data,
    });

    if (error) {
      throw new Error(error.message);
    }

    return { status, code: randomCode };
  } catch (error) {
    if (error instanceof Error) {
      return { status: 400, message: error.message };
    } else {
      return { status: 400 };
    }
  }
};

export const usePostCreateGame = () => {
  const queryClient = useQueryClient();

  return useMutation([MUTATIONS.CREATE], postCreateGame, {
    onSuccess: () => {
      queryClient.refetchQueries([QUERIES.GAMES]);
    },
  });
};
