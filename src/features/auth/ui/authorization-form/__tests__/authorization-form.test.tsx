import '@testing-library/jest-dom';
import { fireEvent, render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import { AuthorizationForm } from 'features/auth';

describe('AuthorizationForm', () => {
  const { getByLabelText, getByText } = render(
    <BrowserRouter>
      <AuthorizationForm onSubmit={async () => {}} />
    </BrowserRouter>,
  );

  const login = getByLabelText('Логин') as HTMLInputElement;
  const password = getByLabelText('Пароль') as HTMLInputElement;

  test('initial state inputs form', () => {
    expect(login).toHaveValue('');
    expect(password).toHaveValue('');
  });

  test('test link signup', () => {
    const link = getByText('Зарегистрироваться');

    fireEvent.click(link);
    expect(window.location.href).toBe('http://localhost/registration');
  });
});
