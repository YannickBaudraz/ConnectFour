import styled from 'styled-components';
import {useGame} from './hooks/useGame';
import {State} from '../types';
import {Lobby} from './screens/Lobby';

function App() {
  const {state} = useGame();

  return (
      <Container>
        <MainTitle>Puissance 4 - LE jeu</MainTitle>

        {state === State.LOBBY && <Lobby/>}
      </Container>
  );
}

const Container = styled.main`
  max-width: 960px;
  margin: 0 auto;
`;

const MainTitle = styled.h1`
  text-align: center;
`;

export default App;
