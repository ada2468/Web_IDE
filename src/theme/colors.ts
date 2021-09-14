export function lightenDarkenColor(col: string, amt: number) {
  let usePound = false;

  if (col[0] === '#') {
    col = col.slice(1);
    usePound = true;
  }

  const num = parseInt(col, 16);

  let r = (num >> 16) + amt;

  if (r > 255) r = 255;
  else if (r < 0) r = 0;

  let b = ((num >> 8) & 0x00ff) + amt;

  if (b > 255) b = 255;
  else if (b < 0) b = 0;

  let g = (num & 0x0000ff) + amt;

  if (g > 255) g = 255;
  else if (g < 0) g = 0;

  return (usePound ? '#' : '') + (g | (b << 8) | (r << 16)).toString(16);
}

export const colors = {
  bg1: '#040404',
  bg1Hover: '#111111',
  bg2: '#151515',
  bg3: '#242424',
  gray: '#757575',
  white: '#fff',
  black: '#000',
  blue: '#6CC7F6',
  red: '#E1270E',
  green: '#5BC266',
};
