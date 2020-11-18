import React, { Component } from 'react';
import { withOktaAuth } from '@okta/okta-react';

import { Container, Paper, Typography} from '@material-ui/core';

class Home extends Component {

  render() {
    if (this.props.authState.isPending) {
      return <div>Loading...</div>;
    }

    return (
      <Container maxWidth="sm" style={{marginTop: '5rem'}}>
        <Paper style={{padding: '2rem', textAlign: 'center'}}>
          <Typography variant="h2">
            Welcome to Chat App
          </Typography>
        </Paper>
      </Container>
    );
  }
};

export default withOktaAuth(Home);