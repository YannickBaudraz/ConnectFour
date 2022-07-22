import {NameSelector} from '../components/NameSelector';
import {useGame} from '../hooks/useGame';
import {ColorSelector} from '../components/ColorSelector';
import {PlayerColor} from '../../types';
import {Button} from '../styles';
import {CSSTransition} from 'react-transition-group';

type LobbyProps = {}

export function LobbyState({}: LobbyProps) {
  const {send, context, can} = useGame();

  return (
      <section>
        <CSSTransition
            in={context.players.length < 2}
            timeout={300}
            classNames="element"
            mountOnEnter
            unmountOnExit
        >
          <NameSelector onSelect={join}/>
        </CSSTransition>

        <CSSTransition
            in={!!context.players.length}
            timeout={300}
            classNames="element"
            mountOnEnter
            unmountOnExit
        >
          <ColorSelector onSelect={chooseColor}
                         players={context.players}
                         colors={Object.values(PlayerColor)}
          />
        </CSSTransition>

        <CSSTransition
            in={canStart()}
            timeout={1000}
            classNames="element"
            mountOnEnter
            unmountOnExit
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
      playerId: context.players.length + 1
    });
  }

  function chooseColor(color: PlayerColor) {
    send({
      type: 'chooseColor',
      color,
      playerId: context.players.find(p => p.color == undefined)?.id
    });
  }

  function start() {
    send({type: 'start', playerId: context.players[0]?.id});
  }

  function canStart() {
    return can({type: 'start', playerId: context.players[0]?.id});
  }
}
