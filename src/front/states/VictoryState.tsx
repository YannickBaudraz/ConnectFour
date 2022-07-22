import {useGame} from '../hooks/useGame';
import {Victory} from '../components/Victory';

type VictoryProps = {}

export function VictoryState({}: VictoryProps) {
  const {context, send} = useGame();

  return (
      <>
        <Victory
            player={context.currentPlayer!}
            onRestart={() => send({type: 'restart'})}
        />
      </>
  );
}
