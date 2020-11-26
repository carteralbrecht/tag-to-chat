const express = require('express');
const app = express();
const http = require('http').Server(app);
const path = require('path');
const io = require('socket.io')(http);

const validateToken = require('./api/lib/validateToken');

const uri = process.env.MONGODB_URI;
const port = process.env.PORT || 5000;

const mongoose = require('mongoose');
const Room = require('./models/Room');

const usersRouter = require('./api/routes/users');
const roomsRouter = require('./api/routes/rooms');
const authRouter = require('./api/routes/auth');

mongoose.connect(uri, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'client', 'build')));

app.use('/api/users', usersRouter);
app.use('/api/rooms', roomsRouter);
app.use('/api/auth', authRouter);

io.on('connection', (socket) => {
  socket.on('joinRoom', async (accessToken) => {
    const {claims} = await validateToken(accessToken);
    const {roomActive, nickName, email} = claims;

    socket.join(roomActive);
    io.to(roomActive).emit('push',
        `${nickName ? nickName : email} has joined the room`,
    );
  });

  socket.on('leaveRoom', async (accessToken) => {
    const {claims} = await validateToken(accessToken);
    const {roomActive, nickName, email} = claims;

    socket.leave(roomActive);
    io.to(roomActive).emit('push',
        `${nickName ? nickName : email} has left the room`,
    );
  });


  // Listen to connected users for a new message.
  socket.on('message', async (msg) => {
    const {accessToken, content} = msg;
    const {claims} = await validateToken(accessToken);
    const {roomActive, nickName, email} = claims;

    const conditions = {'_id': roomActive};

    // TODO: XSS protection

    const newMessage = {
      name: nickName ? nickName : email,
      content,
    };

    const update = {
      $addToSet: {
        messages: newMessage,
      },
    };

    /*
      TODO: 
        1. Pull max of 'x' messages
        2. Remove join code from resposne
    */

    let room;
    try {
      room = await Room.findOneAndUpdate(conditions, update, {new: true});
    } catch (err) {
      console.log(err);
      return socket.emit('messageError', {err});
    }

    if (!room) return socket.emit('messageError', 'Unknown error');

    /*
      Adding message in client can cause a problem
      where the message send fails on server and
      client adds message anyway.

      Instead of sending a message send confirmation
      to the client, the client just recieves the
      message with everyone else in room.
    */
    io.to(roomActive).emit('push', newMessage);
  });
});

http.listen(port, () => {
  console.log('listening on *:' + port);
});
