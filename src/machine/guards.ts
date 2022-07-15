import { Connect4Guard } from '../types';

export const canJoinConnect4Guard: Connect4Guard<'join'> = (context, event) => {
  const maxPlayerNumber = 2;

  return context.players.length < maxPlayerNumber
      && !context.players.find(p => p.id === event.playerId);
};

export const canLeaveConnect4Guard: Connect4Guard<'leave'> = (context, event) => {
  return !!context.players.find(p => p.id === event.playerId);
};
