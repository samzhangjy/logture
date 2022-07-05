export const getFormattedText = (
  text: string,
  format_string: string,
  format_data: string
): string => {
  return text.replace(`{{${format_string}}}`, format_data);
};
