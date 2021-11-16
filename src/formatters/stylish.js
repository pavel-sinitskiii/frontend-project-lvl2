import _ from 'lodash';

const stringify = (data, depth = 0) => {
  if (!_.isObject(data)) {
    return String(data);
  }
  const keys = _.keys(data);
  const line = keys.map((key) => `${' '.repeat(depth + 4)}${key}: ${stringify(data[key], depth + 4)}`);
  return ['{', ...line, `${' '.repeat(depth)}}`].join('\n');
};

const stylish = (tree, depth = 0) => {
  const line = tree.map((node) => {
    switch (node.type) {
      case 'nested':
        return `${' '.repeat(depth + 4)}${node.key}: ${stylish(node.children, depth + 4)}`;
      case 'removed':
        return `${' '.repeat(depth + 2)}- ${node.key}: ${stringify(node.value, depth + 4)}`;
      case 'added':
        return `${' '.repeat(depth + 2)}+ ${node.key}: ${stringify(node.value, depth + 4)}`;
      case 'updated':
        return `${' '.repeat(depth + 2)}- ${node.key}: ${stringify(node.value1, depth + 4)}\n${' '.repeat(depth + 2)}+ ${node.key}: ${stringify(node.value2, depth + 4)}`;
      case 'unchanged':
        return `${' '.repeat(depth + 4)}${node.key}: ${node.value}`;
      default:
        throw new Error(`Unknown status: '${node.type}'!`);
    }
  });
  return ['{', ...line, `${' '.repeat(depth)}}`].join('\n');
};
export default stylish;
