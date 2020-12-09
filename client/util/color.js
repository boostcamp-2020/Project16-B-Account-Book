const colorArr = [
  '#717163',
  '#DCC4A7',
  '#B4C1A5',
  '#899698',
  '#0E7169',
  '#F2EBCA',
  '#E28963',
  '#52AA73',
  '#EDDEA6',
  '#E1BD61',
  '#4B1A2A',
  '#DA911B',
  '#7EAD34',
  '#1B2343',
  '#CBD4E0',
  '#D3C6CD',
  '#836D62',
  '#A9596E',
];

export const generateRandomColor = (num) => {
  const colors = [];

  for (let i = 0; i < num; i++) {
    colors.push(colorArr[i]);
  }

  return colors;
};

export const getContrastYIQ = (background) => {
  background = background.replace('#', '');
  const r = parseInt(background.substr(0, 2), 16);
  const g = parseInt(background.substr(2, 2), 16);
  const b = parseInt(background.substr(4, 2), 16);
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;

  return yiq >= 128 ? 'black' : 'white';
};
