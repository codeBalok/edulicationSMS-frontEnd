export const parentExtractor = (model) => {
  
  return model ? model?.replace(/App\\Models\\/g, '').split('\\')[0] : null;
};