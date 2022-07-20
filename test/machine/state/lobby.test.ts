import {beforeEach, describe, expect, it} from 'vitest';
import {interpret, InterpreterFrom} from 'xstate';
import MachineModel from '../../../src/state/MachineModel';
import StateMachine from '../../../src/state/StateMachine';
import {Player, PlayerColor, State} from '../../../src/types';

describe('lobby', () => {

  let machine: InterpreterFrom<typeof StateMachine>;

  const player1 = {id: 1, name: 'player1'};
  const player2 = {id: 2, name: 'player2'};

  const PINK = PlayerColor.PINK;
  const GREEN = PlayerColor.GREEN;

  beforeEach(() => {
    machine = interpret(StateMachine).start();
  });

  describe('on join', () => {

    it('should allow a player to join if there are no players', () => {

      const machineState = makePlayerJoin(player1.id, 'player1');

      expect(machineState.changed).toBeTruthy();
      expect(machineState.context.players).toEqual([ player1 ]);
    });

    it('should allow a player to join if there are only one player', () => {
      makePlayerJoin(player1.id, 'player1');

      const machineState = makePlayerJoin(player2.id, 'player2');

      expect(machineState.changed).toBeTruthy();
      expect(machineState.context.players).toEqual([ player1, player2 ]);
    });

    it('should not allow a player to join twice', () => {
      makePlayerJoin(player1.id, 'player1');

      const machineState = makePlayerJoin(player1.id, 'player1');

      expect(machineState.changed).toBeFalsy();
    });

    it('should not allow a player to join if there are already two players', () => {
      makePlayerJoin(player1.id, 'player1');
      makePlayerJoin(player2.id, 'player2');

      const machineState = makePlayerJoin(3, 'player3');

      expect(machineState.changed).toBeFalsy();
    });
  });

  describe('on leave', () => {

    it('should allow a player to leave if he\'s in the game', () => {
      makePlayerJoin(player1.id, 'player1');
      makePlayerJoin(player2.id, 'player2');

      const machineState = makePlayerLeave(player1.id);

      expect(machineState.changed).toBeTruthy();
      expect(machineState.context.players).toEqual([ player2 ]);
    });

    it('should not allow a player to leave if he\'s not in the game', () => {

      const machineState = makePlayerLeave(17);

      expect(machineState.changed).toBeFalsy();
    });
  });

  describe('on chooseColor', () => {

    it('should allow a player to choose a color if he\'s in the game', () => {
      makePlayerJoin(player1.id, 'player1');

      const machineState = makePlayerChooseColor(player1.id, PINK);

      expect(machineState.changed).toBeTruthy();
      expect(machineState.context.players).toEqual([ getPlayerWithColor(player1.id, PINK) ]);
    });

    it('should allow the second player to choose a difference color than the first player', () => {
      makePlayerJoin(player1.id, 'player1');
      makePlayerChooseColor(player1.id, PINK);
      makePlayerJoin(player2.id, 'player2');

      const machineState = makePlayerChooseColor(player2.id, GREEN);

      expect(machineState.changed).toBeTruthy();
      expect(machineState.context.players).toEqual([
        getPlayerWithColor(player1.id, PINK),
        getPlayerWithColor(player2.id, GREEN)
      ]);
    });

    it('should allow a player to change his color', () => {
      makePlayerJoin(player1.id, 'player1');
      makePlayerChooseColor(player1.id, PINK);

      const machineState = makePlayerChooseColor(player1.id, GREEN);

      expect(machineState.changed).toBeTruthy();
      expect(machineState.context.players).toEqual([ getPlayerWithColor(player1.id, GREEN) ]);
    });

    it('should not allow a player to choose a color if he\'s not in the game', () => {

      const machineState = makePlayerChooseColor(17, PINK);

      expect(machineState.changed).toBeFalsy();
    });

    it('should not allow a player to choose a color if this color is not available', () => {
      makePlayerJoin(player1.id, 'player1');
      makePlayerJoin(player2.id, 'player2');
      makePlayerChooseColor(player1.id, PINK);

      const machineState = makePlayerChooseColor(player2.id, PINK);

      expect(machineState.changed).toBeFalsy();
    });
  });

  describe('on start', () => {

    it('should allow a player in the lobby to start the game if they are two and have chosen a color', () => {
      makePlayerJoin(player1.id, 'player1');
      makePlayerChooseColor(player1.id, PINK);
      makePlayerJoin(player2.id, 'player2');
      makePlayerChooseColor(player2.id, GREEN);
      const expectedCurrentPlayer = getPlayerWithColor(player2.id, GREEN);

      const machineState = makePlayerStart(player2.id);

      expect(machineState.changed).toBeTruthy();
      expect(machineState.context.currentPlayer).toEqual(expectedCurrentPlayer);
      expect(machine.state.value).toBe(State.PLAY);
    });

    it('should not allow a player to start the game if he\'s not in the game', () => {

      const machineState = makePlayerStart(17);

      expect(machineState.changed).toBeFalsy();
    });

    it('should not allow a player to start if there is not 2 players with a color', () => {
      makePlayerJoin(player1.id, 'player1');
      makePlayerChooseColor(player1.id, PINK);
      makePlayerJoin(player2.id, 'player2');

      const machineState = makePlayerStart(player1.id);

      expect(machineState.changed).toBeFalsy();
    });
  });

  function makePlayerJoin(playerId: Player['id'], name: Player['name']) {
    const joinEvent = MachineModel.events.join(playerId, name);
    return machine.send(joinEvent);
  }

  function makePlayerLeave(playerId: Player['id']) {
    const leaveEvent = MachineModel.events.leave(playerId);
    return machine.send(leaveEvent);
  }

  function makePlayerChooseColor(playerId: Player['id'], color: PlayerColor) {
    const chooseColorEvent = MachineModel.events.chooseColor(playerId, color);
    return machine.send(chooseColorEvent);
  }

  function makePlayerStart(playerId: Player['id']) {
    const startEvent = MachineModel.events.start(playerId);
    return machine.send(startEvent);
  }

  function getPlayerWithColor(playerId: Player['id'], color: PlayerColor) {
    return playerId === 1 ? { ...player1, color } : { ...player2, color };
  }
});
