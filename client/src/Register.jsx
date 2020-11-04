import React, { Component } from 'react';
import { OktaAuth } from '@okta/okta-auth-js';
import { withOktaAuth } from '@okta/okta-react';
import { Paper, Button, Typography, Input, InputLabel, FormControl, FormHelperText, Container } from '@material-ui/core';

class Register extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      email: '',
      password: '',
      passwordDup: '',
      sessionToken: null,
      error: '',
      dupError: '',
      passwordError: ''
    };

    this.oktaAuth = new OktaAuth({
      issuer: props.issuer
    });

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handlePasswordDupChange = this.handlePasswordDupChange.bind(this);
  }

  handleEmailChange(e) {
    this.setState({ email: e.target.value });
  }
  handlePasswordChange(e) {
    this.setState({ password: e.target.value });
  }
  handlePasswordDupChange(e) {
    this.setState({ passwordDup: e.target.value });
  }

  async handleSubmit(e) {
    e.preventDefault();

    this.setState({
      error: '',
      passwordError: '',
      dupError: ''
    });

    if (this.state.password.length < 8) {
      return this.setState({
        passwordError: 'Password must be at least 8 characters'
      });
    }

    if (this.state.password !== this.state.passwordDup) {
      return this.setState({
        dupError: 'Password and Confirm Password must be the same'
      });
    }

    let response = await fetch('/api/users/create', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    });

    let body = await response.json();

    if (response.status !== 201) {
      console.log(body);
      return this.setState({
        error: 'Error registering'
      });
    }
    
    response = await this.oktaAuth.signIn({
      username: this.state.email,
      password: this.state.password
    });

    const sessionToken = response.data.sessionToken;
    this.setState({
      sessionToken
    });

    this.props.authService.redirect({sessionToken});
  }

  render() {
    return (
      <Container maxWidth="sm" style={{marginTop: '5rem'}}>
        <Paper style={{padding: '2rem', textAlign: 'center'}}>
          <Typography>Register</Typography>
          <form onSubmit={this.handleSubmit}>
            <div>
              <FormControl style={{width: '100%'}}>
                <InputLabel htmlFor="email">Email address</InputLabel>
                <Input id="email" type="text" value={this.state.email} onChange={this.handleEmailChange}/>
              </FormControl>
            </div>
            <div>
              <FormControl style={{width: '100%'}}>
                <InputLabel htmlFor="password">Password</InputLabel>
                <Input id="password" type="password" value={this.state.password} onChange={this.handlePasswordChange}/>
              </FormControl>
              <FormHelperText>{this.state.passwordError}</FormHelperText>
            </div>
            <div>
              <FormControl style={{width: '100%'}}>
                <InputLabel htmlFor="passwordDup">Confirm Password</InputLabel>
                <Input id="passwordDup" type="password" value={this.state.passwordDup} onChange={this.handlePasswordDupChange}/>
              </FormControl>
              <FormHelperText>{this.state.dupError}</FormHelperText>
            </div>
            <div>
              <Typography style={{marginTop: '1rem'}}>{this.state.error}</Typography>
            </div>
            <div style={{marginTop: '1rem'}}>
              <Button variant="contained" color="primary" type="submit">
                Register
              </Button>
            </div>
          </form>
        </Paper>
      </Container>
    );
  }
}

export default withOktaAuth(Register);