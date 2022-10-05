import React from 'react';
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import {makeStyles} from "tss-react/mui";
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from "react-toastify";
import {AppBar, Button, Container, Grid, Toolbar, Typography} from "@mui/material";
import {Headphones} from "@mui/icons-material";
import Anonymous from "./Menu/Anonymous";
import UserMenu from "./Menu/UserMenu";
import AddMenu from "./Menu/AddMenu";

const useStyles = makeStyles()(() => ({
    logo: {
        flexGrow: 1,
        display: 'flex',
        alignItems: 'center'
    },
    mainLink: {
        color: 'inherit',
        textDecoration: 'none',
        '&:hover': {
            color: 'inherit'
        },
        fontWeight: 300,
        letterSpacing: '.2rem',
        textTransform: 'uppercase',
    }
}));

const AppToolbar = () => {
    const {classes} = useStyles();
    const user = useSelector(state => state.users.user);

    return (
        <AppBar position="sticky" sx={{p: 2}}>
            <ToastContainer/>
            <Container>
                <Toolbar>
                    <Grid container justifyContent="space-between" alignItems="center">
                        <Grid item className={classes.logo}>
                            <Headphones/>
                            <Typography variant="h6" sx={{ml: 2}}>
                                <Link to="/" className={classes.mainLink}>
                                    Music catalog
                                </Link>
                            </Typography>
                        </Grid>

                        <Grid item>
                            {user &&
                                <Button color="inherit" component={Link} to="/track_history">
                                    Track history
                                </Button>}
                        </Grid>

                        <Grid item>
                            {user &&
                                <AddMenu/>}
                        </Grid>

                        <Grid item>
                            {user ? <UserMenu user={user}/> : <Anonymous/>}
                        </Grid>
                    </Grid>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default AppToolbar;