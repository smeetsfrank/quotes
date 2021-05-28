import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Option from './Option';

const optionComponent = (
  <Option
    id={1}
    author="Frank"
    selectedOption={() => undefined}
  />
);
describe('Option', () => {
  test('Renders correct label', () => {
    render(optionComponent);
    const label = screen.getByLabelText(/frank/i);
    expect(label).toBeInTheDocument();
  });

  test('checks radio on click', () => {
    render(optionComponent);
    const label = screen.getByLabelText(/frank/i);
    userEvent.click(label);
    const radio = screen.getByRole('radio', { name: /frank/i });
    expect(radio).toBeChecked();
  });
});
