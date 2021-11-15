import yaml from 'js-yaml';

const parse = (data, formatName) => {
  switch (formatName) {
    case 'yml':
    case 'yaml':
      return yaml.load(data);
    case 'json':
      return JSON.parse(data);
    default:
      throw new Error(`Wrong format: ${formatName}! The format should be JSON or YAML`);
  }
};
export default parse;
