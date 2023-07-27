import { defaultPlayer } from '../../constants';
import { supabase } from '../../lib';
import { Game, Player, Profile } from '../../types';

export const getAllPlayers = async (): Promise<Player[]> => {
  try {
    const result = await supabase.from('players').select('*');
    return result.data as Player[];
  } catch {
    return [defaultPlayer];
  }
};

type UserId = (arg: { id: Profile['id'] }) => Promise<Player[]>;
export const getGamesFromPlayer: UserId = async ({ id }) => {
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

type Code = (arg: { code: Game['code'] }) => Promise<Player[]>;
export const getPlayersFromCode: Code = async ({ code }) => {
  try {
    const result = await supabase.from('players').select('*').eq('code', code);
    return result.data as Player[];
  } catch {
    return [];
  }
};
