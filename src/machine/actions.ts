import { Connect4Action } from '../types';

export const joinConnect4Action: Connect4Action<'join'> = (context, event) => ({
  players: [ ...context.players, { id: event.playerId, name: event.name } ]
});

export const leaveConnect4Action: Connect4Action<'leave'> = (context, event) => ({
  players: context.players.filter(p => p.id !== event.playerId)
});

export const chooseColorConnect4Action: Connect4Action<'chooseColor'> = (context, event) => ({
  players: context.players.map(p => p.id === event.playerId ? { ...p, color: event.color } : p)
});
