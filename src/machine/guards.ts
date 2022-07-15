import { Connect4Guard } from '../types';

export const canJoinConnect4Guard: Connect4Guard<'join'> = (context, event) => {
  return context.players.length < 2 && !context.players.find(p => p.id === event.playerId);
};
