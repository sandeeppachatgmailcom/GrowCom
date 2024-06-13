import { SocketType } from 'dgram';
import { disconnect } from 'process';
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
            userId? users.push({ userId, socketId, online: true }):''
        }
      
        io.emit("usersOnline", users);
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

    const handleCallResPonce = async (socket:Socket ,message:any)=>{
        console.log(message,'message ')
        const receiver :User = getUser(message?.user?.email)
        socket.to(receiver?.socketId as string).emit("CallResponce",message.offer)
    }
  

 
    const getUser = (userId: string) => users.find(user => user.userId === userId);

    io.on("connection", (socket: Socket) => {
        console.log('new connection',socket.id)
        socket.on("addUser",(user)=>{
            addUser(user.userid,socket.id)
        })
        socket.on("dialACall",(message)=>{
            console.log(message.message.data ,'call received from front')
           
            const user = getUser(message.message.data.receiverId) 
            socket.to(user?.socketId).emit('incomingCall',message)
        });
        socket.on("endCall",(message)=>{
            console.log(message,'end Call') 
            const user = getUser(message.receiverId)
            console.log(user)
            socket.to(user?.socketId).emit("endCurrentCall",message)

        })
        socket.on("CallResPonce",(message)=>{
            console.log(message,'CallResPonce')
            const receiver = getUser(message?.user?.email)
            socket.to(receiver?.socketId as string).emit("takeCallResponce",message.offer)
        })
        socket.on("message", (message) => {
        });
        socket.on('disconnect', function() {
        removeUser(socket.id)
        })       
        socket.on('logout', function() {
            removeUser(socket.id)
            })   
        socket.on("send-message",(message:{})=>{
            const user = getUser(message.receiverId);
            socket.to(user?.socketId).emit("send-message",message)
        })
        }

      )
}

export default initializeSocket;