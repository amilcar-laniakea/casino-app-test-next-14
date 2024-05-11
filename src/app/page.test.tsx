import '@testing-library/jest-dom';
import React from 'react';
import { screen, render } from '@testing-library/react';
import Home from './page';
import { SessionProvider } from 'next-auth/react';

describe('Home Page', () => {
  it('Should render property', () => {
    render(
      <SessionProvider session={null}>
        <Home />
      </SessionProvider>
    );

    const header = screen.getByRole('heading');

    expect(header).toBeInTheDocument();
  });
  it('Should text render property', () => {
    render(
      <SessionProvider session={null}>
        <Home />
      </SessionProvider>
    );

    const header = screen.getByRole('heading');
    const renderText = 'Prueba Técnica PRO-Marketing';

    expect(header).toHaveTextContent(renderText);
  });
});
