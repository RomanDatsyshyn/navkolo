export const getPhoneMask = str => {
  str = str.replace(new RegExp('[^0-9.]', 'g'), '');
  str = str.replace(/(\d{3})(\d{3})(\d{4})/g, '($1) $2-$3');

  return str;
};
