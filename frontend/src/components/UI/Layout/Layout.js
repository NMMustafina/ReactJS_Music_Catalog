import React from 'react';
import {Outlet} from 'react-router-dom';
import {Container} from "@mui/material";
import Header from "../Header/Header";

const Layout = () => {
    return (
        <>
            <Header/>
            <Container sx={{my: 8}}>
                <Outlet/>
            </Container>
        </>
    );
};

export default Layout;