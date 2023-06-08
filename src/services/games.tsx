import { getAllPlayers } from './players';
import { defaultGame, defaultPlayer } from '../constants';
import { supabase } from '../lib';
import { CreateGame, Game, GameCreated, JoinGame, Player, Profile } from '../types';

const getGames = async (): Promise<Game[]> => {
  try {
    const result = await supabase.from('games').select('*');
    return result.data as Game[];
  } catch {
    return [defaultGame];
  }
};

export const getGamesFiltered = async ({ id }: { id: Profile['id'] }): Promise<Game[]> => {
  try {
    const allPlayers = await getAllPlayers();
    const filterPlayer =
      (allPlayers && allPlayers.filter((player) => player.player_id === id)) || [];
    const games = await getGames();

    if (games) {
      return games.filter(
        (game) => filterPlayer.find((player) => player.code === game.code) || game.admin === id,
      );
    }
    return [];
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

export const createGame = async ({
  name,
  admin,
}: {
  name: string;
  admin: string;
}): Promise<CreateGame> => {
  try {
    const randomCode = Math.random().toString(36).substring(2, 7).toUpperCase();

    // create a new game
    const { status } = await supabase.from('games').insert({
      name: name,
      code: randomCode,
      admin: admin,
      created_at: new Date(),
      started: false,
      ended: false,
    });

    return { status, code: randomCode };
  } catch {
    return { status: 400 };
  }
};

export const joinGame = async ({
  user,
  code,
}: {
  user: Profile;
  code: JoinGame['code'];
}): Promise<JoinGame> => {
  try {
    // find game from code
    // insert player
    const randomNumber = Math.floor(Math.random() * 100);

    const { status } = await supabase.from('players').insert({
      code: code,
      created_at: new Date(),
      alive: true,
      player_id: user.id,
      randomNumber,
      player_name: user.username,
    });

    return { status };
  } catch {
    return { status: 400 };
  }
};

export const startGame = async ({ code }: { code: string }) => {
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
