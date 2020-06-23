import React from 'react';
import { AppBar, Typography, Toolbar, CssBaseline } from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#e91e63',
    },
    secondary: {
      main: '#fff59d',
    },
  },
  typography: {
    fontFamily: 'Raleway',
    fontSize: 20,
  },
});

function Header () {

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline>
        <AppBar color="primary" position="fixed" style={{marginBottom: '80px'}}>
            <Toolbar >
                <Typography variant="h6">
                App de Busca
                </Typography>
            </Toolbar>
        </AppBar>
        </CssBaseline>
        </ThemeProvider>
   )
}

export default Header;
