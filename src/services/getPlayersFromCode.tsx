import { useQuery } from '@tanstack/react-query';

import { QUERIES } from './queries';
import { supabase } from '../lib';
import { Game, Player } from '../types';

type Code = { code: Game['code'] };
export const getPlayersFromCode = async ({ code }: Code): Promise<Player[]> => {
  try {
    const result = await supabase.from('players').select('*').eq('code', code);
    return result.data as Player[];
  } catch {
    return [];
  }
};

export const useGetPlayersFromCode = (request: Code, options) => {
  return useQuery([QUERIES.PLAYERS_FROM_CODE, request], () => getPlayersFromCode(request), {
    ...options,
  });
};
