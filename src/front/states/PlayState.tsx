import {useGame} from '../hooks/useGame';
import {GameInfo} from '../components/GameInfo';

type PlayProps = {}

export function PlayState({}: PlayProps) {
  const {context} = useGame();

  return (
      <>
        <GameInfo player={context.currentPlayer!}/>
      </>
  );
}
