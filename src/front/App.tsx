import {useGame} from './hooks/useGame';
import {State} from '../types';
import {Lobby} from './screens/Lobby';
import {Play} from './screens/Play';
import {Game} from './components/Game';
import {CSSTransition} from 'react-transition-group';
import styled from 'styled-components';

function App() {
  const {state, context, send} = useGame();

  return (
      <Container>
        <MainTitle>Puissance 4 - LE jeu</MainTitle>

        <CSSTransition
            in={state === State.LOBBY}
            timeout={300}
            classNames="element"
            unmountOnExit
        >
          <Lobby/>
        </CSSTransition>

        <CSSTransition
            in={state === State.PLAY}
            timeout={300}
            classNames="element"
            unmountOnExit
        >
          <Play/>
        </CSSTransition>

        <CSSTransition
            in={state !== State.LOBBY}
            timeout={300}
            classNames="element"
            unmountOnExit
        >
          <Game grid={context.grid}
                onDrop={dropPawn}
                currentColor={canDropPawn() ? context.currentPlayer?.color : undefined}
          />
        </CSSTransition>
      </Container>
  );

  function dropPawn(x: number) {
    return canDropPawn() ? send({type: 'dropPawn', xPos: x}) : undefined;
  }

  function canDropPawn() {
    return state === State.PLAY;
  }
}

const Container = styled.main`
  max-width: 960px;
  margin: 0 auto;
`;

const MainTitle = styled.h1`
  text-align: center;
`;

export default App;
