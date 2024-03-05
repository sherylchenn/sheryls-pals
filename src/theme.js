// theme.js
import { extendTheme } from '@chakra-ui/react';

// Define your color palette inspired by the uploaded image
const colors = {
  pastel: {
    background: '#fdfd96', // Soft pastel yellow for backgrounds
    green: '#caffbf', // Soft green for elements
    purple: '#e0bbe4', // Soft purple for elements
    text: '#333333', // Darker color for text for contrast
    // ... add more colors as needed
  },
};

// Customize global styles
const styles = {
    global: {
        'html, body': {
          color: colors.pastel.text,
          bg: colors.pastel.background,
          fontFamily: '"Inconsolata"', // Directly set the font family
          lineHeight: 'base',
        },
    a: {
      color: colors.pastel.purple,
      _hover: {
        textDecoration: 'underline',
      },
    },
  },
};

// Customize components styling
const components = {
  Button: {
    baseStyle: {
      fontWeight: 'normal',
      borderRadius: 'lg', // Rounded corners for buttons
    },
  },
  // Customizing card-like components
  Box: {
    baseStyle: {
      bg: colors.pastel.green,
      borderRadius: 'xl', // Highly rounded corners for card-like components
      p: 4, // Padding inside the cards
      boxShadow: 'md', // Soft shadow for depth
    },
  },
};

// Extend the theme with new configurations
const theme = extendTheme({ colors, styles, components });

export default theme;
