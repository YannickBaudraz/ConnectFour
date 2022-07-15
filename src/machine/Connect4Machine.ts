import { createModel } from 'xstate/lib/model';
import { Connect4Grid, Player } from '../types';

export const Connect4Model = createModel({
  players: [] as Player[],
  currentPlayer: null as null | Player['id'],
  rowLength: 4,
  grid: [
    [ 'E', 'E', 'E', 'E', 'E', 'E', 'E' ],
    [ 'E', 'E', 'E', 'E', 'E', 'E', 'E' ],
    [ 'E', 'E', 'E', 'E', 'E', 'E', 'E' ],
    [ 'E', 'E', 'E', 'E', 'E', 'E', 'E' ],
    [ 'E', 'E', 'E', 'E', 'E', 'E', 'E' ],
    [ 'E', 'E', 'E', 'E', 'E', 'E', 'E' ]
  ] as Connect4Grid
});
