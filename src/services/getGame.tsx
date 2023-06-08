import { useQuery } from '@tanstack/react-query';

import { QUERIES } from './queries';
import { defaultGame, defaultPlayer } from '../constants';
import { supabase } from '../lib';
import { Game, GameCreated, Player } from '../types';

type Code = { code: Game['code'] };
const getGame = async ({ code }: Code): Promise<GameCreated> => {
  try {
    const resultGame = await supabase.from('games').select('*').eq('code', code);

    const resultPlayers = await supabase.from('players').select('*').eq('code', code);
    const game = resultGame.data as Game[];
    const players = resultPlayers.data as Player[];

    if (!!game.length && !!players.length) {
      return { game: game[0], players: players };
    }
    if (!!game.length && !players.length) {
      return { game: game[0], players: [defaultPlayer] };
    }
    return {
      game: defaultGame,
      players: [defaultPlayer],
    };
  } catch {
    return {
      game: defaultGame,
      players: [defaultPlayer],
    };
  }
};

export const useGetGame = (request: Code, options) => {
  return useQuery([QUERIES.GAME, request], () => getGame(request), {
    ...options,
  });
};
