import stylish from './stylish.js';
import plain from './plain.js';

const format = (formatName, tree) => {
  if (formatName === 'stylish') {
    return stylish(tree);
  }
  return plain(tree);
};
export default format;
