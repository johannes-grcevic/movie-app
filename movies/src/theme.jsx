import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#7fbc50',
        },
        secondary: {
            main: '#aedf89',
        },
        text: {
            primary: '#141810',   // Default body and heading text
            secondary: '#555555', // Subtitles and captions
        },
    },
    typography: {
        fontFamily: 'Inter, sans-serif',
        h1: {
            fontFamily: '"Playfair Display", serif',
            fontWeight: 700,
        },
    },
});

export default theme;