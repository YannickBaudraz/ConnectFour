import {createModel} from 'xstate/lib/model';
import {Grid, Player, PlayerColor, Position} from '../types';

const MachineModel = createModel({
  players: [] as Player[],
  currentPlayer: null as null | Player,
  lengthToWin: 4,
  winingLine: [] as Position[],
  grid: [
    ['E', 'E', 'E', 'E', 'E', 'E', 'E'],
    ['E', 'E', 'E', 'E', 'E', 'E', 'E'],
    ['E', 'E', 'E', 'E', 'E', 'E', 'E'],
    ['E', 'E', 'E', 'E', 'E', 'E', 'E'],
    ['E', 'E', 'E', 'E', 'E', 'E', 'E'],
    ['E', 'E', 'E', 'E', 'E', 'E', 'E']
  ] as Grid
}, {
  events: {
    join: (playerId: Player['id'], name: Player['name']) => ({playerId, name}),
    leave: (playerId: Player['id']) => ({playerId}),
    chooseColor: (playerId: Player['id'], color: PlayerColor) => ({playerId, color}),
    start: (playerId: Player['id']) => ({playerId}),

    dropPawn: (playerId: Player['id'], xPos: number) => ({playerId, xPos}),

    restart: (playerId: Player['id']) => ({playerId})
  }
});

export default MachineModel;
