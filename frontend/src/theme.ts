import { extendTheme } from '@chakra-ui/react';
import '@fontsource/baskervville';

export const theme = extendTheme({
  fonts: {
    heading: `'Baskervville', serif`,
    body: `'Baskervville', serif`,
  },
  colors: {
    brand: {
    moss: '#606c38ff',
    deep_green: '#283618ff',
    cornsilk: '#fefae0ff',
    clay: '#dda15eff',
    tigers_eye: '#bc6c25ff'
    },
  },
});