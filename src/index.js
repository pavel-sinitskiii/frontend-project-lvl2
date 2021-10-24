import parse from './parsers.js';
import getCompareFiles from './compareFiles.js';
import stylish from './formatters/stylish.js';

const genDiff = (filepath1, filepath2) => {
  const file1 = parse(filepath1);
  const file2 = parse(filepath2);
  const tree = getCompareFiles(file1, file2);
  return stylish(tree);
};
export default genDiff;
