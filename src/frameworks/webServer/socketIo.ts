import { SocketType } from "dgram";
import { disconnect } from "process";
import { Server, Socket } from "socket.io";

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
    const existingUser = users.find((user) => user.userId === userId);
    if (existingUser) {
      existingUser.socketId = socketId;
      existingUser.online = true;
    } else {
      userId ? users.push({ userId, socketId, online: true }) : "";
    }

    io.emit("usersOnline", users);
  };
  const removeUser = async (socketId: string) => {
    // Mark function as async
    const user = users.find((user) => user.socketId === socketId);
    if (user) {
      user.lastSeen = new Date();
      user.online = false;
      try {
        // await conversationRepository.updateUserLastSeen(user.userId, user.lastSeen);
        io.emit("userStatusChanged", {
          userId: user.userId,
          lastSeen: user.lastSeen,
          online: false,
        });
      } catch (error) {
        console.error("Failed to update user last seen:", error);
      }
    }

    io.emit(
      "usersOnline",
      users.filter((user) => user.online)
    );
  };
  const getUser = (userId: string) =>
    users.find((user) => user.userId === userId);

  const handleCallResPonce = async (socket: Socket, message: any) => {
    console.log(message, "message ");
    const receiver: User = getUser(message?.user?.email);
    socket.to(receiver?.socketId as string).emit("CallResponce", message.offer);
  };

  io.on("connection", (socket: Socket) => {
    console.log("new connection", socket.id);

    socket.on("room:join", (data) => {
      const { email, room, to } = data;
      console.log(data);
      emailToSocketIdMap.set(email, socket.id);
      socketidToEmailMap.set(socket.id, email);
      const toId = getUser(to);
      io.to(room).emit("user:joined", { email, id: socket.id, room: room });

      if (room != to) {
        io.to(toId?.socketId).emit("user:callRequest", {
          from: email,
          email,
          id: socket.id,
        });
      }
      socket.join(room);
      io.to(socket.id).emit("room:join", data);
    });
    socket.on("user:call", ({ to, offer }) => {
      console.log(to,'toto')
      io.to(to).emit("incomming:call", { from: socket.id, offer });
    });

    socket.on("call:accepted", ({ to, ans }) => {
      io.to(to).emit("call:accepted", { from: socket.id, ans });
    });

    socket.on("peer:nego:needed", ({ to, offer }) => {
      console.log("peer:nego:needed", offer);
      io.to(to).emit("peer:nego:needed", { from: socket.id, offer });
    });

    socket.on("peer:nego:done", ({ to, ans }) => {
      console.log("peer:nego:done", ans);
      io.to(to).emit("peer:nego:final", { from: socket.id, ans });
    });

    socket.on("addUser", (user) => {
      addUser(user.userid, socket.id);
    });
    socket.on("message", (message) => {});
    socket.on("logout", function () {
      removeUser(socket.id);
    });
    socket.on("send-message", (message: {}) => {
      const user = getUser(message.receiverId);
      socket.to(user?.socketId).emit("send-message", message);
    });

    socket.on("disconnect", function () {
      removeUser(socket.id);
    });
  });
}

export default initializeSocket;
