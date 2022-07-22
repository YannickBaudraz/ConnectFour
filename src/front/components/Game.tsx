import Color from 'color';
import React from 'react';
import styled, {css, keyframes} from 'styled-components';
import {Grid, PlayerColor} from '../../types';
import {Disc} from '../styles';
import {useGame} from '../hooks/useGame';

type GridProps = {
  grid: Grid
  currentColor?: PlayerColor
  onDrop?: (x: number) => void
}

export function Game({grid, currentColor, onDrop}: GridProps) {
  const game = useGame();

  return (
      <article>
        <Title>
          Grille de jeu
        </Title>

        <GridElement grid={grid}>
          {grid.map((row, y) => row.map((color, x) => color === 'E'
              ? <Disc key={`${x}-${y}`}
                      color={undefined}
                      diameter={5}/>
              : isWining(x, y)
                  ? <WiningCell key={`${x}-${y}`}
                                color={color}
                                diameter={5}
                                y={y}/>
                  : <Cell key={`${x}-${y}`}
                          color={color}
                          diameter={5}
                          y={y}/>
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

  function handleDrop(x: number, event: React.MouseEvent) {
    event.preventDefault();
    onDrop?.(x);
  }

  function isWining(x: number, y: number) {
    return game.context.winingLine.some(position => position.x === x && position.y === y);
  }
}

const Title = styled.h2`
  text-align: center;
`;

const gradientColor = Color('lightpink').darken(.1).string();
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
  background: radial-gradient(circle,
  transparent, transparent 49%, ${gradientColor} 51%, ${gradientColor} 57.5%, lightpink 50%);
  background-size: calc(100% / var(--cols)) calc(100% / var(--rows));
  border: .6rem solid ${Color('lightpink').darken(.05).string()};
  border-radius: .3rem;
  margin-top: calc(75% / var(--rows));

  && ${Disc} {
    width: 60%;
  }
`;

const Cell = styled(Disc)<{ y: number }>(props => {
  const Drop = keyframes`
    from {
      transform: translateY(calc(-150% * ${props.y}));
    }
  `;

  return css`
    animation: ${Drop} calc(.2s * ${props.y}) linear both;
    z-index: -1;
  `;
});

const WiningCell = styled(Cell)`
  outline: solid var(--style-size) ${props => Color(props.color).lighten(0.5).hex()};
  box-shadow: inset 0 0 0 var(--style-size) ${props => Color(props.color).lighten(0.5).hex()};
`;

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
    z-index: -2;
  }

  &&:active ${Disc} {
    transform: translateY(3rem);
  }
`;
