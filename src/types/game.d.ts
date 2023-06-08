import { Game, Player } from './supabase';

export type CreateGame = {
  status: number;
  code?: Game['code'];
};

export type JoinGame = {
  status: number;
  code?: Game['code'];
};

export type GameCreated = {
  game: Game;
  players: Player[];
};
