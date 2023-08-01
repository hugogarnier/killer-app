import { useMutation, useQueryClient } from '@tanstack/react-query';

import { getGame } from './functions/games';
import { MUTATIONS, QUERIES } from './types';
import { defaultPlayer } from '../constants';
import { supabase } from '../lib';
import { Game } from '../types';

export const confirmKill = async ({ code, uid }: { code: Game['code']; uid: string }) => {
  try {
    const { players } = await getGame({ code });
    const activePlayer = players.find((player) => player.player_id === uid) || defaultPlayer;
    const playerToKill =
      players.find((player) => player.player_id === activePlayer.player_to_kill) || defaultPlayer;

    const { error } = await supabase
      .from('players')
      .update({ confirmKill: true })
      .match({ code: code, player_id: playerToKill.player_id });

    const { error: errorWaiting } = await supabase
      .from('players')
      .update({ waitingConfirmationKill: true })
      .match({ code: code, player_id: uid });

    if (error || errorWaiting) {
      throw new Error();
    }
  } catch (error) {
    return error;
  }
};

export const usePostConfirmKill = () => {
  const queryClient = useQueryClient();

  return useMutation([MUTATIONS.KILL], confirmKill, {
    onSuccess: () => {
      queryClient.refetchQueries([QUERIES.GAMES]);
    },
  });
};
