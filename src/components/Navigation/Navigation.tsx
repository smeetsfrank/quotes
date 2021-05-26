import React, { useState } from 'react';
import { GameStateProps } from '../../models/models';

import classes from './Navigation.module.scss';

type Props = {
  gameState: GameStateProps;
  gameStateHandler: (mode: string) => void;
}

const Navigation: React.FC<Props> = ({
  gameState, gameStateHandler,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleNavigationHandler = () => {
    setIsOpen(!isOpen);
  };

  const gameModeHandler = () => {
    switch (gameState.mode) {
      case 'playing':
        gameStateHandler('not-playing');
        break;
      case 'not-playing':
        gameStateHandler('playing');
        break;
      default:
    }
    setIsOpen(false);
  };

  return (
    <>
      <button className={`${classes.trigger} ${isOpen && classes.open}`} type="button" onClick={toggleNavigationHandler}>
        <div className={classes['nav-icon']}>
          <div />
        </div>

      </button>
      <nav className={`${classes['main-navigation']} ${isOpen && classes.open}`}>
        <ul>
          {gameState.mode !== 'playing'
          && (
            <li><button type="button" onClick={gameModeHandler}>Start the quiz</button></li>
          )}
          {gameState.mode === 'playing'
          && <li><button type="button" onClick={gameModeHandler}>Stop the quiz</button></li>}
        </ul>
      </nav>

    </>
  );
};

export default Navigation;
