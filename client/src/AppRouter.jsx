import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';

import { Security, SecureRoute, LoginCallback } from '@okta/okta-react';
import Home from './Home';
import SignIn from './SignIn';
import Chat from './Chat';
import Navbar from './Navbar';
import Register from './Register';

class AppRouter extends Component {
  constructor(props) {
    super(props);
    this.onAuthRequired = this.onAuthRequired.bind(this);
  }

  onAuthRequired() {
    this.props.history.push('/login');
  }
  
  render() {
    return (
        <Security issuer='https://dev-1701617.okta.com/oauth2/default'
                clientId='0oafbxrwozMdHHnSC5d5'
                redirectUri={window.location.origin + '/login/callback'}
                onAuthRequired={this.onAuthRequired}
                pkce={true} >
            <Navbar />      
            <Route path="/" exact component={Home} />
            <Route path="/login/callback" component={LoginCallback} />
            <Route path='/login' render={() => <SignIn issuer='https://dev-1701617.okta.com/oauth2/default' />} />
            <Route path='/register' render={() => <Register issuer='https://dev-1701617.okta.com/oauth2/default' />} />
            <SecureRoute path="/chat" component={Chat} />
        </Security>
    );
  }
}

export default withRouter(AppRouter);