import '@testing-library/jest-dom';

import { validateInputs } from '../pages/api/auth/register';

describe('Register validation', () => {
  it('needs mail and password string', () => {
    const fieldError = jest.fn();
    validateInputs(fieldError, {}, () => {});

    expect(fieldError.mock.calls.length).toBeGreaterThan(0);
    expect(fieldError.mock.calls[0][0]).toBeDefined();
  });

  it('validates email length', () => {
    const fieldError = jest.fn();
    validateInputs(fieldError, 'ab', '123456789');

    expect(fieldError.mock.calls.length).toBeGreaterThan(0);
    expect(fieldError.mock.calls[0][0]).toBeDefined();
  });

  it('validates password length', () => {
    const fieldError = jest.fn();
    validateInputs(fieldError, 'abc', '12345');

    expect(fieldError.mock.calls.length).toBeGreaterThan(0);
    expect(fieldError.mock.calls[0][0]).toBeDefined();
  });

  it('validates giving proper mail and password', () => {
    const fieldError = jest.fn();
    expect(validateInputs(fieldError, 'abc', '123456')).toBeTruthy();

    expect(fieldError.mock.calls.length).toBe(0);
  });
});
