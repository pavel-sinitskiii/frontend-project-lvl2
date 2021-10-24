import _ from 'lodash';

const getValue = (value) => {
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  if (_.isObject(value)) {
    return '[complex value]';
  }
  return value;
};

const plain = (data, path = []) => {
  const result = data.map((el) => {
    const curetPath = [...path, `${el.name}`];
    if (el.type === 'updated') {
      return `Property '${curetPath.join('.')}' was updated. From ${getValue(el.value1)} to ${getValue(el.value2)}`;
    }
    if (el.type === 'added') {
      return `Property '${curetPath.join('.')}' was added with value: ${getValue(el.value)}`;
    }
    if (el.type === 'nested') {
      return plain(el.value, curetPath);
    }
    if (el.type === 'removed') {
      return `Property '${curetPath.join('.')}' was removed`;
    }
    return [];
  });
  return _.flattenDeep(result).join('\n');
};
export default plain;
