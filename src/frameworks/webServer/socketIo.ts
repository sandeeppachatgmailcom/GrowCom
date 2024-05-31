import { Server, Socket } from 'socket.io';

interface User {
    userId: string;
    socketId: string;
    lastSeen?: Date;
    online?: boolean;
}

function initializeSocket(server: any) {
   
    const io = new Server(server, {
        cors: {
          origin: "*",
          // credentials: true,
          methods: ["GET", "POST"],
          // optionsSuccessStatus: 204,
        },
      });

    
    let users: User[] = [];

    const addUser = (userId: string, socketId: string) => {
        const existingUser = users.find(user => user.userId === userId);
        if (existingUser) {
            existingUser.socketId = socketId;
            existingUser.online = true;
        } else {
            users.push({ userId, socketId, online: true });
        }
        io.emit("usersOnline", users.filter(user => user.online));
    };

    const removeUser = async (socketId: string) => { // Mark function as async
        const user = users.find(user => user.socketId === socketId);
        if (user) {
            user.lastSeen = new Date();
            user.online = false;
            try {
                // await conversationRepository.updateUserLastSeen(user.userId, user.lastSeen);
                io.emit("userStatusChanged", { userId: user.userId, lastSeen: user.lastSeen, online: false });
            } catch (error) {
                console.error("Failed to update user last seen:", error);
            }
        }
        io.emit("usersOnline", users.filter(user => user.online));
    };

    const getUser = (userId: string) => users.find(user => user.userId === userId);

    io.on("connection", (socket: Socket) => {
        console.log("a new user connected ",socket.id)
        io.emit("message","My new Message")
        socket.on("message", (message) => {
                console.log(message,'messahe')
            io.emit("getUsers", );
          });
  
          socket.on("user-message", (message) => {
            console.log(message,'messaasddfasdhe')
            const temp = {
              ...message,
              senderMessage:message.receiverMessage,
              receiverMessage:message.senderMessage,
              senderId:message.receiverId,
              receiverId:message.senderId
            }
          io.emit("user-message",temp);
        });
  
        }
      )
}

export default initializeSocket;