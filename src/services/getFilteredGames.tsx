import { useQuery } from '@tanstack/react-query';

import { getGames } from './functions/games';
import { getAllPlayers } from './functions/players';
import { QUERIES } from './queries';
import { defaultGame } from '../constants';
import { Game, Profile } from '../types';

type UserId = { id: Profile['id'] };
const getFilteredGames = async ({ id }: UserId): Promise<Game[]> => {
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
    return [defaultGame];
  } catch {
    return [defaultGame];
  }
};

export const useGetFilteredGames = (request: UserId, options) => {
  return useQuery([QUERIES.GAMES, request], () => getFilteredGames(request), { ...options });
};
