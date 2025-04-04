import React, { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import GameStateProvider from '../src/components/GameStateProvider';

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return <GameStateProvider>{children}</GameStateProvider>;
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';
import userEvent from '@testing-library/user-event';
export { customRender as render, userEvent };
