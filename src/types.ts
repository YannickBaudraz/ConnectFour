import { ContextFrom, EventFrom } from 'xstate';
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

export type Connect4Events = EventFrom<typeof Connect4Model>
export type Connect4Event<T extends Connect4Events['type']> = Connect4Events & { type: T }

export type Connect4Guard<T extends Connect4Events['type']> = (
    context: Connect4Context,
    event: Connect4Event<T>
) => boolean;

export type Connect4Action<T extends Connect4Events['type']> = (
    context: Connect4Context,
    event: Connect4Event<T>
) => Partial<Connect4Context>;
