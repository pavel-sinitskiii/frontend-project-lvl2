import parse from './parsers.js';
import buildTree from './treeBuilder.js';
import format from './formatters/index.js';

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const fileContent1 = parse(filepath1);
  const fileContent2 = parse(filepath2);
  const tree = buildTree(fileContent1, fileContent2);
  return format(formatName, tree);
};
export default genDiff;
