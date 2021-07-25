import _ from 'lodash';
import formatter from './formatter.js';

const operators = ['-', '+', ' '];
const getCompareFiles = (filepath1, filepath2) => {
  const file1 = formatter(filepath1);
  const file2 = formatter(filepath2);
  const keys1 = _.keys(file1);
  const keys2 = _.keys(file2);
  const allKeys = _.union(keys1, keys2).sort();
  const resultObj = allKeys.map((element) => {
    if (_.has(file1, element) && !_.has(file2, element)) {
      return ` ${operators[0]} ${element}: ${file1[element]}`;
    } else if (!_.has(file1, element) && _.has(file2, element)) {
      return ` ${operators[1]} ${element}: ${file2[element]}`;
    } else if (_.has(file1, element) && _.has(file2, element) &&
      file1[element] === file2[element]) {
      return ` ${operators[2]} ${element}: ${file1[element]}`;
    } else if (_.has(file1, element) && _.has(file2, element) &&
      file1[element] !== file2[element]) {
      return ` ${operators[0]} ${element}: ${file1[element]}\n ${operators[1]} ${element}: ${file2[element]}`;
    }
  });
  return  `{\n${ resultObj.join('\n') }\n}`;
};
export default getCompareFiles;
