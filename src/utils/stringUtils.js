export const parentExtractor = (model) => {
  return model ? model?.replace(/App\\Models\\/g, '').split('\\')[0] : null;
};

export const toKebabCase = (str) => {
   return str
    ? str
        .trim() 
        .replace(/([a-z])([A-Z])/g, '$1-$2')
        .replace(/\s+/g, '-') 
        .toLowerCase() 
    : null;
}

export const captalize = (str) => {
  return str ? str.charAt(0).toUpperCase() + str.slice(1) : null;

} 


