import * as utils from '../src/utils';

const assertionToBoolean = (assertion: () => void) : boolean => {
  try {
    assertion();
    return true;
  } catch (err) {
    return false;
  }
}

describe('utils utility methods', () => {

  test('assertDefined correctly determines definitiveness', () => {

    type TypeWithOneProp = {
      p: number
    };

    expect(assertionToBoolean(() => utils.assertDefined<TypeWithOneProp>(undefined, 'asdf'))).toBeFalsy();
    expect(assertionToBoolean(() => utils.assertDefined<TypeWithOneProp>(null, 'asdf'))).toBeTruthy();
    expect(assertionToBoolean(() => utils.assertDefined<TypeWithOneProp>({p: undefined}, 'p'))).toBeTruthy();
    expect(assertionToBoolean(() => utils.assertDefined<TypeWithOneProp>({p: 1}, 'p'))).toBeTruthy();
  });

});