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
    components: {
        MuiTextField: {
            defaultProps: {
                variant: 'outlined',
                fullWidth: true,
            }
        }
    },
});

export default theme;