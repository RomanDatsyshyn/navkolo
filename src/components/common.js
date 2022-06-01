export const getPhoneMask = str => {
  str = str.replace(/ /g, '');

  if (str.length < 4) {
    return str;
  }

  if (str.length > 3) {
    if (str.length < 5) {
      return `${str[0]}${str[1]}${str[2]} ${str[3]}`;
    }
    if (str.length < 6) {
      return `${str[0]}${str[1]}${str[2]} ${str[3]}${str[4]}`;
    }
    if (str.length < 7) {
      return `${str[0]}${str[1]}${str[2]} ${str[3]}${str[4]}${str[5]}`;
    }
    if (str.length < 8) {
      return `${str[0]}${str[1]}${str[2]} ${str[3]}${str[4]}${str[5]} ${str[6]}`;
    }
    if (str.length < 9) {
      return `${str[0]}${str[1]}${str[2]} ${str[3]}${str[4]}${str[5]} ${str[6]}${str[7]}`;
    }
    if (str.length < 10) {
      return `${str[0]}${str[1]}${str[2]} ${str[3]}${str[4]}${str[5]} ${str[6]}${str[7]} ${str[8]}`;
    }
    if (str.length < 11) {
      return `${str[0]}${str[1]}${str[2]} ${str[3]}${str[4]}${str[5]} ${str[6]}${str[7]} ${str[8]}${str[9]}`;
    }
    if (str.length < 11) {
      return `${str[0]}${str[1]}${str[2]} ${str[3]}${str[4]}${str[5]} ${str[6]}${str[7]} ${str[8]}${str[9]}`;
    }
    if (str.length < 11) {
      return `${str[0]}${str[1]}${str[2]} ${str[3]}${str[4]}${str[5]} ${str[6]}${str[7]} ${str[8]}${str[9]}`;
    }
  }

  if (str.length > 10) {
    return str;
  }
};
