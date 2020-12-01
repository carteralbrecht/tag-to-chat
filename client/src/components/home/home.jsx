import React, { Component } from 'react';
import { withOktaAuth } from '@okta/okta-react';

import { Container, Paper, Typography, MuiThemeProvider, CssBaseline} from '@material-ui/core';
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";

class Home extends Component {

  render() {
    if (this.props.authState.isPending) {
      return <div>Loading...</div>;
    }

    // Controls the theme of the page itself behind all elements
    const pageTheme = createMuiTheme({
      palette: {
        background: {
          default: "#303030" // darker grey color for background
        }
      }
    });

    return (
      <MuiThemeProvider theme={pageTheme}>
      <CssBaseline />
      <Container maxWidth="sm" style={{marginTop: '5rem'}}>
        <Paper style={{padding: '2rem', textAlign: 'center'}}>
          <Typography variant="h2">
            Welcome to Chat App
          </Typography>
        </Paper>
      </Container>
      </MuiThemeProvider>
    );
  }
};

export default withOktaAuth(Home);
