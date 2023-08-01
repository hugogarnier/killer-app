import { useMutation, useQueryClient } from '@tanstack/react-query';

import { MUTATIONS, QUERIES } from './types';
import { supabase } from '../lib';
import { JoinGame, Profile } from '../types';

const joinGame = async ({
  user,
  code,
}: {
  user: Profile;
  code: JoinGame['code'];
}): Promise<JoinGame> => {
  try {
    const codeUpperCase = code && code.toUpperCase();
    const randomNumber = Math.floor(Math.random() * 100);

    const { data: foundGame } = await supabase.from('games').select().eq('code', codeUpperCase);
    if (foundGame && !foundGame.length) throw new Error('aucune partie avec ce code');

    const { data: foundPlayer } = await supabase
      .from('players')
      .select()
      .eq('code', codeUpperCase)
      .eq('player_id', user.id);
    if (foundPlayer && foundPlayer.length) throw new Error('vous êtes déjà dans la partie');

    const { status } = await supabase.from('players').insert({
      code: codeUpperCase,
      created_at: new Date(),
      alive: true,
      player_id: user.id,
      randomNumber,
      player_name: user.username,
    });

    return { status };
  } catch (error) {
    if (error instanceof Error) {
      return { status: 400, message: error.message };
    } else {
      return { status: 400 };
    }
  }
};

export const usePostJoinGame = () => {
  const queryClient = useQueryClient();

  return useMutation([MUTATIONS.JOIN], joinGame, {
    onSuccess: () => {
      queryClient.refetchQueries([QUERIES.GAMES]);
    },
  });
};
