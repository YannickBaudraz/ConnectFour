import styled from 'styled-components';
import { Player } from '../../types';
import { Disc } from '../styles';

type GameInfoProps = {
  player: Player
}

export function GameInfo({ player }: GameInfoProps) {
  return (
      <section>
        <Title>
          {player.name} joue stp ! <Disc diameter={1} color={player.color}/>
        </Title>
      </section>
  );
}

const Title = styled.h2`
  display: flex;
  justify-content: center;
  gap: .5rem;
`;
