import {createTheme} from "@mui/material";

const theme = createTheme({
    palette: {
        primary: {
            main: '#943c93'
        }
    },
    typography: {
        h2: {
            fontSize: '3rem',
            textTransform: 'capitalize'
        }
    },
});

export default theme;