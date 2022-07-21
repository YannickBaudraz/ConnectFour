import {State} from '../types';
import {
  chooseColor,
  dropPawn,
  join,
  leave,
  restart,
  saveWiningLine,
  start,
  switchPlayers
} from './actions';
import {
  canChooseColor,
  canDropPawn,
  canJoin,
  canLeave,
  canStart,
  isLastPawnDropped,
  isWiningMove
} from './guards';
import MachineModel from './MachineModel';

const StateMachine = MachineModel.createMachine({
  id: 'connect_four',
  context: MachineModel.initialContext,
  initial: State.LOBBY,
  states: {
    [State.LOBBY]: {
      on: {
        join: {
          cond: canJoin,
          actions: [MachineModel.assign(join)],
          target: State.LOBBY
        },
        leave: {
          cond: canLeave,
          actions: [MachineModel.assign(leave)],
          target: State.LOBBY
        },
        chooseColor: {
          cond: canChooseColor,
          actions: [MachineModel.assign(chooseColor)],
          target: State.LOBBY
        },
        start: {
          cond: canStart,
          actions: [MachineModel.assign(start)],
          target: State.PLAY
        }
      }
    },
    [State.PLAY]: {
      on: {
        dropPawn: [{
          cond: isLastPawnDropped,
          actions: [MachineModel.assign(dropPawn)],
          target: State.DRAW
        }, {
          cond: isWiningMove,
          actions: [MachineModel.assign(saveWiningLine), MachineModel.assign(dropPawn)],
          target: State.VICTORY
        }, {
          cond: canDropPawn,
          actions: [MachineModel.assign(dropPawn), MachineModel.assign(switchPlayers)],
          target: State.PLAY
        }]
      }
    },
    [State.VICTORY]: {
      on: {
        restart: {
          actions: [MachineModel.assign(restart)],
          target: State.LOBBY
        }
      }
    },
    [State.DRAW]: {
      on: {
        restart: {
          actions: [MachineModel.assign(restart)],
          target: State.LOBBY
        }
      }
    }
  }
});

export default StateMachine;
