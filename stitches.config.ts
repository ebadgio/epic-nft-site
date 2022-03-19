import {
  gray,
  blue,
  red,
  green,
  mint,
  orange,
  pink,
  violet,
  indigo,
  cyan,
  grayDark,
  blueDark,
  redDark,
  greenDark,
  mintDark,
  orangeDark,
  pinkDark,
  violetDark,
  indigoDark,
  cyanDark,
} from '@radix-ui/colors';

import { createStitches } from '@stitches/react';

const common = {
  space: {
    0: '0px', 
    1: '4px', 
    2: '8px', 
    3: '16px',
    4: '24px', 
    5: '32px', 
    6: '64px', 
    7: '128px', 
    8: '256px'
  },
  fontSizes: {
    special: '12px', 
    bodySmall: '14px', 
    body: '16px', 
    h3: '20px', 
    h2: '24px', 
    h1: '32px', 
    xl: '48px', 
  },
  shadows: {
    0: 'none',
    1: '0px 1px 5px rgba(0,0,0,0.12)',
    2: '0px 3px 10px rgba(0,0,0,0.06)',
  },
  radii: {
    roundedSquare: '8px',
    rounded: '9999px',
  },
  sizes: {
    xs: '24px',
    sm: '36px',
    md: '48px',
    lg: '64px',
  }
}

export const { globalCss, styled, theme, createTheme } = createStitches({
  theme: {
    colors: {
      white: '#fff',
      ...gray,
      ...blue,
      ...red,
      ...green,
      ...mint,
      ...orange,
      ...pink,
      ...violet,
      ...indigo,
      ...cyan,
      blur: 'rgba(255,255,255,0.72)',
    },
    ...common,
  },
  media: {
    bp1: '(max-width: 480px)',
    bp2: '(max-width: 640px)',
    bp3: '(max-width: 768px)',
    bp4: '(max-width: 1023px)',
    bp5: '(min-width: 1024px)',
  },
});

export const darkTheme = createTheme({
  colors: {
    ...grayDark,
    ...blueDark,
    ...redDark,
    ...greenDark,
    ...mintDark,
    ...orangeDark,
    ...pinkDark,
    ...violetDark,
    ...indigoDark,
    ...cyanDark,
    blur: 'rgba(22,22,22,0.72)',
  },
  ...common,
})