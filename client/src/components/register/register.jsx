import React, { Component } from 'react';
import { OktaAuth } from '@okta/okta-auth-js';
import { withRouter } from 'react-router-dom';
import { Paper, Button, Typography, Input, InputLabel, FormControl, FormHelperText, Container } from '@material-ui/core';
import { MuiThemeProvider, CssBaseline } from '@material-ui/core';
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      nickName: '',
      email: '',
      sessionToken: null,
      message: '',
      dupError: ''
    };

    this.oktaAuth = new OktaAuth({
      issuer: props.issuer
    });

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleNickNameChange = this.handleNickNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
  }

  handleNickNameChange(e) {
    this.setState({ nickName: e.target.value });
  }
  handleEmailChange(e) {
    this.setState({ email: e.target.value });
  }

  async handleSubmit(e) {
    e.preventDefault();

    this.setState({
      error: '',
    });

    let response = await fetch('/api/users/create', {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    });

    let body = await response.json();

    if (response.status !== 201) {
      return this.setState({
        message: 'Error registering'
      });
    }

    this.props.history.push('/login');
  }

  render() {

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
          <Typography>Create Account</Typography>
          <form onSubmit={this.handleSubmit}>
            <div>
              <FormControl style={{width: '100%'}}>
                <InputLabel htmlFor="email">Email address</InputLabel>
                <Input id="email" type="text" value={this.state.email} onChange={this.handleEmailChange}/>
              </FormControl>
            </div>
            <div>
              <FormControl style={{width: '100%'}}>
                <InputLabel htmlFor="nickName">Nickname</InputLabel>
                <Input id="nickName" type="text" value={this.state.nickName} onChange={this.handleNickNameChange}/>
              </FormControl>
            </div>
            <div>
              <Typography style={{marginTop: '1rem'}}>{this.state.message}</Typography>
            </div>
            <div style={{marginTop: '1rem'}}>
              <Button variant="contained" color="primary" type="submit">
                Get Verification Email
              </Button>
            </div>
          </form>
        </Paper>
      </Container>
      </MuiThemeProvider>
    );
  }
}

export default withRouter(Register);
