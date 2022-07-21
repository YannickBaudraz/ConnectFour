import {beforeEach, describe, expect, it} from 'vitest';
import {InterpreterFrom} from 'xstate';
import MachineModel from '../../../src/state/MachineModel';
import StateMachine from '../../../src/state/StateMachine';
import {Context, Player, State} from '../../../src/types';
import {
  fakeGridForDiagonalBackwardDownLine,
  fakeGridForDiagonalBackwardUpLine,
  fakeGridForDiagonalForwardDownLine,
  fakeGridForDiagonalForwardUpLine,
  fakeGridForVerticalLine,
  makeFakeContext,
  makeFakeMachine
} from './state-test-helper';

describe('play', () => {
  let context: Context;
  let machine: InterpreterFrom<typeof StateMachine>;
  let player1: Player;
  let player2: Player;

  beforeEach(() => {
    context = makeFakeContext();
    machine = makeFakeMachine(State.PLAY, context);
    player1 = context.players[0];
    player2 = context.players[1];
  });

  it('should allow a player to drop a pawn', () => {
    const event = MachineModel.events.dropPawn(player1.id, 0);

    const machineState = machine.send(event);

    expect(true).toBeTruthy();
    expect(machineState.context.grid[5][0]).toBe(player1.color);
    expect(machineState.context.currentPlayer).toBe(player2);
  });

  it('should let a player win with an horizontal forward line', () => {
    machine.machine.context.currentPlayer = player2;
    const event = MachineModel.events.dropPawn(player2.id, 1);

    const machineState = machine.send(event);

    expect(machineState.context.grid[5][1]).toBe(player2.color);
    expectVictory(machineState, context);
  });

  it('should let a player win with an horizontal backward line', () => {
    machine.machine.context.currentPlayer = player2;
    const event = MachineModel.events.dropPawn(player2.id, 5);

    const machineState = machine.send(event);

    expect(machineState.context.grid[5][5]).toBe(player2.color);
    expectVictory(machineState, context);
  });

  it('should let a player win with a vertical forward line', () => {
    machine.state.context.grid = fakeGridForVerticalLine;
    const event = MachineModel.events.dropPawn(player1.id, 1);

    const machineState = machine.send(event);

    expect(machineState.context.grid[3][1]).toBe(player1.color);
    expectVictory(machineState, context);
  });

  it('should let a player win with a diagonal forward up line', () => {
    machine.state.context.grid = fakeGridForDiagonalForwardUpLine;
    const event = MachineModel.events.dropPawn(player1.id, 1);

    const machineState = machine.send(event);

    expect(machineState.context.grid[5][1]).toBe(player1.color);
    expectVictory(machineState, context);
  });

  it('should let a player win with a diagonal forward down line', () => {
    machine.state.context.grid = fakeGridForDiagonalForwardDownLine;
    const event = MachineModel.events.dropPawn(player1.id, 1);

    const machineState = machine.send(event);

    expect(machineState.context.grid[2][1]).toBe(player1.color);
    expectVictory(machineState, context);
  });

  it('should let a player win with a diagonal backward up line', () => {
    machine.state.context.grid = fakeGridForDiagonalBackwardUpLine;
    const event = MachineModel.events.dropPawn(player1.id, 4);

    const machineState = machine.send(event);

    expect(machineState.context.grid[5][4]).toBe(player1.color);
    expectVictory(machineState, context);
  });

  it('should let a player win with a diagonal backward down line', () => {
    machine.state.context.grid = fakeGridForDiagonalBackwardDownLine;
    const event = MachineModel.events.dropPawn(player1.id, 4);

    const machineState = machine.send(event);

    expect(machineState.context.grid[2][4]).toBe(player1.color);
    expectVictory(machineState, context);
  });

  it('should not allow a player to drop a pawn when a column is full', () => {
    const event = MachineModel.events.dropPawn(player1.id, 6);

    const machineState = machine.send(event);

    expect(machineState.changed).toBeFalsy();
    expect(machineState.context.currentPlayer).toBe(player1);
  });

  function expectVictory(machineState: typeof machine.state, context: Context) {
    expect(machineState.changed).toBeTruthy();
    expect(machineState.value).toBe(State.VICTORY);
    expect(machineState.context.winingLine).toHaveLength(context.lengthToWin);
  }
});
