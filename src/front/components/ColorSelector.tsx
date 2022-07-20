import styled from 'styled-components';
import { Player, PlayerColor } from '../../types';
import { Disc } from '../styles';

type ColorSelectorProps = {
  onSelect: (color: PlayerColor) => void;
  players: Player[],
  colors: PlayerColor[],
}

export function ColorSelector({ onSelect, players, colors }: ColorSelectorProps) {
  return (
      <article>
        <Players>
          {players.map(player =>
              <PlayerElement
                  key={player.id}
              >
                {player.name}
                {player.color &&
                    <Disc diameter={1.5}
                          color={player.color}
                    />}
              </PlayerElement>
          )}
        </Players>
        <h3>Sélectionne une couleur</h3>
        <Buttons>
          {colors.map(color =>
              <ChooseColorButton
                  as="button"
                  key={color}
                  onClick={() => onSelect(color)}
                  diameter={1.5}
                  color={color}
                  aria-label={`Sélectionner la couleur ${color}`}
              />
          )}
        </Buttons>
      </article>
  );
}

const Players = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const PlayerElement = styled.div`
  display: flex;
  align-items: center;
  gap: .2rem;
`;

const Buttons = styled.div`
  display: flex;
  gap: 1rem;
`;

const ChooseColorButton = styled(Disc)`
  ${Buttons} && {
    margin: 1rem;
    transform: scale(2);
  }
`;
