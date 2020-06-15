import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from './App';

import { MemoryRouter } from 'react-router-dom';

describe('App page', () => {
  test('full app rendering/navigating', () => {
    const { container, getByText, getByRole } = render(<App />, {
      wrapper: MemoryRouter,
    });
    expect(container).toMatchSnapshot();
  });
});
