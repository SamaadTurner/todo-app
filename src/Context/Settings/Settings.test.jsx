import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import SettingsProvider, { SettingsContext } from '.';


describe('Settings Tests', () => {

    test('provides initial state for context values', () => {
      render(
      <SettingsProvider>
        <SettingsContext.Consumer>
          {
            ({sort, pageItems, showCompleted}) => {
              return (
                <>
                  <h1 data-testid="test-h1">Test: {sort}</h1>
                  <h2 data-testid="test-h2">Test: {pageItems}</h2>
                  <h3 data-testid="test-h3">Test: {showCompleted}</h3>
                </>
              )
            }
          }
        </SettingsContext.Consumer>
      </SettingsProvider>
      )
      const h1 = screen.getByTestId('test-h1')
      expect(h1).toHaveTextContent('Test: difficulty')
      const h2 = screen.getByTestId('test-h2')
      expect(h2).toHaveTextContent('Test: 3')
      const h3 = screen.getByTestId('test-h3')
      expect(h3).toHaveTextContent('Test:')
    })
  });