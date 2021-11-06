import _ from 'lodash';

const buildTree = (data1, data2) => {
  const allKeys = _.sortBy(_.union(_.keys(data1), _.keys(data2)));
  const result = allKeys.map((key) => {
    const data1Value = data1[key];
    const data2Value = data2[key];
    if (_.isPlainObject(data1Value) && _.isPlainObject(data2Value)) {
      return { name: key, type: 'nested', value: buildTree(data1Value, data2Value) };
    }
    if (!_.has(data2, key)) {
      return { name: key, type: 'removed', value: data1Value };
    } if (!_.has(data1, key)) {
      return { name: key, type: 'added', value: data2Value };
    } if (_.isEqual(data1Value, data2Value)) {
      return { name: key, type: 'unchanged', value: data1Value };
    }
    return {
      name: key, type: 'updated', value1: data1Value, value2: data2Value,
    };
  });
  return result;
};
export default buildTree;
