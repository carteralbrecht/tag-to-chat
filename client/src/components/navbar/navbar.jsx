import { useOktaAuth } from '@okta/okta-react';
import React from 'react';

import { useHistory } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, Button, Link } from '@material-ui/core';

const Navbar = () => {
  const { authState, authService } = useOktaAuth();
  const history = useHistory();

  const login = async () => history.push('/login');
  const register = async () => history.push('/register');
  const logout = async () => authService.logout('/');

  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }));

  const classes = useStyles();

  return (
    <div className={classes.root}>
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" className={classes.title}>
                  <Link color="inherit" underline="none" href="/">
                  Chat App
                  </Link>
                </Typography>
                {authState.isAuthenticated && <Button color="inherit" id="chat-button" as="a" href="/chat">Chat</Button>}
                {authState.isAuthenticated && <Button color="inherit" id="logout-button" as="a" onClick={logout}>Logout</Button>}
                {!authState.isPending && !authState.isAuthenticated && <Button color="inherit" as="a" onClick={login}>Login</Button>}
                {!authState.isPending && !authState.isAuthenticated && <Button color="inherit" as="a" onClick={register}>Register</Button>}
            </Toolbar>
        </AppBar>
    </div>
  );
};
export default Navbar;