
import express from 'express';
import http from 'http';
import { Server as SocketIOServer, Socket } from 'socket.io';
import mongoose from 'mongoose';

const app = express();
const server = http.createServer(app);
const io = new SocketIOServer(server);

  
 
interface Message {
  message: string;
  roomId: string;
}

io.on('connection', (socket: Socket) => {
  console.log('A user connected');

  // Handle events emitted from the client
    socket.on('joinRoom', (roomId: string) => {
    socket.join(roomId);
    console.log('User joined room:', roomId);

    // Broadcast a message to all users in the room (except the current user)
    socket.broadcast.to(roomId).emit('userJoined', socket.id);
  });

  socket.on('sendMessage', (message: Message) => {
    // Broadcast the message to all users in the room
    io.to(message.roomId).emit('receiveMessage', message);
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

//const PORT =  6000;
//server.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
