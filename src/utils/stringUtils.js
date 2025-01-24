export const parentExtractor = (model) => {
  return model ? model?.replace(/App\\Models\\/g, '').split('\\')[0] : null;
};

export const toKebabCase = (str) => {
  return str ? str
    .replace(/\s+/g, '-')
    .replace(/[A-Z]/g, (match) => '-' + match.toLowerCase())
    .replace(/^-/, '') : null;
}