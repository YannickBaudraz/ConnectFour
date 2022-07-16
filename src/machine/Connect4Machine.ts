import { createModel } from 'xstate/lib/model';
import { Connect4Grid, Connect4States, Player, PlayerColor } from '../types';
import { chooseColorConnect4Action, joinConnect4Action, leaveConnect4Action, startConnect4Action } from './actions';
import {
  canChooseColorConnect4Guard,
  canJoinConnect4Guard,
  canLeaveConnect4Guard,
  canStartConnect4Guard
} from './guards';

export const Connect4Model = createModel({
  players: [] as Player[],
  currentPlayer: null as null | Player,
  rowLength: 4,
  grid: [
    [ 'E', 'E', 'E', 'E', 'E', 'E', 'E' ],
    [ 'E', 'E', 'E', 'E', 'E', 'E', 'E' ],
    [ 'E', 'E', 'E', 'E', 'E', 'E', 'E' ],
    [ 'E', 'E', 'E', 'E', 'E', 'E', 'E' ],
    [ 'E', 'E', 'E', 'E', 'E', 'E', 'E' ],
    [ 'E', 'E', 'E', 'E', 'E', 'E', 'E' ]
  ] as Connect4Grid
}, {
  events: {
    join: (playerId: Player['id'], name: Player['name']) => ({ playerId, name }),
    leave: (playerId: Player['id']) => ({ playerId }),
    chooseColor: (playerId: Player['id'], color: PlayerColor) => ({ playerId, color }),
    start: (playerId: Player['id']) => ({ playerId }),
    dropPawn: (playerId: Player['id'], row: number) => ({ playerId, row }),
    restart: (playerId: Player['id']) => ({ playerId })
  }
});

export const Connect4Machine = Connect4Model.createMachine({
  id: 'game',
  context: Connect4Model.initialContext,
  initial: Connect4States.LOBBY,
  states: {
    [Connect4States.LOBBY]: {
      on: {
        join: {
          cond: canJoinConnect4Guard,
          actions: [ Connect4Model.assign(joinConnect4Action) ],
          target: Connect4States.LOBBY
        },
        leave: {
          cond: canLeaveConnect4Guard,
          actions: [ Connect4Model.assign(leaveConnect4Action) ],
          target: Connect4States.LOBBY
        },
        chooseColor: {
          cond: canChooseColorConnect4Guard,
          actions: [ Connect4Model.assign(chooseColorConnect4Action) ],
          target: Connect4States.LOBBY
        },
        start: {
          cond: canStartConnect4Guard,
          actions: [ Connect4Model.assign(startConnect4Action) ],
          target: Connect4States.PLAY
        }
      }
    },
    [Connect4States.PLAY]: {
      on: {
        dropPawn: {
          target: Connect4States.PLAY
        }
      }
    },
    [Connect4States.VICTORY]: {
      on: {
        restart: {
          target: Connect4States.LOBBY
        }
      }
    },
    [Connect4States.DRAW]: {
      on: {
        restart: {
          target: Connect4States.LOBBY
        }
      }
    }
  }
});
