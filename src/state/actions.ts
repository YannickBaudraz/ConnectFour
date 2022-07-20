import {Action, Cell, Row} from '../types';
import {getFreePositionY} from './helpers';
import {getFirstWinningLine} from "./win";

export const join: Action<'join'> = (context, event) => ({
  players: [...context.players, {id: event.playerId, name: event.name}]
});

export const leave: Action<'leave'> = (context, event) => ({
  players: context.players.filter(p => p.id !== event.playerId)
});

export const chooseColor: Action<'chooseColor'> = (context, event) => ({
  players: context.players.map(p => p.id === event.playerId ? {...p, color: event.color} : p)
});

export const start: Action<'start'> = (context, event) => ({
  currentPlayer: context.players.find(p => p.id === event.playerId)
});

export const dropPawn: Action<'dropPawn'> = (context, event) => {
  const playerColor = context.players.find(p => p.id === event.playerId)!.color!;
  const eventYPos = getFreePositionY(context.grid, event.xPos);
  const gridWithPawnDropped = context.grid.map((row: Row, yIndex: number) => {
    if (yIndex !== eventYPos) {
      return row;
    }

    return row.map((cell: Cell, xIndex: number) => {
      const isSearchedCell = xIndex === event.xPos && yIndex === eventYPos;
      return isSearchedCell ? playerColor : cell;
    });
  });

  return {grid: gridWithPawnDropped};
};

export const switchPlayers: Action<'dropPawn'> = (context) => ({
  currentPlayer: context.players.find(p => p !== context.currentPlayer)
});

export const saveWiningLine: Action<'dropPawn'> = (context, event) => ({
  winingLine: getFirstWinningLine(
      context.grid,
      {x: event.xPos, y: getFreePositionY(context.grid, event.xPos)},
      context.currentPlayer!.color!,
      context.lengthToWin
  )
});
