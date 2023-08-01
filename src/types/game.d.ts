import { Game, Player } from './supabase';

export type CreateGame = {
  status: number;
  message?: string;
  code?: Game['code'];
};

export type JoinGame = {
  status: number;
  message?: string;
  code?: Game['code'];
};

export type GameCreated = {
  game: Game;
  players: Player[];
};
