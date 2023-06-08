type ActionGame = {
  action: string;
  created_at: string;
  id: number;
};
export interface Database {
  actions: {
    action: string;
    created_at: string;
    id: number;
  };
  games: {
    actions?: ActionGame[];
    admin: string;
    code: string;
    created_at: string;
    ended: boolean;
    id: number;
    name: string;
    started: boolean;
  };
  players: {
    action: ActionGame['action'];
    alive: boolean;
    code: string;
    created_at: string;
    id: number;
    isWinner: boolean;
    player_id: string;
    player_name: string;
    player_to_kill: string;
    randomNumber: number;
  };
  profiles: {
    avatar_url?: string;
    full_name?: string;
    id: string;
    updated_at?: string;
    username: string;
  };
}

export type Game = Database['games'];
export type Player = Database['players'];
export type Profile = Database['profiles'];
export type Action = Database['actions'];
