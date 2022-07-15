import { Connect4Action } from '../types';

export const joinConnect4Action: Connect4Action<'join'> = (context, event) => ({
  players: [ ...context.players, { id: event.playerId, name: event.name } ]
});
