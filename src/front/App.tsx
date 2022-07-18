import { PlayerColor } from '../types';
import { ColorSelector } from './components/ColorSelector';
import { NameSelector } from './components/NameSelector';

function App() {
  return (
      <div className="container">
        <NameSelector onSelect={() => null}/>
        <hr/>
        <ColorSelector onSelect={() => null} players={[
          { id: 1, name: 'John', color: PlayerColor.PINK },
          { id: 2, name: 'Jane', color: PlayerColor.GREEN }
        ]} colors={Object.values(PlayerColor)}/>
      </div>
  );
}

export default App;
