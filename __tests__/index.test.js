import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { readFileSync } from 'fs';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => readFileSync(filename, 'utf-8');

test.each([
  ['stylish'],
  ['plain'],
  ['json'],
])('%s', (formatName) => {
  const filepath1 = getFixturePath('file1.json');
  const filepath2 = getFixturePath('file2.yml');
  const actual = genDiff(filepath1, filepath2, formatName);
  const expected = readFile(getFixturePath(`${formatName}.txt`));
  expect(actual).toEqual(expected);
});
