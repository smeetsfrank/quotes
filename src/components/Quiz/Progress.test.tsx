import React from 'react';
import { render } from '@testing-library/react';
import Progress from './Progress';

describe('Progress Components', () => {
  it('renders all steps', async () => {
    const { getAllByRole } = render(<Progress steps={5} current={2} />);
    const listItems = getAllByRole('listitem');
    expect(listItems).toHaveLength(5);
  });

  it('set syling current step', async () => {
    const { getAllByRole } = render(<Progress steps={5} current={2} />);
    const listItems = getAllByRole('listitem');
    expect(listItems[2].classList.contains('current')).toBe(true);
  });
});
