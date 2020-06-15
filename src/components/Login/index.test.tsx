import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';

import Login from './index';

describe('<Login />', () => {
  test('should render Login page', async () => {
    const { container } = render(<Login />, { wrapper: MemoryRouter });
    expect(container).toMatchSnapshot();
  });
  test('Login Form should start with empty values', async () => {
    const { container, findByTestId } = render(<Login />, {
      wrapper: MemoryRouter,
    });
    const loginForm = await findByTestId('login-form');
    expect(loginForm).toHaveFormValues({
      email: '',
      password: '',
    });
  });
});
