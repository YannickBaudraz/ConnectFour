import {Context, Events, State} from '../../types';
import {createContext, PropsWithChildren, useContext} from 'react';
import {useMachine} from '@xstate/react';
import StateMachine from '../../state/StateMachine';

type GameContextType = {
  state: State,
  context: Context,
  send: (event: Events) => void,
  can: (event: Events) => boolean
}

const GameContext = createContext<GameContextType>({} as GameContextType);

export function useGame(): GameContextType {
  return useContext(GameContext);
}

export function GameContextProvider({children}: PropsWithChildren) {
  const [state, send] = useMachine(StateMachine);

  return (
      <GameContext.Provider
          value={{
            state: state.value as State,
            context: state.context,
            send,
            can: () => false
          }}
      >
        {children}
      </GameContext.Provider>
  );
}
