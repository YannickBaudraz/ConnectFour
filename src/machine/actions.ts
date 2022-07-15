import { Connect4Action } from '../types';

export const joinConnect4Action: Connect4Action<'join'> = (context, event) => ({
  players: [ ...context.players, { id: event.playerId, name: event.name } ]
});

export const leaveConnect4Action: Connect4Action<'leave'> = (context, event) => ({
  players: context.players.filter(p => p.id !== event.playerId)
});
