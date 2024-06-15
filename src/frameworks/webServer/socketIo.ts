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
    const emailToSocketIdMap = new Map();
    const socketidToEmailMap = new Map();

    let users: User[] = [];
   
    const io = new Server(server, {
        cors: {
          origin: "*",
          // credentials: true,
          methods: ["GET", "POST"],
          // optionsSuccessStatus: 204,
        },
      });
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
    const getUser = (userId: string) => users.find(user => user.userId === userId);

    const handleCallResPonce = async (socket:Socket ,message:any)=>{
        console.log(message,'message ')
        const receiver :User = getUser(message?.user?.email)
        socket.to(receiver?.socketId as string).emit("CallResponce",message.offer)
    }

    io.on("connection", (socket: Socket) => {
        console.log('new connection',socket.id)
        socket.on("addUser",(user)=>{
            addUser(user.userid,socket.id)
        })
       
        socket.on("message", (message) => {
        });
              
        socket.on('logout', function() {
            removeUser(socket.id)
            })   
        socket.on("send-message",(message:{})=>{
            const user = getUser(message.receiverId);
            socket.to(user?.socketId).emit("send-message",message)
        })

        socket.on("room:join", (data) => {
            const { email, room } = data;
            const toAddress = getUser(email)
            console.log(toAddress,'--------------------************-------------')
            emailToSocketIdMap.set(email, socket.id);
            socketidToEmailMap.set(socket.id, email);
            console.log(toAddress?.socketId,'toAddress?.socketId')
            io.to(toAddress?.socketId).emit("user:joined", { email, id: socket.id });
            socket.join(toAddress?.socketId);
            io.to(socket.id).emit("room:join", data);
          }); 
          socket.on("user:call", ({ from,to, offer }) => {
            console.log(to,offer,'to,offerto,offer')
            const toSocketId = getUser(to)
            console.log(toSocketId,'toSocketId',users)
            io.to(toSocketId?.socketId).emit("incomming:call", { from, offer });
          });
          socket.on("call:accepted", ({from, to, ans }) => {
            console.log(to,ans,'to,ansto,ans')
            const toid = getUser(to)
            io.to(toid.socketId).emit("call:accepted", { from: from, ans });
          });
          socket.on("peer:nego:needed", ({ from,to, offer }) => {
            console.log("peer:nego:needed", offer,to);
            const toid = getUser(to)
            console.log(toid?.socketId,'toidtoidtoidtoid',from ,to )
            io.to(toid?.socketId).emit("peer:nego:needed", { from: from, offer });
          });
        
          socket.on("peer:nego:done", ({ from,to, ans }) => {
            console.log("peer:nego:done", from , to ,ans);
            const toid = getUser(to)
            io.to(toid?.socketId).emit("peer:nego:final", { from: socket.id, ans });
          });
           
        socket.on('disconnect', function() {
            removeUser(socket.id)
            }) 
        }


      )
}

export default initializeSocket;