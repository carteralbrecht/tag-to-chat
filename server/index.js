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

mongoose.connect(uri, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'client', 'build')));

app.use('/api/users', usersRouter);
app.use('/api/rooms', roomsRouter);

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

    let room;
    try {
      room = await Room.findOneAndUpdate(conditions, update, {new: true});
    } catch (err) {
      console.log(err);
      return socket.emit('messageError', {err});
    }

    // push to all in the room except self
    // https://stackoverflow.com/questions/10058226/send-response-to-all-clients-except-sender
    socket.broadcast.in(roomActive).emit('push', msg);
  });
});

http.listen(port, () => {
  console.log('listening on *:' + port);
});
