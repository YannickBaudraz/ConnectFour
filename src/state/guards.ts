import {Guard, Player, Position} from '../types';
import {getFreePositionY} from './helpers';
import {getFirstWinningLine} from './win';

export const canJoin: Guard<'join'> = (context, event) => {
  const maxPlayerCount = 2;

  return context.players.length < maxPlayerCount
      && !context.players.find(p => p.id === event.playerId);
};

export const canLeave: Guard<'leave'> = (context, event) => {
  return isPlayerInGame(event.playerId, context.players);
};

function isPlayerInGame(playerId: number, players: Player[]) {
  return players.some(p => playerId === p.id);
}

export const canChooseColor: Guard<'chooseColor'> = (context, event) => {
  const isColorAvailable = context.players.every(p => event.color !== p.color);

  return isPlayerInGame(event.playerId, context.players)
      && isColorAvailable;
};

export const canStart: Guard<'start'> = (context, event) => {
  const requiredNumberOfPlayers = 2;
  const playersWhoChoseColor = context.players.filter(p => p.color);

  return isPlayerInGame(event.playerId, context.players)
      && playersWhoChoseColor.length === requiredNumberOfPlayers;
};

export const canDropPawn: Guard<'dropPawn'> = (context, {xPos, playerId}) => {
  const isInsideRow = xPos >= 0 && xPos < context.grid[0].length;
  const isCurrentPlayer = context.currentPlayer?.id === playerId;
  const isPositionYFree = getFreePositionY(context.grid, xPos) >= 0;

  return isInsideRow && isPositionYFree && isCurrentPlayer;
};

export const isWiningMove: Guard<'dropPawn'> = (context, event) => {
  const {lengthToWin, grid, currentPlayer} = context;
  const position: Position = {x: event.xPos, y: getFreePositionY(grid, event.xPos)};
  const colorDropped = currentPlayer!.color!;
  const firstWinningLine = getFirstWinningLine(grid, position, colorDropped, lengthToWin);

  return canDropPawn(context, event) && firstWinningLine.length === lengthToWin;
};
