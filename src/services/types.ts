export { QueryStatus } from '@tanstack/react-query';

export enum QUERIES {
  GAME = 'game',
  GAMES = 'games',
  PLAYERS_FROM_CODE = 'playersFromCode',
  PLAYERS_GAMES = 'playersGames',
}

export enum MUTATIONS {
  CREATE = 'create',
  JOIN = 'join',
  START = 'start',
  KILL = 'kill',
  USER = 'user',
}
