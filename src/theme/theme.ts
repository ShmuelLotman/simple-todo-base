export const theme = {
  colors: {
    green: {
      primary: '#14AE65',
      primaryHover: '#078953',
      dark: '#078953',
      backgroundLight: '#14AE652A',
      backgroundLightHover: '#0075FF0D',
      background: '#14AE65',
      shadow: '#14AE6533',
    },
    blue: {
      primary: '#0075FF',
      border: '#0075FF',
      background: '#0075FF',
      backgroundLight: '#0075FF2A',
      shadow: '#0075FF33',
    },
    red: {
      primary: '#FE5151',
      background: '#FE5151',
      backgroundLight: '#FE51512A',
      shadow: '#FE515133',
    },
    yellow: {
      primary: '#E58A00',
      background: '#E58A00',
      backgroundLight: '#FFAB2D1A',
      shadow: '#E58A0033',
    },
    gray: {
      border: '#F3F3F3',
      borderDisabled: '#E9E9E9',
      backgroundDark: '#FCFCFC',
      backgroundDarker: '#F9F9F9',
      backgroundShaded: '#00152E08',
      backgroundLight: '#00152E1A',
      backgroundExtraLight: '#00152E05',
      textDark: '#00152E',
      shadow: '#00152E33',
    },
    white: '#FFFFFF',
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
  },
  fontSize: {
    xs: '12px',
    sm: '14px',
    md: '16px',
    lg: '18px',
  },
  fontFamily: 'Nunito Sans, sans-serif',
  fontWeight: {
    extraLight: 100,
    light: 300,
    regular: 400,
    medium: 500,
    semiBold: 600,
    bold: 700,
    extraBold: 800,
    black: 900,
  },
  border: {
    width: {
      small: '1px',
      medium: '2px',
      large: '3px',
    },
    radius: {
      small: '4px',
      medium: '8px',
      large: '12px',
      pill: '32px',
    },
  },
  shadow: (size: string, color: string) => {
    switch (size) {
      case 'small':
        return `0px 4px 24px 0px ${color}`
      case 'medium':
        return `0px 4px 24px 0px ${color}`
      case 'large':
        return `0px 4px 24px 0px ${color}`
      case 'extraLarge':
        return `10px 10px 40px 0px ${color}`
      case 'huge':
        return `8px 8px 60px 0px ${color}`
      case 'boxShadow':
        return `0px 32px 120px 0px ${color}`
    }
  },
  breakpoints: {
    mobile: '480px',
    tablet: '768px',
    desktop: '1024px',
    largeDesktop: '1440px',
  },
  text: {
    primary: '#00152E',
    secondary: '#00152E70',
    tertiary: '#14AE65',
  },
}
export type Theme = typeof theme
