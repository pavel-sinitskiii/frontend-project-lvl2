import _ from 'lodash';

const stylish = (first, second, deep = 0) => {
  const space = ' '.repeat(deep + 4);
  const plus = `${' '.repeat(deep + 2)}+ `;
  const minus = `${' '.repeat(deep + 2)}- `;
  const arrFirstKey = _.toPairs(first);
  const arrSecondKey = _.toPairs(second);
  const arrKey = _.union(arrFirstKey, arrSecondKey);
  const sortKeys = _.sortBy(arrKey, (elem) => elem[0]);
  const diffObj = sortKeys.map(([key, value]) => {
    if (_.isEqual(first[key], second[key]) && _.isPlainObject(first[key])) {
      return `${space}${key}: ${stylish(first[key], second[key], deep + 4)}`;
    }
    if (_.isEqual(first[key], second[key])) {
      return `${space}${key}: ${value}`;
    }
    if (_.isPlainObject(first[key]) && _.isPlainObject(second[key])) {
      if (!_.isEqual(first[key], second[key])) {
        return `${space}${key}: ${stylish(first[key], second[key], deep + 4)}`;
      }
    }
    if (first[key] === value && _.isPlainObject(first[key])) {
      return `${minus}${key}: ${stylish(first[key], first[key], deep + 4)}`;
    }
    if (first[key] === value) {
      return `${minus}${key}: ${value}`;
    }
    if (second[key] === value && _.isPlainObject(second[key])) {
      return `${plus}${key}: ${stylish(second[key], second[key], deep + 4)}`;
    }
    return `${plus}${key}: ${value}`;
  }, []);
  const result = _.uniq(['{', ...diffObj, `${' '.repeat(deep)}}`]).join('\n');
  return result;
};
export default stylish;
