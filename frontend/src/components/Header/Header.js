import React from 'react';
import {AppBar, Box, Container, Toolbar, Typography} from "@mui/material";
import {Headphones} from '@mui/icons-material';

const Header = () => {
    return (
        <AppBar position="sticky" sx={{p: 2}}>
            <Container>
                <Toolbar>
                    <Box sx={{
                        flexGrow: 1,
                        display: 'flex',
                        alignItems: 'center'
                    }}>
                        <Headphones/>
                        <Typography variant="h6" component="a" href="/"
                                    sx={{
                                        ml: 2,
                                        fontWeight: 300,
                                        letterSpacing: '.2rem',
                                        textTransform: 'uppercase',
                                        color: 'inherit',
                                        textDecoration: 'none',
                                    }}>
                            Music catalog
                        </Typography>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Header;