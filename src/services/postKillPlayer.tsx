import { useMutation, useQueryClient } from '@tanstack/react-query';

import { getGame } from './functions/games';
import { MUTATIONS, QUERIES } from './types';
import { defaultPlayer } from '../constants';
import { supabase } from '../lib';
import { Game } from '../types';

export const killPlayer = async ({ code, uid }: { code: Game['code']; uid: string }) => {
  try {
    const { game, players } = await getGame({ code });
    const activePlayer = players.find((player) => player.player_id === uid) || defaultPlayer;
    const playerKilled =
      players.find((player) => player.player_id === activePlayer.player_to_kill) || defaultPlayer;

    if (game && !!players.length) {
      players.map((player) => {
        if (player.player_id === activePlayer.player_id) {
          player.action = playerKilled.action;
          player.player_to_kill = playerKilled.player_to_kill;
          return player;
        }
        if (player.player_id === playerKilled.player_id) {
          player.alive = false;
          return player;
        }
      });

      const isWinner = players.filter((player) => player.alive);

      if (isWinner.length < 2) {
        players.map((player) => {
          if (player.player_id === isWinner[0].player_id) {
            player.isWinner = true;
          }
        });
        await supabase.from('games').update({ ended: true }).eq('code', code);
        const { status } = await supabase.from('players').upsert(players).eq('code', code);
        return status;
      }

      const { status } = await supabase.from('players').upsert(players).eq('code', code);
      return status;
    }
    return false;
  } catch (error) {
    return error;
  }
};

export const usePostKillPlayer = () => {
  const queryClient = useQueryClient();

  return useMutation([MUTATIONS.KILL], killPlayer, {
    onSuccess: () => {
      queryClient.refetchQueries([QUERIES.GAMES]);
    },
  });
};
