import { useMutation, useQueryClient } from '@tanstack/react-query';

import { MUTATIONS, QUERIES } from './queries';
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
    // find game from code
    // insert player
    const randomNumber = Math.floor(Math.random() * 100);

    const { data } = await supabase
      .from('players')
      .select()
      .eq('code', code.toUpperCase())
      .eq('player_id', user.id);

    if (data.length) throw new Error();

    const { status } = await supabase.from('players').insert({
      code: code.toUpperCase(),
      created_at: new Date(),
      alive: true,
      player_id: user.id,
      randomNumber,
      player_name: user.username,
    });

    return { status };
  } catch {
    return { status: 400 };
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
