import React, { Component } from 'react';
import config from '../../config';
import io from 'socket.io-client';

import { withOktaAuth } from '@okta/okta-react';

import {Grid, Paper, Typography, Button, Toolbar, IconButton, AppBar} from '@material-ui/core';

import BottomBar from './bottomBar';
import './chat.css';
import CloseIcon from "@material-ui/icons/Close";

class Chat extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);

    this.state = {
      chat: [], // messages in the chat
      content: '', // what is in the bottom bar
      nickname: this.props.nickname,
    };
  }

  async componentDidUpdate() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  async componentDidMount() {
    this._isMounted = true;

    // Update the chat if a new message is broadcasted.
    this.props.socket.on('push', (msg) => {
      this.setState((state) => ({
        chat: [...state.chat, msg],
      }), this.scrollToBottom);
    });
  }

  // Save the message the user is typing in the input field.
  handleContent(event) {
    this.setState({
      content: event.target.value,
    });
  }

  async handleSubmit(event) {
    // Prevent the form to reload the current page.
    event.preventDefault();

    const accessToken = await this.props.authService.getAccessToken();
    const content = this.state.content;

    // Send the new message to the server.
    this.props.socket.emit('message', {
      accessToken,
      content
    });

    this.setState({content: ''});
  }

  // Always make sure the window is scrolled down to the last message.
  scrollToBottom() {
    const chat = document.getElementById('chat');
    chat.scrollTop = chat.scrollHeight;
  }

  render() {
    return (
      <div>
        <AppBar>
          <Toolbar>
            <IconButton edge="end" color="inherit" onClick={this.handleChatClose}>
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
            <div className="Chat">
              <Paper id="chat" elevation={3}>
                {this.state.chat.map((el, index) => {
                  return (
                    <div key={index}>
                      <Typography variant="caption" className="name">
                        {el.name}
                      </Typography>
                      <Typography variant="body1" className="content">
                        {el.content}
                      </Typography>
                    </div>
                  );
                })}
              </Paper>
              <BottomBar
                content={this.state.content}
                handleContent={this.handleContent.bind(this)}
                handleSubmit={this.handleSubmit.bind(this)}
                nickname={this.state.nickname}
              />
            </div>
      </div>
    );
  }
};

export default withOktaAuth(Chat);
