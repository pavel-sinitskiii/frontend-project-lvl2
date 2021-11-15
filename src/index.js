import { readFileSync } from 'fs';
import path from 'path';
import parse from './parsers.js';
import buildTree from './treeBuilder.js';
import format from './formatters/index.js';

const buildFullPath = (filepath) => path.resolve(process.cwd(), filepath);
const extractFormat = (filepath) => path.extname(filepath).slice(1);

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const fileContent1 = readFileSync(buildFullPath(filepath1), 'utf-8');
  const fileContent2 = readFileSync(buildFullPath(filepath2), 'utf-8');
  const data1 = parse(fileContent1, extractFormat(filepath1));
  const data2 = parse(fileContent2, extractFormat(filepath2));
  const tree = buildTree(data1, data2);
  return format(formatName, tree);
};
export default genDiff;
