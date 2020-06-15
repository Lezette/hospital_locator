import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';

import SignUp from './index';

describe('<SignUp />', () => {
  test('should render signup form', async () => {
    const { container } = render(<SignUp />, { wrapper: MemoryRouter });
    expect(container).toMatchSnapshot();
  });
  test('Login Form should start with empty values', async () => {
    const { findByTestId } = render(<SignUp />, { wrapper: MemoryRouter });
    const loginForm = await findByTestId('signup-form');
    expect(loginForm).toHaveFormValues({
      email: '',
      password: '',
      conpassword: '',
    });
  });
});
