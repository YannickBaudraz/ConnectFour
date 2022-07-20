import styled from 'styled-components';
import {PlayerColor} from '../types';
import {ColorSelector} from './components/ColorSelector';
import {Game} from './components/Game';
import {NameSelector} from './components/NameSelector';

function App() {
  return (
      <Container className="container">
        <MainTitle>Connect Four - THE game</MainTitle>

        <NameSelector onSelect={() => null}/>

        <hr/>

        <ColorSelector
            onSelect={() => null}
            players={[
              {id: 1, name: 'John', color: PlayerColor.PINK},
              {id: 2, name: 'Jane', color: PlayerColor.GREEN}
            ]} colors={Object.values(PlayerColor)}
        />

        <hr/>

        <Game
            currentColor={PlayerColor.GREEN}
            onDrop={console.log}
            grid={[
              ['E', 'E', 'E', 'E', 'E', 'E', 'E'],
              ['E', 'E', 'E', 'E', 'E', 'E', 'E'],
              ['E', 'E', 'E', 'E', 'E', 'E', 'E'],
              ['E', PlayerColor.PINK, 'E', 'E', 'E', 'E', 'E'],
              ['E', PlayerColor.PINK, 'E', 'E', 'E', 'E', 'E'],
              ['E', PlayerColor.PINK, 'E', 'E', PlayerColor.GREEN, 'E', PlayerColor.GREEN]
            ]}
        />
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
