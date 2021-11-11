import _ from 'lodash';

const isObj = (value, deep = 0) => {
  if (!_.isObject(value)) {
    return value;
  }
  const keys = _.keys(value);
  const result = keys.map((key) => `${' '.repeat(deep + 4)}${key}: ${isObj(value[key], deep + 4)}`);
  return ['{', ...result, `${' '.repeat(deep)}}`].join('\n');
};

const stylish = (tree, deep = 0) => {
  const result = tree.map((el) => {
    switch (el.type) {
      case 'nested':
        return `${' '.repeat(deep + 4)}${el.name}: ${stylish(el.value, deep + 4)}`;
      case 'removed':
        return `${' '.repeat(deep + 2)}- ${el.name}: ${isObj(el.value, deep + 4)}`;
      case 'added':
        return `${' '.repeat(deep + 2)}+ ${el.name}: ${isObj(el.value, deep + 4)}`;
      case 'updated':
        return `${' '.repeat(deep + 2)}- ${el.name}: ${isObj(el.value1, deep + 4)}\n${' '.repeat(deep + 2)}+ ${el.name}: ${isObj(el.value2, deep + 4)}`;
      case 'unchanged':
        return `${' '.repeat(deep + 4)}${el.name}: ${el.value}`;
      default:
        throw new Error(`Unknown status: '${el.type}'!`);
    }
  });
  return ['{', ...result, `${' '.repeat(deep)}}`].join('\n');
};
export default stylish;
