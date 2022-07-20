import React from 'react';
import styled from 'styled-components';
import { Player } from '../../types';
import { Button, Disc } from '../styles';

type VictoryProps = {
  player: Player,
  onRestart?: () => void
}

export function Victory({ player, onRestart }: VictoryProps) {
  function handleRestart(event: React.MouseEvent) {
    event.preventDefault();
    onRestart?.();
  }

  return (
      <Container>
        <Title>
          {player.name} a gagné ! <Disc diameter={1} color={player.color}/>
        </Title>
        <Button
            color={player.color}
            onClick={handleRestart}
        >
          Rejouer
        </Button>
      </Container>
  );
}

const Container = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h2`
  display: flex;
  justify-content: center;
  gap: .5rem;
`;
