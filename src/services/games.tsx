import { defaultGame, defaultPlayer } from '../constants';
import { supabase } from '../lib';
import { Game, GameCreated, Player } from '../types';

export const getGames = async (): Promise<Game[]> => {
  try {
    const result = await supabase.from('games').select('*');
    return result.data as Game[];
  } catch {
    return [defaultGame];
  }
};

export const getGame = async ({ code }: { code: Game['code'] }): Promise<GameCreated> => {
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

export const deleteGame = async ({ code, uid }: { code: string; uid: string }) => {
  try {
    const { status } = await supabase
      .from('players')
      .delete()
      .match({ code: code, player_id: uid });
    return { status };
  } catch (error) {
    return error;
  }
};
