import { defaultPlayer } from '../../constants';
import { supabase } from '../../lib';
import { Player } from '../../types';

export const getAllPlayers = async (): Promise<Player[]> => {
  try {
    const result = await supabase.from('players').select('*');
    return result.data as Player[];
  } catch {
    return [defaultPlayer];
  }
};
