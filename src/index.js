import { readFileSync } from 'fs';
import path from 'path';
import parse from './parsers.js';
import buildTree from './treeBuilder.js';
import format from './formatters/index.js';

const getPath = (filepath) => path.resolve(filepath);
const formateFile = (filepath) => path.extname(filepath);

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const fileContent1 = readFileSync(getPath(filepath1), 'utf-8');
  const fileContent2 = readFileSync(getPath(filepath2), 'utf-8');
  const data1 = parse(fileContent1, formateFile(filepath1));
  const data2 = parse(fileContent2, formateFile(filepath2));
  const tree = buildTree(data1, data2);
  return format(formatName, tree);
};
export default genDiff;
