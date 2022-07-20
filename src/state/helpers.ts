import {Grid} from '../types';

export function getFreePositionY(grid: Grid, xPos: number) {
  for (let yPos = grid.length - 1; yPos >= 0; yPos--) {
    if (grid[yPos][xPos] === 'E') {
      return yPos;
    }
  }

  return -1;
}
