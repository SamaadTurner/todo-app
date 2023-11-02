import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Footer from '../Components/Footer';
import App from '../App';
import { MantineProvider } from '@mantine/core';
import SettingsProvider from '../Context/Settings';
import AuthProvider from '../Context/Auth';

describe('App Tests', ()  => {

  test('render a header element as expected', () => {
    render(
      <MantineProvider withGlobalStyles withNormalizeCSS>
        <AuthProvider>
          <SettingsProvider>
            <App />
          </SettingsProvider>
        </AuthProvider>
      </MantineProvider>
    );

    let header = screen.getByTestId('header');

    expect(header).toBeTruthy();
    expect(header).toBeInTheDocument();
  })

  test('render a footer element as expected', () => {
    render(<Footer />);

    let footer = screen.getByTestId('footer');

    expect(footer).toBeTruthy();
    expect(footer).toBeInTheDocument();
    
  })
})