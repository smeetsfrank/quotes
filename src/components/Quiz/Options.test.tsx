import React from 'react';
import { render, screen } from '@testing-library/react';
import Options from './Options';

describe('Options', () => {
  const authors = [
    { id: 1, author: 'Frank' },
    { id: 2, author: 'Anne' },
  ];

  const answer = {
    id: 3, author: 'Mik',
  };
  it('renders list of options with the correct label', async () => {
    const { getAllByRole } = render(
      <Options
        authors={authors}
        correctAnswer={answer}
        selectedOption={() => undefined}
      />,
    );
    const listItems = getAllByRole('listitem');
    expect(listItems).toHaveLength(3);

    expect(screen.getByLabelText(/frank/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/anne/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/mik/i)).toBeInTheDocument();
  });
});
