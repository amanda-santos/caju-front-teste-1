export const removeSpecialCharacters = (str: string): string => {
  return str.replace(/[-._]/g, "");
};
