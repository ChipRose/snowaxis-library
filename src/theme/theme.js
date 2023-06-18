export const theme = {
  fontSize: {
    main: '1rem', //16px
    secondary: '1.1rem', //17.6px
    secondaryTitle: '1.125rem', //17.6px
    huge: '1.87rem', //29.92px
    soBig: '1.8rem', //28.8px
    big: '1.3rem', //20.8px
    middle: '0.9rem', //14.4px
    small: '0.78rem', //12.48px
    soSmall: '0.75rem'
  },
  lineHeight: {
    main: '1.5rem',
    secondary: '1rem',
    middle: '0.9rem',
    small: '0.78rem'
  },
  fontWeight: {
    main: '400',
    thin: '300',
    bold: '500',
    heavy: '600'
  },
  indent: {
    main: '8px',
    secondary: '16px',
    add: '24px',
  },
  borderRadius: {
    main: '4px',
    secondary: '8px'
  },
  mainPalette: {
    color: {
      main: '#084e8a',
      mainDark: '#003878',
      secondary: '#1dafec',
      link: '#006fbb',
      select: '#e6f7ff',
      hover:'rgba(29, 175, 236, 0.36)',
      hilight: '#4ce1b6',
      contrast: '#ffffff',
      contrast07: 'rgba(255, 255, 255, 0.7)',
      lightContrast: '#e9edf0',
      dark: '#212b36'
    },
    warning: {
      main: '#FFA500',
      secondary: 'rgba(255, 0, 0, 1)'
    },
    status: {
      error: 'rgba(255, 0, 0, 1)',
      success: 'green'
    },
    chipStatus: {
      ready: 'rgba(40,167,69,.4)',
      closed: '#dfe3e8',
      inProcess: 'rgba(255, 193, 7, 0.4)',
      cancelled: 'rgba(52,57,64,.4)',
      error: 'rgba(220, 53, 69, 0.4)'
    },
    gradient: {
      primary: 'linear-gradient(180deg,#007ace,#036cb4)',
      secondary: 'linear-gradient(180deg, #c4cdd5, #bac2c9)'
    },
    grey: {
      50: 'rgba(252, 252, 252, 1)',
      100: 'rgba(0, 0, 0, 0.125)',
      200: '#637381',
      500: '#212b36',
      main: 'rgba(0, 0, 0, 0.54)',
      secondary: '#646777',
      light: '#F1F1F1',
      lightSecondary:'#F2F2F2',
      soLight:'#f9fafb',
      veryLight: '#c8cccf',
      middle: 'rgba(181, 181, 181, 1)',
      dark: '#757575',
      border: 'rgba(0, 0, 0, 0.3)',
      tableBorder: '#e0e0e0',
      shadow: 'rgba(0, 0, 0, 0.11)'
    },
    typography: {
      main: 'rgba(0, 0, 0, 0.54)',
      mainDark: '#637381',
      secondary: '#646777',
      contrast: '#ffffff',
      soDark: '#212b36',
      dark: '#000000',
      light: '#ced4da',
    }
  },
  shadow: {
    main: '0 0 0 1px rgba(63, 63, 68, 0.05), 0 1px 3px 0 rgba(63, 63, 68, 0.15)',
    secondary:
      '0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12)',
    big: '0 2px 4px -1px rgba(0, 0, 0, 0.20), 0 4px 5px 0 rgba(0, 0, 0, 0.14), 0 1px 10px 0 rgba(0, 0, 0, 0.12)',
    chip: '0 0 4px rgba(40, 167, 69, 0.7)',
    decorative:
      '2px 2px 5px 2px rgba(63, 63, 68, 0.05), 2px 2px 5px 2px rgba(63, 63, 68, 0.15)'
  },
  border: {
    main: '1px solid rgba(0, 0, 0, 0.3)',
    secondary: '1px solid rgba(0, 0, 0, 0.125)',
    chip: '2px solid #fff',
    decorative: '3px dashed #ddd',
    accent: '5px solid #4ce1b6',
  },
  iconSize: {
    main: 24,
    secondary: 32,
    big: 38,
  },
  animation: {
    rotation: 'rotation 1.2s linear infinite',
    rotationSlow: 'rotation 5s linear infinite'
  },
  transition: {
    main: '0.3s ease-in',
  },
  typography: {
    color: '#637381'
  },
  overrides: {
    MuiFilledInput: {
      input: {
        paddingTop: '5px'
      }
    },
    MuiLinkButton: {
      color: '#70bbfd'
    }
  }
}

export default theme
