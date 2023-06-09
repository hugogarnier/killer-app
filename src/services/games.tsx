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

export const killPlayer = async ({ code, uid }: { code: string; uid: string }) => {
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
