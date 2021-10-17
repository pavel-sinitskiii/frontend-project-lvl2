import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import genDiff from '../src/index.js';
import result from '../__fixtures__/result.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
test('fileJsonComparison', () => {
  const file1 = getFixturePath('file1.json');
  const file2 = getFixturePath('file2.json');
  expect(genDiff(file1, file2)).toEqual(result.flat);
});
test('fileYmlComparison', () => {
  const file1 = getFixturePath('file1.yml');
  const file2 = getFixturePath('file2.yml');
  expect(genDiff(file1, file2)).toEqual(result.flat);
});
test('stylishComparison', () => {
  const file1 = getFixturePath('filenesting1.json');
  const file2 = getFixturePath('filenesting2.json');
  expect(genDiff(file1, file2)).toEqual(result.nested);
});
