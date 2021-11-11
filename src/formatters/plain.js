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

const plain = (tree, path = []) => {
  const result = tree.map((el) => {
    const curetPath = [...path, `${el.name}`];
    switch (el.type) {
      case 'nested':
        return plain(el.value, curetPath);
      case 'removed':
        return `Property '${curetPath.join('.')}' was removed`;
      case 'added':
        return `Property '${curetPath.join('.')}' was added with value: ${getValue(el.value)}`;
      case 'updated':
        return `Property '${curetPath.join('.')}' was updated. From ${getValue(el.value1)} to ${getValue(el.value2)}`;
      case 'unchanged':
        return [];
      default:
        throw new Error(`Unknown status: '${el.type}'!`);
    }
  });
  return _.flattenDeep(result).join('\n');
};
export default plain;
