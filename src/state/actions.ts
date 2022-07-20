import { Action } from '../types';

export const join: Action<'join'> = (context, event) => ({
  players: [ ...context.players, { id: event.playerId, name: event.name } ]
});

export const leave: Action<'leave'> = (context, event) => ({
  players: context.players.filter(p => p.id !== event.playerId)
});

export const chooseColor: Action<'chooseColor'> = (context, event) => ({
  players: context.players.map(p => p.id === event.playerId ? { ...p, color: event.color } : p)
});

export const start: Action<'start'> = (context, event) => ({
  currentPlayer: context.players.find(p => p.id === event.playerId)
});
