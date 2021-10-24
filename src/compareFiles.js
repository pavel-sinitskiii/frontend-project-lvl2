import _ from 'lodash';

const getCompareFiles = (file1, file2) => {
  const allKeys = _.union(_.keys(file1), _.keys(file2));
  const keysSort = _.sortBy(allKeys);
  const resultObj = keysSort.map((key) => {
    const file1Value = file1[key];
    const file2Value = file2[key];
    if (_.isPlainObject(file1Value) && _.isPlainObject(file2Value)) {
      return {
        name: key,
        type: 'nested',
        value: getCompareFiles(file1Value, file2Value),
      };
    }
    if (!_.has(file2, key)) {
      return {
        name: key,
        type: 'removed',
        value: file1Value,
      };
    } if (!_.has(file1, key)) {
      return {
        name: key,
        type: 'added',
        value: file2Value,
      };
    } if (_.isEqual(file1Value, file2Value)) {
      return {
        name: key,
        type: 'unchanged',
        value: file1Value,
      };
    }
    return {
      name: key,
      type: 'updated',
      value1: file1Value,
      value2: file2Value,
    };
  });
  return resultObj;
};
export default getCompareFiles;
