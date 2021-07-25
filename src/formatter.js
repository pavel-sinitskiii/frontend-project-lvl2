import { readFileSync } from 'fs';
import path from 'path';

const formatter = (filepath) => {
  const getPath = path.resolve(filepath);
  const jsonFs = readFileSync(getPath, 'utf-8');
  const jsonParse = JSON.parse(jsonFs);
  return jsonParse;
};
export default formatter;