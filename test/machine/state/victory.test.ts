import {describe, expect, it} from 'vitest';
import {State} from '../../../src/types';
import {makeFakeContext, makeFakeMachine} from './state-test-helper';
import MachineModel from '../../../src/state/MachineModel';

describe('victory state', () => {
  const context = makeFakeContext();
  const machine = makeFakeMachine(State.VICTORY, context);

  it('should allow a player to restart the game', () => {
    const event = MachineModel.events.restart(1);

    const machineState = machine.send(event);

    expect(machineState.changed).toBeTruthy();
    expect(machineState.context).toEqual(MachineModel.initialContext);
  });
});
