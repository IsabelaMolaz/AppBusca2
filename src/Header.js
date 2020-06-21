import React from 'react';
import { AppBar, Typography, Toolbar } from '@material-ui/core';

function Header () {

    return (
        <AppBar position="fixed" style={{marginBottom: '80px'}}>
            <Toolbar>
                <Typography variant="h6">
                App de Busca
                </Typography>
            </Toolbar>
        </AppBar>
   )
}

export default Header;
