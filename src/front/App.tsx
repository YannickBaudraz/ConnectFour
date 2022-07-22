import {useGame} from './hooks/useGame';
import {State} from '../types';
import {LobbyState} from './states/LobbyState';
import {PlayState} from './states/PlayState';
import {Game} from './components/Game';
import {CSSTransition} from 'react-transition-group';
import styled from 'styled-components';
import {VictoryState} from './states/VictoryState';
import {DrawState} from './states/DrawState';

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
          <LobbyState/>
        </CSSTransition>

        <CSSTransition
            in={state === State.PLAY}
            timeout={300}
            classNames="element"
            unmountOnExit
        >
          <PlayState/>
        </CSSTransition>

        <CSSTransition
            in={state === State.VICTORY}
            timeout={300}
            classNames="element"
            mountOnEnter
            unmountOnExit
        >
          <VictoryState/>
        </CSSTransition>

        <CSSTransition
            in={state === State.DRAW}
            timeout={300}
            classNames="element"
            unmountOnExit
        >
          <DrawState/>
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
