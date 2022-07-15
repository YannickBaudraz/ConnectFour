import { beforeEach, describe, expect, it } from 'vitest';
import { interpret, InterpreterFrom } from 'xstate';
import { Connect4Machine, Connect4Model } from '../../src/machine/Connect4Machine';

describe('guards', () => {
  describe('canJoinConnect4Guard', () => {
    let machine: InterpreterFrom<typeof Connect4Machine>;

    beforeEach(() => {
      machine = interpret(Connect4Machine).start();
    });

    it('should let a player join if there are no players', () => {
      const joinEvent = Connect4Model.events.join(1, 'player1');

      const machineState = machine.send(joinEvent);

      expect(machineState.changed).toBeTruthy();
    });

    it('should let a player join if there are only one player', () => {
      const joinEventPlayer1 = Connect4Model.events.join(1, 'player1');
      const joinEventPlayer2 = Connect4Model.events.join(2, 'player2');
      machine.send(joinEventPlayer1);

      const machineState = machine.send(joinEventPlayer2);

      expect(machineState.changed).toBeTruthy();
    });

    it('should not let a player join twice', () => {
      const joinEvent = Connect4Model.events.join(1, 'player1');
      machine.send(joinEvent);

      const machineState = machine.send(joinEvent);

      expect(machineState.changed).toBeFalsy();
    });

    it('should not let a player join if there are already two players', () => {
      const joinEventPlayer1 = Connect4Model.events.join(1, 'player1');
      const joinEventPlayer2 = Connect4Model.events.join(2, 'player2');
      const joinEventPlayer3 = Connect4Model.events.join(3, 'player3');
      machine.send(joinEventPlayer1);
      machine.send(joinEventPlayer2);

      const machineState = machine.send(joinEventPlayer3);

      expect(machineState.changed).toBeFalsy();
    });
  });
});
