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

const plain = (innerTree) => {
  const format = (tree, parents = []) => {
    const line = tree.map((node) => {
      const propertyName = [...parents, node.key].join('.');
      switch (node.type) {
        case 'nested':
          return format(node.children, [...parents, node.key]);
        case 'removed':
          return `Property '${propertyName}' was removed`;
        case 'added':
          return `Property '${propertyName}' was added with value: ${stringify(node.value)}`;
        case 'updated':
          return `Property '${propertyName}' was updated. From ${stringify(node.value1)} to ${stringify(node.value2)}`;
        case 'unchanged':
          return [];
        default:
          throw new Error(`Unknown status: '${node.type}'!`);
      }
    });
    return _.flattenDeep(line).join('\n');
  };
  return format(innerTree);
};
export default plain;
