import * as errors from '../src/errors';

const assertionToBoolean = (assertion: () => void) : boolean => {
  try {
    assertion();
    return true;
  } catch (err) {
    return false;
  }
}

describe('ErrorFactory', () => {

  test('errorFactory chooses correct error type', () => {
    const error = errors.errorFactory();
    expect(error.message).toBe('An unknown error occurred while calling the Hercules API.');
  });

});