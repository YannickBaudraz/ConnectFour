import { beforeEach, describe, expect, it } from 'vitest';
import { interpret, InterpreterFrom } from 'xstate';
import { Connect4Machine, Connect4Model } from '../../../src/machine/Connect4Machine';

describe('lobby', () => {

  let machine: InterpreterFrom<typeof Connect4Machine>;
  const expectedPlayer1 = { id: 1, name: 'player1' };
  const expectedPlayer2 = { id: 2, name: 'player2' };

  beforeEach(() => {
    machine = interpret(Connect4Machine).start();
  });

  describe('on join', () => {

    it('should let a player join if there are no players', () => {
      const joinEvent = Connect4Model.events.join(1, 'player1');

      const machineState = machine.send(joinEvent);

      expect(machineState.changed).toBeTruthy();
      expect(machineState.context.players).toEqual([ expectedPlayer1 ]);
    });

    it('should let a player join if there are only one player', () => {
      const joinEventPlayer1 = Connect4Model.events.join(1, 'player1');
      machine.send(joinEventPlayer1);
      const joinEventPlayer2 = Connect4Model.events.join(2, 'player2');

      const machineState = machine.send(joinEventPlayer2);

      expect(machineState.changed).toBeTruthy();
      expect(machineState.context.players).toEqual([ expectedPlayer1, expectedPlayer2 ]);
    });

    it('should not let a player join twice', () => {
      const joinEvent = Connect4Model.events.join(1, 'player1');
      machine.send(joinEvent);

      const machineState = machine.send(joinEvent);

      expect(machineState.changed).toBeFalsy();
      expect(machineState.context.players).toEqual([ expectedPlayer1 ]);
    });

    it('should not let a player join if there are already two players', () => {
      const joinEventPlayer1 = Connect4Model.events.join(1, 'player1');
      machine.send(joinEventPlayer1);
      const joinEventPlayer2 = Connect4Model.events.join(2, 'player2');
      machine.send(joinEventPlayer2);
      const joinEventPlayer3 = Connect4Model.events.join(3, 'player3');

      const machineState = machine.send(joinEventPlayer3);

      expect(machineState.changed).toBeFalsy();
      expect(machineState.context.players).toEqual([ expectedPlayer1, expectedPlayer2 ]);
    });
  });

  describe('on leave', () => {

    it('should let a player leave if he\'s in the game', () => {
      const joinEventPlayer1 = Connect4Model.events.join(1, 'player1');
      machine.send(joinEventPlayer1);
      const joinEventPlayer2 = Connect4Model.events.join(2, 'player2');
      machine.send(joinEventPlayer2);
      const leaveEventPlayer1 = Connect4Model.events.leave(1);

      const machineState = machine.send(leaveEventPlayer1);

      expect(machineState.changed).toBeTruthy();
      expect(machineState.context.players).toEqual([ expectedPlayer2 ]);
    });

    it('should not let a player leave if he\'s not in the game', () => {
      const leaveEventUnknownPlayer = Connect4Model.events.leave(17);

      const machineState = machine.send(leaveEventUnknownPlayer);

      expect(machineState.changed).toBeFalsy();
      expect(machineState.context.players).toEqual([]);
    });
  });
});
