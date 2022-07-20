import { States } from '../types';
import { chooseColor, join, leave, start } from './actions';
import { canChooseColor, canJoin, canLeave, canStart } from './guards';
import MachineModel from './MachineModel';

const StateMachine = MachineModel.createMachine({
  id: 'idle',
  context: MachineModel.initialContext,
  initial: States.LOBBY,
  states: {
    [States.LOBBY]: {
      on: {
        join: {
          cond: canJoin,
          actions: [ MachineModel.assign(join) ],
          target: States.LOBBY
        },
        leave: {
          cond: canLeave,
          actions: [ MachineModel.assign(leave) ],
          target: States.LOBBY
        },
        chooseColor: {
          cond: canChooseColor,
          actions: [ MachineModel.assign(chooseColor) ],
          target: States.LOBBY
        },
        start: {
          cond: canStart,
          actions: [ MachineModel.assign(start) ],
          target: States.PLAY
        }
      }
    },
    [States.PLAY]: {
      on: {
        dropPawn: {
          target: States.PLAY
        }
      }
    },
    [States.VICTORY]: {
      on: {
        restart: {
          target: States.LOBBY
        }
      }
    },
    [States.DRAW]: {
      on: {
        restart: {
          target: States.LOBBY
        }
      }
    }
  }
});

export default StateMachine;
