import _ from 'lodash';

const stringify = (data) => {
  if (typeof data === 'string') {
    return `'${data}'`;
  }
  if (_.isObject(data)) {
    return '[complex value]';
  }
  return String(data);
};

const plain = (tree, path = []) => {
  const result = tree.map((node) => {
    const curetPath = [...path, `${node.key}`];
    switch (node.type) {
      case 'nested':
        return plain(node.children, curetPath);
      case 'removed':
        return `Property '${curetPath.join('.')}' was removed`;
      case 'added':
        return `Property '${curetPath.join('.')}' was added with value: ${stringify(node.value)}`;
      case 'updated':
        return `Property '${curetPath.join('.')}' was updated. From ${stringify(node.value1)} to ${stringify(node.value2)}`;
      case 'unchanged':
        return [];
      default:
        throw new Error(`Unknown status: '${node.type}'!`);
    }
  });
  return _.flattenDeep(result).join('\n');
};
export default plain;
