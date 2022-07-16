import { beforeEach, describe, expect, it } from 'vitest';
import { interpret, InterpreterFrom } from 'xstate';
import { Connect4Machine, Connect4Model } from '../../../src/machine/Connect4Machine';
import { Player, PlayerColor } from '../../../src/types';

describe('lobby', () => {

  let machine: InterpreterFrom<typeof Connect4Machine>;
  const player1 = { id: 1, name: 'player1' };
  const player2 = { id: 2, name: 'player2' };

  beforeEach(() => {
    machine = interpret(Connect4Machine).start();
  });

  describe('on join', () => {

    it('should allow a player to join if there are no players', () => {

      const machineState = makePlayerJoin(1, 'player1');

      expect(machineState.changed).toBeTruthy();
      expect(machineState.context.players).toEqual([ player1 ]);
    });

    it('should allow a player to join if there are only one player', () => {
      makePlayerJoin(1, 'player1');

      const machineState = makePlayerJoin(2, 'player2');

      expect(machineState.changed).toBeTruthy();
      expect(machineState.context.players).toEqual([ player1, player2 ]);
    });

    it('should not allow a player to join twice', () => {
      makePlayerJoin(1, 'player1');

      const machineState = makePlayerJoin(1, 'player1');

      expect(machineState.changed).toBeFalsy();
      expect(machineState.context.players).toEqual([ player1 ]);
    });

    it('should not allow a player to join if there are already two players', () => {
      makePlayerJoin(1, 'player1');
      makePlayerJoin(2, 'player2');

      const machineState = makePlayerJoin(3, 'player3');

      expect(machineState.changed).toBeFalsy();
      expect(machineState.context.players).toEqual([ player1, player2 ]);
    });
  });

  describe('on leave', () => {

    it('should allow a player to leave if he\'s in the game', () => {
      makePlayerJoin(1, 'player1');
      makePlayerJoin(2, 'player2');

      const machineState = makePlayerLeave(1);

      expect(machineState.changed).toBeTruthy();
      expect(machineState.context.players).toEqual([ player2 ]);
    });

    it('should not allow a player to leave if he\'s not in the game', () => {

      const machineState = makePlayerLeave(17);

      expect(machineState.changed).toBeFalsy();
      expect(machineState.context.players).toEqual([]);
    });
  });

  describe('on chooseColor', () => {

    const PINK = PlayerColor.PINK;
    const GREEN = PlayerColor.GREEN;

    it('should allow a player to choose a color if he\'s in the game', () => {
      makePlayerJoin(1, 'player1');

      const machineState = makePlayerChooseColor(1, PINK);

      expect(machineState.changed).toBeTruthy();
      expect(machineState.context.players).toEqual([ getPlayerWithColor(1, PINK) ]);
    });

    it('should allow the second player to choose a difference color than the first player', () => {
      makePlayerJoin(1, 'player1');
      makePlayerChooseColor(1, PINK);
      makePlayerJoin(2, 'player2');

      const machineState = makePlayerChooseColor(2, GREEN);

      expect(machineState.changed).toBeTruthy();
      expect(machineState.context.players).toEqual([
        getPlayerWithColor(1, PINK),
        getPlayerWithColor(2, GREEN)
      ]);
    });

    it('should allow a player to change his color', () => {
      makePlayerJoin(1, 'player1');
      makePlayerChooseColor(1, PINK);

      const machineState = makePlayerChooseColor(1, GREEN);

      expect(machineState.changed).toBeTruthy();
      expect(machineState.context.players).toEqual([ getPlayerWithColor(1, GREEN) ]);
    });

    it('should not allow a player to choose a color if he\'s not in the game', () => {

      const machineState = makePlayerChooseColor(17, PINK);

      expect(machineState.changed).toBeFalsy();
      expect(machineState.context.players).toEqual([]);
    });

    it('should not allow a player to choose a color if this color is not available', () => {
      makePlayerJoin(1, 'player1');
      makePlayerJoin(2, 'player2');
      makePlayerChooseColor(1, PINK);

      const machineState = makePlayerChooseColor(2, PINK);

      expect(machineState.changed).toBeFalsy();
      expect(machineState.context.players).toEqual([
        getPlayerWithColor(1, PINK),
        player2
      ]);
    });
  });

  function makePlayerJoin(playerId: Player['id'], name: Player['name']) {
    const joinEvent = Connect4Model.events.join(playerId, name);
    return machine.send(joinEvent);
  }

  function makePlayerLeave(playerId: Player['id']) {
    const leaveEvent = Connect4Model.events.leave(playerId);
    return machine.send(leaveEvent);
  }

  function makePlayerChooseColor(playerId: Player['id'], color: PlayerColor) {
    const chooseColorEvent = Connect4Model.events.chooseColor(playerId, color);
    return machine.send(chooseColorEvent);
  }

  function getPlayerWithColor(playerId: Player['id'], color: PlayerColor) {
    return playerId === 1 ? { ...player1, color } : { ...player2, color };
  }
});
