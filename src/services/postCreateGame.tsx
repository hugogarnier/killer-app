import { useMutation, useQueryClient } from '@tanstack/react-query';

import { MUTATIONS, QUERIES } from './queries';
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
    const randomCode = Math.random().toString(36).substring(2, 7).toUpperCase();

    const actions = await supabase.from('actions').select();

    // create a new game
    const { status } = await supabase.from('games').insert({
      name: name,
      code: randomCode,
      admin: admin,
      created_at: new Date(),
      started: false,
      ended: false,
      actions: actions.data,
    });

    return { status, code: randomCode };
  } catch {
    return { status: 400 };
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
