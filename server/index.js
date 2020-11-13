const express = require('express');
const app = express();
const http = require('http').Server(app);
const path = require('path');
const io = require('socket.io')(http);

const uri = process.env.MONGODB_URI;
const port = process.env.PORT || 5000;

const Message = require('./models/Message');
const mongoose = require('mongoose');

const usersRouter = require('./api/routes/users');
const roomsRouter = require('./api/routes/rooms')

mongoose.connect(uri, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'client', 'build')));

app.use('/api/users', usersRouter);
app.use('/api/rooms', roomsRouter);

io.on('connection', (socket) => {

  socket.on('joinRoom', (room) => {

    socket.join(room);

    // Get the last 10 messages from the database.
    Message.find({room: room}).sort({createdAt: -1}).limit(10).exec((err, messages) => {
      if (err) return console.error(err);

      // Send the last messages to the user.
      socket.emit('init', messages);
    });

  })


  // Listen to connected users for a new message.
  socket.on('message', (msg) => {
    // Create a message with the content and the name of the user.
    const message = new Message({
      content: msg.content,
      name: msg.name,
      room: msg.room,
    });

    // Save the message to the database.
    message.save((err) => {
      if (err) return console.error(err);
    });

    // push to all in the room except self
    //https://stackoverflow.com/questions/10058226/send-response-to-all-clients-except-sender
    socket.broadcast.in(msg.room).emit('push', msg)
  });
});

http.listen(port, () => {
  console.log('listening on *:' + port);
});
