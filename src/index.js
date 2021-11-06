import parse from './parsers.js';
import buildTree from './treeBuilder.js';
import format from './formatters/index.js';

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const file1 = parse(filepath1);
  const file2 = parse(filepath2);
  const tree = buildTree(file1, file2);
  return format(formatName, tree);
};
export default genDiff;
