import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import SignInForm from './SignInForm';
import { withOktaAuth } from '@okta/okta-react';

class SignIn extends Component {
  render() {
    if (this.props.authState.isPending) {
      return <div>Loading...</div>;
    }

    return this.props.authState.isAuthenticated ? 
      <Redirect to={{ pathname: '/chat' }} /> : 
      <SignInForm issuer={this.props.issuer} />;

  }
};

export default withOktaAuth(SignIn);