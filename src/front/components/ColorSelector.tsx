import Color from 'color';
import styled from 'styled-components';
import { Player, PlayerColor } from '../../types';

type ColorSelectorProps = {
  onSelect: (color: PlayerColor) => void;
  players: Player[],
  colors: PlayerColor[],
}

export function ColorSelector({ onSelect, players, colors }: ColorSelectorProps) {
  return (
      <>
        <Players>
          {players.map(player =>
              <PlayerComponent
                  key={player.id}>
                {player.name}
                {player.color && <Disc color={player.color}/>}
              </PlayerComponent>
          )}
        </Players>
        <h3>Sélectionne une couleur</h3>
        <Buttons>
          {colors.map(color =>
              <ChooseColorButton
                  as="button"
                  key={color}
                  onClick={() => onSelect(color)}
                  color={color}
              />
          )}
        </Buttons>
      </>
  );
}

const Players = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const PlayerComponent = styled.div`
  display: flex;
  align-items: center;
  gap: .2rem;
`;

const Disc = styled.div`
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 100%;
  background-color: ${props => props.color || 'black'};
  box-shadow: inset 0 0 0 3px ${props => props.color && Color(props.color).darken(0.3).hex() || 'white'};
  border: solid 3px ${props => props.color || 'black'};
  outline: solid 1px ${props => props.color && Color(props.color).darken(0.3).hex() || 'white'};
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
