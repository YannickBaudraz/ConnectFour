import Color from 'color';
import React from 'react';
import styled, { css, keyframes } from 'styled-components';
import { Grid, PlayerColor } from '../../types';
import { Disc } from '../styles';
import { GameInfo } from './GameInfo';
import { Victory } from './Victory';

type GridProps = {
  grid: Grid
  currentColor?: PlayerColor
  onDrop?: (x: number) => void
}

export function Game({ grid, currentColor, onDrop }: GridProps) {
  function handleDrop(x: number, event: React.MouseEvent) {
    event.preventDefault();
    onDrop?.(x);
  }

  return (
      <article>
        <Title>
          Connect Four
        </Title>

        <GameInfo player={{ id: 2, name: 'Laurine', color: PlayerColor.PINK }}/>

        <Victory player={{ id: 2, name: 'Laurine', color: PlayerColor.PINK }}/>

        <GridElement grid={grid}>
          {grid.map((row, y) => row.map((color, x) =>
              <Cell key={`${x}-${y}`}
                    color={color !== 'E' ? color : undefined}
                    diameter={5}
                    y={y}
              />
          ))}
          {currentColor && onDrop &&
              <Columns>
                {grid[0].map((_, x) =>
                    <Column key={x}
                            onClick={event => handleDrop(x, event)}
                            aria-label={`Déposer dans la colonne ${x + 1}`}
                    >
                      <Disc diameter={5}
                            color={currentColor}
                      />
                    </Column>)}
              </Columns>
          }
        </GridElement>
      </article>
  );
}

const Title = styled.h2`
  text-align: center;
`;

const GridElement = styled.div<{ grid: Grid }>`
  --rows: ${props => props.grid.length};
  --cols: ${props => props.grid[0].length};

  position: relative;
  display: grid;
  grid-template-rows: repeat(var(--rows), 1fr);
  grid-template-columns: repeat(var(--cols), 1fr);
  aspect-ratio: var(--cols) / var(--rows);
  place-items: center;
  place-content: center;
  background: radial-gradient(circle, transparent, transparent 49%, ${Color('lightpink').darken(
          .05).string()} 51%, ${Color('lightpink').darken(.05).string()} 60%, lightpink 70%);
  background-size: calc(100% / var(--cols)) calc(100% / var(--rows));
  border: .6rem solid ${Color('lightpink').darken(.05).string()};
  border-radius: .3rem;
  margin-top: calc(100% / var(--rows));

  && ${Disc} {
    width: 60%;
  }
`;

const Cell = styled(Disc)<{ y: number }>(props => {
  const Drop = keyframes`
    from {
      transform: translateY(calc(-202% * ${props.y}));
    }
  `;

  return css`
    animation: ${Drop} calc(.13s * ${props.y}) linear both;
    z-index: -1;
  `;
});

const Columns = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: flex-end;
`;

const Column = styled.button`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  height: calc(96% + 100% / var(--rows));
  border: none;
  background: none;
  padding: 0;
  cursor: grab;

  &&:active {
    cursor: grabbing;
  }

  && ${Disc} {
    opacity: 0;
    transform: translateY(0rem);
    transition: none;
    z-index: -1;
  }

  &&:hover ${Disc} {
    opacity: 1;
    transform: translateY(2.5rem);
    transition: opacity 0s ease-in, transform .2s cubic-bezier(0, 1, 1, 1);
  }

  &&:active ${Disc} {
    transform: translateY(3rem);
  }
`;
