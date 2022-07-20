import {interpret, InterpreterFrom} from 'xstate';
import MachineModel from '../../../src/state/MachineModel';
import StateMachine from '../../../src/state/StateMachine';
import {Context, Grid, PlayerColor, State} from '../../../src/types';

export function makeFakeContext(): Context {
  const players = [
    {id: 1, name: 'player1', color: PlayerColor.GREEN},
    {id: 2, name: 'player2', color: PlayerColor.PINK}
  ];
  return {
    players: players,
    currentPlayer: players[0],
    lengthToWin: 4,
    winingLine: [],
    grid: [
      ['E', 'E', 'E', 'E', 'E', 'E', PlayerColor.PINK],
      ['E', 'E', 'E', 'E', 'E', 'E', PlayerColor.GREEN],
      ['E', 'E', 'E', 'E', 'E', 'E', PlayerColor.PINK],
      ['E', 'E', 'E', 'E', 'E', 'E', PlayerColor.GREEN],
      ['E', 'E', 'E', 'E', 'E', 'E', PlayerColor.PINK],
      ['E', 'E', PlayerColor.PINK, PlayerColor.PINK, PlayerColor.PINK, 'E', PlayerColor.GREEN]
    ]
  };
}

export function makeFakeMachine(
    state: State = State.LOBBY,
    context: Partial<Context> = makeFakeContext()
): InterpreterFrom<typeof StateMachine> {
  const finalContext = {...MachineModel.initialContext, ...context};
  const machine = StateMachine.withContext(finalContext);

  return interpret(machine).start(state);
}

export const fakeGridForVerticalLine: Grid = [
  ['E', 'E', 'E', 'E', 'E', 'E', 'E'],
  ['E', 'E', 'E', 'E', 'E', 'E', 'E'],
  ['E', 'E', 'E', 'E', 'E', 'E', 'E'],
  ['E', PlayerColor.GREEN, 'E', 'E', 'E', 'E', 'E'],
  ['E', PlayerColor.GREEN, 'E', 'E', 'E', 'E', 'E'],
  ['E', PlayerColor.GREEN, 'E', 'E', 'E', 'E', 'E']
];

export const fakeGridForDiagonalForwardUpLine: Grid = [
  ['E', 'E', 'E', 'E', 'E', 'E', 'E'],
  ['E', 'E', 'E', 'E', 'E', 'E', 'E'],
  ['E', 'E', 'E', 'E', PlayerColor.GREEN, 'E', 'E'],
  ['E', 'E', 'E', PlayerColor.GREEN, 'E', 'E', 'E'],
  ['E', 'E', PlayerColor.GREEN, 'E', 'E', 'E', 'E'],
  ['E', 'E', 'E', 'E', 'E', 'E', 'E']
];

export const fakeGridForDiagonalForwardDownLine: Grid = [
  ['E', 'E', 'E', 'E', 'E', 'E', 'E'],
  ['E', 'E', 'E', 'E', 'E', 'E', 'E'],
  ['E', 'E', 'E', 'E', 'E', 'E', 'E'],
  ['E', PlayerColor.PINK, PlayerColor.GREEN, 'E', 'E', 'E', 'E'],
  ['E', PlayerColor.PINK, 'E', PlayerColor.GREEN, 'E', 'E', 'E'],
  ['E', PlayerColor.PINK, 'E', 'E', PlayerColor.GREEN, 'E', 'E']
]

export const fakeGridForDiagonalBackwardUpLine: Grid = [
  ['E', 'E', 'E', 'E', 'E', 'E', 'E'],
  ['E', 'E', 'E', 'E', 'E', 'E', 'E'],
  ['E', PlayerColor.GREEN, 'E', 'E', 'E', 'E', 'E'],
  ['E', 'E', PlayerColor.GREEN, 'E', 'E', 'E', 'E'],
  ['E', 'E', 'E', PlayerColor.GREEN, 'E', 'E', 'E'],
  ['E', 'E', 'E', 'E', 'E', 'E', 'E']
];

export const fakeGridForDiagonalBackwardDownLine: Grid = [
  ['E', 'E', 'E', 'E', 'E', 'E', 'E'],
  ['E', 'E', 'E', 'E', 'E', 'E', 'E'],
  ['E', 'E', 'E', 'E', 'E', 'E', 'E'],
  ['E', 'E', 'E', PlayerColor.GREEN, PlayerColor.PINK, 'E', 'E'],
  ['E', 'E', PlayerColor.GREEN, 'E', PlayerColor.PINK, 'E', 'E'],
  ['E', PlayerColor.GREEN, 'E', 'E', PlayerColor.PINK, 'E', 'E']
];
