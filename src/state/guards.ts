import { Guard, Player } from '../types';

export const canJoin: Guard<'join'> = (context, event) => {
  const maxPlayerCount = 2;

  return context.players.length < maxPlayerCount
      && !context.players.find(p => p.id === event.playerId);
};

export const canLeave: Guard<'leave'> = (context, event) => {
  return isPlayerInGame(event.playerId, context.players);
};

export const canChooseColor: Guard<'chooseColor'> = (context, event) => {
  const isColorAvailable = context.players.every(p => event.color !== p.color);

  return isPlayerInGame(event.playerId, context.players)
      && isColorAvailable;
};

export const canStart: Guard<'start'> = (context, event) => {
  const requiredNumberOfPlayers = 2;
  const playersWhoChoseColor = getPlayersWhoChoseColor(context.players).length;

  return isPlayerInGame(event.playerId, context.players)
      && playersWhoChoseColor === requiredNumberOfPlayers;
};

function isPlayerInGame(playerId: number, players: Player[]) {
  return players.some(p => playerId === p.id);
}

function getPlayersWhoChoseColor(players: Player[]): Player[] {
  return players.filter(p => p.color);
}
