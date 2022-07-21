import styled from 'styled-components';
import {Player, PlayerColor} from '../../types';
import {Disc} from '../styles';
import {useGame} from '../hooks/useGame';
import {CSSTransition} from 'react-transition-group';

type ColorSelectorProps = {
  onSelect: (color: PlayerColor) => void;
  players: Player[],
  colors: PlayerColor[],
}

export function ColorSelector({onSelect, players, colors}: ColorSelectorProps) {
  const {context} = useGame();

  return (
      <article>
        <h2>Joueurs</h2>
        <Players>
          {players.map(player =>
              <PlayerElement
                  key={player.id}
              >
                {player.name}
                <CSSTransition
                    in={!!player.color}
                    timeout={300}
                    classNames="element"
                    unmountOnExit
                >
                  <Disc diameter={1.5}
                        color={player.color}
                  />
                </CSSTransition>
              </PlayerElement>
          )}
        </Players>
        {stillColorAvailable() && (
            <>
              <h3>Sélectionne une couleur</h3>
              <Buttons>
                {colors.map(color =>
                    <CSSTransition
                        key={color}
                        in={isColorAvailable(color)}
                        timeout={300}
                        classNames="element"
                        unmountOnExit
                    >
                      <ChooseColorButton
                          as="button"
                          onClick={() => onSelect(color)}
                          diameter={1.5}
                          color={color}
                          aria-label={`Sélectionner la couleur ${color}`}
                      />
                    </CSSTransition>
                )}
              </Buttons>
            </>
        )}
      </article>
  );

  function stillColorAvailable() {
    return context.players.some(player => player.color == undefined);
  }

  function isColorAvailable(color: PlayerColor) {
    return players.every(player => player.color !== color);
  }
}

const Players = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const PlayerElement = styled.div`
  display: flex;
  align-items: center;
  gap: .5rem;
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
