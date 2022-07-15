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
}, {
  events: {
    join: (playerId: Player['id'], name: Player['name']) => ({ playerId, name }),
    leave: (playerId: Player['id']) => ({ playerId }),
    chooseColor: (playerId: Player['id'], color: Player['color']) => ({ playerId, color }),
    start: (playerId: Player['id']) => ({ playerId }),
    dropPawn: (playerId: Player['id'], row: number) => ({ playerId, row }),
    restart: (playerId: Player['id']) => ({ playerId })
  }
});
