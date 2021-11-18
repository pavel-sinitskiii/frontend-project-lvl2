import _ from 'lodash';

const indent = (depth, spaceCount = 4) => ' '.repeat(depth * spaceCount);

const stringify = (data, depth) => {
  if (!_.isObject(data)) {
    return String(data);
  }
  const keys = _.keys(data);
  const line = keys.map((key) => `${indent(depth)}${key}: ${stringify(data[key], depth + 1)}`);
  return ['{', ...line, `${indent(depth - 1)}}`].join('\n');
};

const stylish = (innerTree) => {
  const format = (tree, depth = 1) => {
    const line = tree.map((node) => {
      switch (node.type) {
        case 'nested':
          return `${indent(depth)}${node.key}: ${format(node.children, depth + 1)}`;
        case 'removed':
          return `${indent(depth - 1)}  - ${node.key}: ${stringify(node.value, depth + 1)}`;
        case 'added':
          return `${indent(depth - 1)}  + ${node.key}: ${stringify(node.value, depth + 1)}`;
        case 'updated':
          return `${indent(depth - 1)}  - ${node.key}: ${stringify(node.value1, depth + 1)}\n${indent(depth - 1)}  + ${node.key}: ${stringify(node.value2, depth + 1)}`;
        case 'unchanged':
          return `${indent(depth)}${node.key}: ${stringify(node.value, depth + 1)}`;
        default:
          throw new Error(`Unknown status: '${node.type}'!`);
      }
    });
    return ['{', ...line, `${indent(depth - 1)}}`].join('\n');
  };
  return format(innerTree);
};
export default stylish;
