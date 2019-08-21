import { darken, lighten } from 'polished';
export const breakpoints = [`500px`, `768px`, `1024px`, `1368px`, `1920px`];

// base colors
const colors = {
  black: `#101820`,
  white: `#ffffff`,
  offwhite: `#f2f8ee`,
  red: `#e63947`,
  blue: `#1c3557`,
  lightblue: `#abdadc`,
  darkblue: `#060030`,
};

// base text
const title = {
  fontFamily: 'body',
  fontWeight: 'bold',
  lineHeight: 'body',
  letterSpacing: 'heading',
  willChange: `color`,
  transition: `color 0.2s ease-out`,
};

const heading = {
  fontWeight: 'heading',
  lineHeight: 'heading',
  letterSpacing: 'heading',
  willChange: `color`,
  transition: `color 0.2s ease-out`,
};

// base section
const section = {
  display: `block`,
  width: `100%`,
  px: [20, 30, 40],
  willChange: `background-color`,
  transition: `background-color 0.2s ease-out`,
};

const theme = {
  useCustomProperties: true,
  initialColorMode: `light`,
  breakpoints,
  // fontSizes: [14, 16, 20, 24, 32, 44, 64, 72, 80],
  fontSizes: [
    `0.7rem`,
    `0.8rem`,
    `1rem`,
    `1.2rem`,
    `1.6rem`,
    `2.2rem`,
    `3.2rem`,
    `3.6rem`,
    `5rem`,
  ],
  colors: {
    text: colors.blue,
    background: colors.offwhite,
    border: colors.blue,
    innerBorder: colors.lightblue,
    primary: colors.blue,
    secondary1: colors.blue,
    secondary2: colors.darkblue,
    secondary3: colors.lightblue,
    gradient: `linear-gradient(to right, ${colors.red} 0%, ${colors.red} 50%, ${
      colors.offwhite
    } 50%, ${colors.offwhite} 100% )`,
    faded: darken(0.05, colors.offwhite),
    divider: darken(0.1, colors.offwhite),
    modes: {
      dark: {
        text: colors.blue,
        border: colors.red,
        innerBorder: colors.lightblue,
        primary: colors.offwhite,
        secondary1: colors.offwhite,
        secondary2: colors.lightblue,
        secondary3: colors.red,
        gradient: `linear-gradient(to right, ${colors.darkblue} 0%, ${
          colors.darkblue
        } 50%, ${colors.blue} 50%, ${colors.blue} 100% )`,
        faded: lighten(0.025, colors.blue),
        divider: lighten(0.075, colors.blue),
      },
    },
  },
  space: [0, 4, 8, 16, 32, 64, 128, 256],
  fonts: {
    body: `Arial, sans-serif`,
    heading: `Arial, sans-serif`,
  },
  fontWeights: {
    body: 400,
    heading: 400,
    bold: 700,
  },
  lineHeights: {
    body: 1.5,
    heading: 1.25,
  },
  text: {
    title: {
      ...title,
      fontSize: [6, 7, 8],
    },
    subtitle: {
      ...title,
      fontSize: [2, 3, 4],
    },
    h1: {
      ...heading,
      fontSize: [5, 6, 7],
    },
    h2: {
      ...heading,
      fontSize: [4, 5, 6],
    },
    h3: {
      ...heading,
      fontSize: [3, 4, 5],
    },
    h4: {
      ...heading,
      fontSize: [2, 3, 4],
    },
    h5: {
      ...heading,
      fontFamily: 'body',
      fontWeight: 'bold',
      lineHeight: 'body',
      letterSpacing: 'body',
      fontSize: [1, 2, 3],
    },
    h6: {
      ...heading,
      fontFamily: 'body',
      fontWeight: 'body',
      lineHeight: 'body',
      letterSpacing: 'body',
      fontSize: [0, 1, 2],
    },
  },
  buttons: {
    default: {
      display: 'inline-block',
      fontFamily: 'body',
      fontWeight: 'bold',
      fontSize: [0, 1, 2],
      px: [10, 20, 30],
      py: [`4px`, `6px`, `8px`],
      border: 'none',
      borderRadius: 4,
      backgroundColor: 'text',
      color: 'background',
      willChange: 'color background-color',
      transitionProperty: 'color, background-color',
      transition: ' 0.2s ease-in',
      ':hover, :focus': {
        outline: 'none',
        transition: '0.2s ease-out',
        backgroundColor: 'primary',
      },
    },
    icon: {
      color: 'text',
      width: 40,
      height: 40,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'body',
      fontWeight: 'body',
      p: 0,
      border: 'none',
      borderRadius: 0,
      backgroundColor: 'transparent',
      fontSize: [2],
      ':hover, :focus': {
        outline: 'none',
      },
    },
  },
  sections: {
    default: {
      ...section,
      py: [40, 60, 80],
    },
    small: {
      ...section,
      py: [20, 30, 40],
    },
    tiny: {
      ...section,
      py: 0,
    },
    nav: {
      ...section,
      pt: [10, 15],
    },
  },
};

export default theme;
