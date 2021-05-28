import React from 'react';
import { render, screen } from '@testing-library/react';

import Score from './Score';

const quotes = [
  { id: 1, author: 'Person 1', quote: 'Ello' },
  { id: 2, author: 'Person 2', quote: 'Ello' },
  { id: 3, author: 'Person 3', quote: 'Ello' },
  { id: 4, author: 'Person 4', quote: 'Ello' },
  { id: 5, author: 'Person 5', quote: 'Ello' },
];

describe('Score Component', () => {
  test('0 correct answers', () => {
    const answers = [''];
    render(
      <Score answers={answers} quotes={quotes} />,
    );
    screen.getByText('Zero, Seriously?! Did i just create a whole fucking game just for you to guess zero correct answers? IT EVEN IS MULTIPLE CHOICE!! The fuck is wrong with you?');
  });
  test('1 correct answer', () => {
    const answers = ['1'];
    const oneCorrect = [
      {
        id: 1, author: 'Person 1', quote: 'Ello',
      },
    ];
    render(<Score answers={answers} quotes={oneCorrect} />);
    screen.getByText('Just one? Ok.. Fine.. What evs');
  });
  test('2 correct answers', () => {
    const answers = ['1', '2'];
    render(<Score answers={answers} quotes={quotes} />);
    screen.getByText('Just two? I mean.. You can do better, right?');
  });
  test('3 correct answers', () => {
    const answers = ['1', '2', '3'];
    render(<Score answers={answers} quotes={quotes} />);
    screen.getByText('There you go! Three correct answers, pretty decent!');
  });
  test('4 correct answers', () => {
    const answers = ['1', '2', '3', '4'];
    render(<Score answers={answers} quotes={quotes} />);
    screen.getByText('Four! Enough to brag, not enough to be the greatest. Just like life.');
  });
  test('5 correct answers', () => {
    const answers = ['1', '2', '3', '4', '5'];
    render(<Score answers={answers} quotes={quotes} />);
    screen.getByText('Holy fuck! Five! Youre either a really good guesser, or just know alot of useless quotes.. I guess congrats?');
  });
});
