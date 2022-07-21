import {Grid, PlayerColor, Position} from '../types';

export function getFirstWinningLine(
    grid: Grid,
    position: Position,
    colorDropped: PlayerColor,
    lengthToWin: number
): Position[] {
  for (const direction of authorizedDirections) {
    const winingLine: Position[] = [position];

    for (let way of forwardAndBackward) {
      for (let positiveDelta = 1; positiveDelta < lengthToWin; positiveDelta++) {
        const nextLookingPosition = getNextPosition(position, positiveDelta * way, direction);
        if (!IsColorDropped(grid, nextLookingPosition, colorDropped)) break;
        winingLine.push(nextLookingPosition);
      }
    }

    if (winingLine.length >= lengthToWin)
      return winingLine;
  }

  return [];
}

const authorizedDirections = [
  {x: 1, y: 0},
  {x: 0, y: 1},
  {x: 1, y: 1},
  {x: 1, y: -1}
];

const forwardAndBackward = [1, -1];

function getNextPosition(currentPosition: Position, delta: number, direction: Position): Position {
  return {
    x: currentPosition.x + delta * direction.x,
    y: currentPosition.y + delta * direction.y
  };
}

function IsColorDropped(grid: Grid, position: Position, color: PlayerColor): boolean {
  return grid?.[position.y]?.[position.x] === color;
}
