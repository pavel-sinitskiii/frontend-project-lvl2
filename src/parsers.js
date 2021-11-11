import yaml from 'js-yaml';

const parse = (data, type) => {
  switch (type) {
    case '.yml':
    case '.yaml':
      return yaml.load(data);
    case '.json':
      return JSON.parse(data);
    default:
      throw new Error(`Wrong format: ${type}! The format should be JSON or YAML`);
  }
};
export default parse;
