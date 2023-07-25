import { useQuery } from '@tanstack/react-query';

import { QUERIES } from './queries';
import { defaultPlayer } from '../constants';
import { supabase } from '../lib';
import { Player, Profile } from '../types';

type UserId = { id: Profile['id'] };
export const getGamesFromPlayer = async ({ id }: UserId): Promise<Player[]> => {
  try {
    const playerGames = await supabase.from('players').select('*').eq('player_id', id);

    const games = playerGames.data as Player[];

    if (games.length) {
      return games;
    }
    return [defaultPlayer];
  } catch {
    return [defaultPlayer];
  }
};

export const useGetGamesFromPlayer = (request: UserId, options) => {
  return useQuery([QUERIES.PLAYERS_GAMES, request], () => getGamesFromPlayer(request), {
    ...options,
  });
};
