import React, { useState } from 'react';
import { GameStateProps } from './models/models';

import Navigation from './components/Navigation/Navigation';
import Quote from './components/Quote/Quote';
import Question from './components/Quiz';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameStateProps>({ mode: 'not-playing' });

  const gameStateHandler = (mode: string) => {
    setGameState((prevState) => ({ ...prevState, mode }));
  };

  return (
    <div className="wrapper">
      <Navigation
        gameState={gameState}
        gameStateHandler={gameStateHandler}
      />
      {gameState.mode === 'not-playing' && <Quote />}
      {gameState.mode === 'playing' && <Question />}
    </div>
  );
};

export default App;
