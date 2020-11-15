import React, { Component } from 'react';
import { OktaAuth } from '@okta/okta-auth-js';
import { withOktaAuth } from '@okta/okta-react';
import { Paper, Button, Typography, Input, InputLabel, FormControl, Container, TextField } from '@material-ui/core';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@material-ui/core';

class SignInForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      email: '',
      sessionToken: null,
      error: '',
      forgotOpen: false
    };

    this.oktaAuth = new OktaAuth({ issuer: props.issuer });

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleForgot = this.handleForgot.bind(this);
    this.handleForgotOpen = this.handleForgotOpen.bind(this);
    this.handleForgotClose = this.handleForgotClose.bind(this);
  }

  handleForgotOpen = () => this.setState({ forgotOpen: true });
  handleForgotClose = () => this.setState({ forgotOpen: false });

  handleEmailChange = (e) => this.setState({ email: e.target.value });
  handleUsernameChange = (e) => this.setState({ username: e.target.value });
  handlePasswordChange = (e) => this.setState({ password: e.target.value });

  async handleForgot() {
    let response = await fetch('/api/users/forgot', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    });

    if (response.status !== 200) {
      return this.setState({ error: 'Error forgetting password' });
    }

    return this.setState({
      error: 'Check email',
      forgotOpen: false
    });
  }

  async handleSubmit(e) {
    e.preventDefault();

    let response = await fetch('/api/users/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    });

    let body = await response.json();

    if (response.status !== 200) {
      return this.setState({ error: 'Error logging in' });
    }

    const sessionToken = body.sessionToken;
    this.setState({ sessionToken });

    this.props.authService.redirect({ sessionToken });
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

              <Button variant="contained" color="secondary" type="button" onClick={this.handleForgotOpen}>
                Forgot Password
              </Button>
            </div>
          </form>
          <Dialog open={this.state.forgotOpen} onClose={this.handleForgotClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Forgot Password</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Please enter the email associated with your account.  You will recieve an email with a link to reset your password.
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Email Address"
                type="email"
                onChange={this.handleEmailChange}
                fullWidth
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleForgotClose} color="secondary">
                Cancel
              </Button>
              <Button onClick={this.handleForgot} color="primary">
                Submit
              </Button>
            </DialogActions>
          </Dialog>
        </Paper>
      </Container>
    );
  }
};

export default withOktaAuth(SignInForm);