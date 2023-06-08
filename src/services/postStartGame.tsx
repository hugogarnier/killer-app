import { useMutation, useQueryClient } from '@tanstack/react-query';

import { getGame } from './games';
import { MUTATIONS, QUERIES } from './queries';
import { supabase } from '../lib';

const startGame = async ({ code }: { code: string }) => {
  try {
    await supabase.from('games').update({ started: true }).eq('code', code);
    const { game, players } = await getGame({ code });

    if (game && !!players.length && !!game.actions) {
      players.sort((a, b) => {
        if (a.randomNumber < b.randomNumber) return -1;
        if (a.randomNumber > b.randomNumber) return 1;
        return 0;
      });

      let userIndex = 0;
      const tabRandomNumber: number[] = [];

      players.map((player) => {
        let randomNumber = game.actions && Math.floor(Math.random() * game.actions.length);
        if (randomNumber && tabRandomNumber.includes(randomNumber)) {
          randomNumber = game.actions && Math.floor(Math.random() * game.actions.length);
        }
        randomNumber && tabRandomNumber.push(randomNumber);

        if (players.length - 1 === userIndex) {
          player.player_to_kill = players[0].player_id;
          player.action = randomNumber && game.actions && game.actions[randomNumber].action;
        } else {
          player.player_to_kill = players[userIndex + 1].player_id;
          player.action = randomNumber && game.actions && game.actions[randomNumber].action;
          userIndex++;
        }
      });

      const { status } = await supabase.from('players').upsert(players).eq('code', code);

      return status;
    }
    return 'no action';
  } catch (error) {
    return error;
  }
};

export const usePostStartGame = () => {
  const queryClient = useQueryClient();

  return useMutation([MUTATIONS.START], startGame, {
    onSuccess: () => {
      queryClient.refetchQueries([QUERIES.GAMES]);
    },
  });
};
