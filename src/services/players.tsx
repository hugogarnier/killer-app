import { defaultPlayer } from '../constants';
import { supabase } from '../lib';
import { Game, Player } from '../types';

export const getAllPlayers = async (): Promise<Player[]> => {
  try {
    const result = await supabase.from('players').select('*');
    return result.data as Player[];
  } catch {
    return [defaultPlayer];
  }
};

export const addPlayer = async ({ code, playerId }: { code: Game['code']; playerId: string }) => {
  try {
    const players = await getAllPlayers();

    if (players) {
      const findDuplicateLength = players.filter(
        (player) => player.player_id === playerId && player.code === code,
      ).length;
      if (findDuplicateLength > 0) {
        return new Error('Duplicate player');
      }

      const randomNumber = Math.floor(Math.random() * 100);
      // add a new player to a game
      const { error, status } = await supabase.from('players').insert({
        code: code,
        player_id: playerId,
        created_at: new Date(),
        alive: true,
        randomNumber: randomNumber,
      });

      if (error) {
        return new Error(error.message);
      }
      return { status };
    }
  } catch (e) {
    return e;
  }
};
