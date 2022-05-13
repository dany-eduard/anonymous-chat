import express from 'express';
import http from 'http';
import { Server } from 'socket.io';

const app = express();
const port = 3000;

const server = http.createServer(app);
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/views/index.html`);
});

io.on('connection', (socket) => {
  const {
    id: user,
    handshake: { address },
  } = socket;

  console.log('a user connected \nUser: %s\n', { user, address });

  socket.emit('chat', { user: socket.id, message: `it's you now, welcome to the chat!` });

  socket.on('chat', (message) => {
    console.log(`socket.id | : %s`, message);
    io.emit('chat', { user: socket.id, message });
  });
});

server.listen(port, () => {
  console.log(`Chat server listening on port ${port}!`);
});
