import {getNewField} from '../src/js/lib.js';

test('field has correct structure', () => {
  const field = getNewField();

  expect(Array.isArray(field)).toBeTruthy();
  expect(field.length === 4).toBeTruthy();
  expect(field.every((row) => Array.isArray(row))).toBeTruthy();
  expect(field.every((row) => row.length === 4)).toBeTruthy();

  const has15 = [...field].flat();
  has15.splice(-1);
  expect(has15.every((item) => item === Number(item))).toBeTruthy();
  expect(field[3][3]).toBeNull();
});
