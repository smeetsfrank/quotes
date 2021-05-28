import React from 'react';
import { render, screen } from '@testing-library/react';
import Options from './Options';

const authors = [
  { id: 1, author: 'Frank' },
  { id: 2, author: 'Anne' },
];

const answer = {
  id: 3, author: 'Mik',
};

describe('Options', () => {
  it('renders list of options', async () => {
    const { getAllByRole } = render(
      <Options
        authors={authors}
        correctAnswer={answer}
        selectedOption={() => undefined}
      />,
    );
    const listItems = getAllByRole('listitem');
    expect(listItems).toHaveLength(3);
  });
});
