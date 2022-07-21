import {Context, Event, Events, State} from '../../types';
import {createContext, PropsWithChildren, useContext} from 'react';
import {useMachine} from '@xstate/react';
import StateMachine from '../../state/StateMachine';

type GameContextType = {
  state: State,
  context: Context,
  send: <T extends Events['type']>(event: { type: T, playerId?: number } & Omit<Event<T>, 'playerId'>) => void,
  can: <T extends Events['type']>(event: { type: T, playerId?: number } & Omit<Event<T>, 'playerId'>) => boolean,
}

const GameContext = createContext<GameContextType>({} as GameContextType);

export function useGame(): GameContextType {
  return useContext(GameContext);
}

export function GameContextProvider({children}: PropsWithChildren) {
  const [state, send] = useMachine(StateMachine);
  const playerId = state.context.currentPlayer?.id;

  return (
      <GameContext.Provider
          value={{
            state: state.value as State,
            context: state.context,
            send: (event) => send({playerId, ...event} as Events),
            can: (event) => !!StateMachine.transition(state, {playerId, ...event} as Events).changed
          }}
      >
        {children}
      </GameContext.Provider>
  );
}
