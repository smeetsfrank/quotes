import React from 'react';
import { render, screen } from '@testing-library/react';

import QuoteDisplay from './QuoteDisplay';

test('renders quote and author', () => {
  render(<QuoteDisplay author="Frank Smeets" quote="Hello World!" fetchQuoteAndImage={() => undefined} />);
  const quote = screen.getByText(/hello world!/i);
  const author = screen.getByText(/frank smeets/i);
  const button = screen.getByRole('button', { name: /inspire me/i });
  expect(quote).toBeInTheDocument();
  expect(author).toBeInTheDocument();
  expect(button).toBeInTheDocument();
});
