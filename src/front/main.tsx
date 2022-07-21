import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/index.css';
import {GameContextProvider} from './hooks/useGame';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
      <GameContextProvider>
        <App/>
      </GameContextProvider>
    </React.StrictMode>
);
