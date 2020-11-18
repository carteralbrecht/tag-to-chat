import React, { Component } from 'react';
import { OktaAuth } from '@okta/okta-auth-js';
import { withOktaAuth } from '@okta/okta-react';
import { Paper, Button, Typography, Input, InputLabel, FormControl, Container } from '@material-ui/core';

class SignInForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      sessionToken: null,
      error: ''
    };

    this.oktaAuth = new OktaAuth({
      issuer: props.issuer
    });

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  async handleSubmit(e) {
    e.preventDefault();
    let response;
    try {
      response = await this.oktaAuth.signIn({
        username: this.state.username,
        password: this.state.password
      });
    } catch (err) {
      return this.setState({ 
        error: 'Authentication error' 
      });
    }

    const sessionToken = response.data.sessionToken;
    this.setState({ 
      sessionToken 
    });

    this.props.authService.redirect({sessionToken});
  }

  handleUsernameChange(e) {
    this.setState({username: e.target.value});
  }

  handlePasswordChange(e) {
    this.setState({password: e.target.value});
  }

  render() {
    if (this.state.sessionToken) {
      return null;
    }

    return (
      <Container maxWidth="sm" style={{marginTop: '5rem'}}>
        <Paper style={{padding: '2rem', textAlign: 'center'}}>
          <Typography>Login</Typography>
          <form onSubmit={this.handleSubmit}>
            <div>
              <FormControl style={{width: '100%'}}>
                <InputLabel htmlFor="email">Email address</InputLabel>
                <Input id="email" type="text" value={this.state.username} onChange={this.handleUsernameChange}/>
              </FormControl>
            </div>
            <div>
              <FormControl style={{width: '100%'}}>
                <InputLabel htmlFor="password">Password</InputLabel>
                <Input id="password" type="password" value={this.state.password} onChange={this.handlePasswordChange}/>
              </FormControl>
            </div>
            <div>
              <Typography style={{marginTop: '1rem'}}>{this.state.error}</Typography>
            </div>
            <div style={{marginTop: '1rem'}}>
              <Button variant="contained" color="primary" type="submit">
                Login
              </Button>
            </div>
          </form>
        </Paper>
      </Container>
    );
  }
};

export default withOktaAuth(SignInForm);