import { ContextFrom, EventFrom } from 'xstate';
import MachineModel from './state/MachineModel';

export enum States {
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
export type Grid = Cell[][];

export type Context = ContextFrom<typeof MachineModel>

export type Events = EventFrom<typeof MachineModel>
export type Event<T extends Events['type']> = Events & { type: T }

export type Guard<T extends Events['type']> = (
    context: Context,
    event: Event<T>
) => boolean;

export type Action<T extends Events['type']> = (
    context: Context,
    event: Event<T>
) => Partial<Context>;
