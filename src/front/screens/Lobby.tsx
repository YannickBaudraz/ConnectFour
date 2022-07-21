import {NameSelector} from '../components/NameSelector';
import {useGame} from '../hooks/useGame';
import {ColorSelector} from '../components/ColorSelector';
import {PlayerColor} from '../../types';
import {Button} from '../styles';
import {CSSTransition} from 'react-transition-group';

type LobbyProps = {}

export function Lobby({}: LobbyProps) {
  const {send, context, can} = useGame();

  return (
      <section>
        <NameSelector onSelect={join}/>

        <ColorSelector onSelect={chooseColor}
                       players={context.players}
                       colors={Object.values(PlayerColor)}
        />

        <CSSTransition
            in={canStart()}
            timeout={1000}
            classNames="element"
            mountOnEnter
        >
          <p>
            <Button onClick={start}>
              JE VEUX JOUER !
            </Button>
          </p>
        </CSSTransition>
      </section>
  );

  function join(name: string) {
    send({
      type: 'join',
      name: name,
      playerId: name === 'yannick' ? 1 : 2
    });
  }

  function chooseColor(color: PlayerColor) {
    send({type: 'chooseColor', color, playerId: color === PlayerColor.PINK ? 1 : 2});
  }

  function start() {
    send({type: 'start', playerId: 1});
  }

  function canStart() {
    return can({type: 'start', playerId: 1});
  }
}
