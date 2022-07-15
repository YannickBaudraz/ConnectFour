import { ContextFrom } from 'xstate';
import { Connect4Model } from './machine/Connect4Machine';

export enum Connect4States {
  LOBBY = 'LOBBY',
  PLAY = 'PLAY',
  VICTORY = 'VICTORY',
  DRAW = 'DRAW',
}

export type Player = {
  id: number;
  name: string;
  color?: PlayerColor;
}

export enum PlayerColor {
  PINK = '#EA4C6C',
  GREEN = '#55DC79',
}

export type CellEmpty = 'E';
export type Cell = PlayerColor.PINK | PlayerColor.GREEN | CellEmpty;
export type Connect4Grid = Cell[][];

export type Connect4Context = ContextFrom<typeof Connect4Model>
