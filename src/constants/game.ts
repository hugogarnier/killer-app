import { Game } from '../types';

export const defaultGame: Game = {
  id: 0,
  created_at: '',
  name: '',
  code: '',
  admin: '',
  started: false,
  ended: false,
  actions: [
    {
      id: 0,
      action: '',
      created_at: '',
    },
  ],
};
