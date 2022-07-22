import {Draw} from '../components/Draw';
import {useGame} from '../hooks/useGame';

type DrawStateProps = {}

export function DrawState({}: DrawStateProps) {
  const {send} = useGame();

  return (
      <div>
        <Draw onRestart={() => send({type: 'restart'})}/>
      </div>
  );
}
