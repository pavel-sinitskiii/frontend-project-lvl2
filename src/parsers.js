import { readFileSync } from 'fs';
import path from 'path';
import yaml from 'js-yaml';

const parse = (filepath) => {
  const getPath = path.resolve(filepath);
  const readFile = readFileSync(getPath, 'utf-8');
  const formateFile = path.extname(filepath);
  if (formateFile === '.yml' || formateFile === '.yaml') {
    return yaml.load(readFile);
  }
  return JSON.parse(readFile);
};
export default parse;
