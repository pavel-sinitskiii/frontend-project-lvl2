import parse from './parsers.js';
import stylish from './stylish.js';

const genDiff = (filepath1, filepath2) => {
  const file1 = parse(filepath1);
  const file2 = parse(filepath2);
  return stylish(file1, file2);
};
export default genDiff;
