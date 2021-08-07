import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import genDiff from '../src/index.js';
import result from '../__fixtures__/result.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const file1 = getFixturePath('file1.json');
const file2 = getFixturePath('file2.json');
const f1 = getFixturePath('file1.yml');
const f2 = getFixturePath('file2.yml');
test('fileJsonComparison', () => {
  expect(genDiff(file1, file2)).toEqual(result.equal);
});
test('fileYmlComparison', () => {
  expect(genDiff(f1, f2)).toEqual(result.equal);
});
