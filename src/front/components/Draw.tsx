import styled from 'styled-components';
import {Button} from '../styles';
import React from 'react';

type DrawProps = {
  onRestart?: () => void
}

export function Draw({onRestart}: DrawProps) {
  function handleRestart(event: React.MouseEvent) {
    event.preventDefault();
    onRestart?.();
  }

  return (
      <Container>
        <Title>
          Il n'y en a pas un pour rattraper l'autre...
        </Title>
        <Button onClick={handleRestart}>
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
