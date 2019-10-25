import { typeCheck, randNum } from '../src/methods';

// test type check

test('test type check method', () => {
  expect(typeCheck({}, 'Object')).toBeTruthy();
  expect(typeCheck([], 'Array')).toBeTruthy();
  expect(typeCheck('abc', 'String')).toBeTruthy();
  expect(typeCheck(null, 'Null')).toBeTruthy();
  expect(typeCheck(undefined, 'Undefined')).toBeTruthy();
  expect(typeCheck(123, 'Number')).toBeTruthy();
  expect(typeCheck(true, 'Boolean')).toBeTruthy();
  expect(typeCheck(function() {}, 'Function')).toBeTruthy();
  expect(typeCheck(/test/, 'RegExp')).toBeTruthy();
  expect(typeCheck(new Date(), 'Date')).toBeTruthy();
  expect(typeCheck('test', 'RegExp')).toBeFalsy();
});

test('test random number string', () => {
  // 13+11|10  = 24 || 23
  const len = randNum().length;
  expect(/\d+/.test(len)).toBeTruthy();
});
