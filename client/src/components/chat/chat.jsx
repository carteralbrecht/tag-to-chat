import React, { Component } from 'react';
import config from '../../config';
import io from 'socket.io-client';

import { withOktaAuth } from '@okta/okta-react';

import {Grid, Paper, Typography, Button} from '@material-ui/core';

import BottomBar from './bottomBar';
import './chat.css';

async function checkUser() {
  if (this.props.authState.isAuthenticated) {
    const userInfo = await this.props.authService.getUser();
    console.log(userInfo);
    this.setState({ userInfo });
  }
}

async function updateRooms() {
  const accessToken = await this.props.authService.getAccessToken();
  const response = await fetch('/api/rooms', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  });

  const rooms = await response.json();
  this.setState({ rooms })
}

class Chat extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);

    this.state = {
      chat: [],
      content: '',
      rooms: []
    };

    this.checkUser = checkUser.bind(this);
    this.updateRooms = updateRooms.bind(this);
  }

  async componentDidUpdate() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  async componentDidMount() {
    this._isMounted = true;
    await this.checkUser();
    await this.updateRooms();

    this.socket = io(config[process.env.NODE_ENV].endpoint);

    // Load the last 10 messages in the window.
    this.socket.on('init', (msg) => {
      let msgReversed = msg.reverse();
      this.setState((state) => ({
        chat: [...state.chat, ...msgReversed],
      }), this.scrollToBottom);
    });

    // Update the chat if a new message is broadcasted.
    this.socket.on('push', (msg) => {
      this.setState((state) => ({
        chat: [...state.chat, msg],
      }), this.scrollToBottom);
    });
  }

  async handleJoinRoom(roomId) {
    const accessToken = await this.props.authService.getAccessToken();
    const response = await fetch(`/api/rooms/join/${roomId}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });

    const room = await response.json();
    console.log(room);

    alert('Join room successful');
  }

  // Save the message the user is typing in the input field.
  handleContent(event) {
    this.setState({
      content: event.target.value,
    });
  }

  handleSubmit(event) {
    // Prevent the form to reload the current page.
    event.preventDefault();

    // Send the new message to the server.
    this.socket.emit('message', {
      name: this.state.nickname,
      content: this.state.content,
    });

    this.setState((state) => {
      // Update the chat with the user's message and remove the current message.
      return {
        chat: [...state.chat, {
          name: state.nickname,
          content: state.content,
        }],
        content: '',
      };
    }, this.scrollToBottom);
  }

  // Always make sure the window is scrolled down to the last message.
  scrollToBottom() {
    const chat = document.getElementById('chat');
    chat.scrollTop = chat.scrollHeight;
  }

  render() {
    return (
      <div>
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
            </div>
      </div>
    );
  }
};

export default withOktaAuth(Chat);
