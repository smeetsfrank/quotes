import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Navigation from './Navigation';

const gameState = { mode: 'not-playing' };
const gameStateHandler = () => undefined;

const navigationComponent = (
  <Navigation
    gameState={gameState}
    gameStateHandler={gameStateHandler}
  />
);
describe('Navigation', () => {
  test('Navigation button exsists', () => {
    render(navigationComponent);
    const trigger = screen.getByRole('button', { name: 'navigationToggle' });
    expect(trigger).toBeInTheDocument();
  });

  test('Navigation panel opens on click', async () => {
    render(navigationComponent);
    const trigger = screen.getByRole('button', { name: 'navigationToggle' });
    userEvent.click(trigger);

    const startQuiz = screen.getByText(/start the quiz/i);
    expect(startQuiz).toBeInTheDocument();
  });

  test('Navigation panel closes on click', async () => {
    render(navigationComponent);
    const trigger = screen.getByRole('button', { name: 'navigationToggle' });
    userEvent.click(trigger);

    const startQuiz = screen.getByText(/start the quiz/i);
    userEvent.click(trigger);
    expect(startQuiz).not.toBeInTheDocument();
  });
});
