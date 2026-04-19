import { Server } from "socket.io";

let messages = {};
// Ex: 
// messages = {
//  "/room1":[
//    {sender:"John", data:"Hello", socket-id-sender:"abc123"},
//    {sender:"Mike", data:"Hi", socket-id-sender:"xyz456"}
//  ]
// }

let timeOnline = {};
// Ex:
// timeOnline = {
//  "socket123": Date,
//  "socket456": Date
// }

export const connectToSocket = (server) => {

    const io = new Server(server, {
        cors: {
            origin: "*",
            methods: ['GET', 'POST'],
            allowedHeaders: ['*'],
            credentials: true
        }
    });

    io.on("connection", (socket) => {

        // JOIN CALL
        socket.on("join-call", async (path) => {

            // join socket.io room
            socket.join(path);

            // store join time
            timeOnline[socket.id] = new Date();

            const clients = await io.in(path).fetchSockets();
            const clientIds = clients.map(s => s.id);
            // notify others
            socket.to(path).emit("user-joined", socket.id, clientIds);

            // send previous chat messages
            if (messages[path]) {
                messages[path].forEach(msg => {
                    socket.emit(
                        "chat-message",
                        msg.data,
                        msg.sender,
                        msg.socketId
                    );
                });
            }

        });


        // SIGNAL (WebRTC)
        socket.on("signal", (toId, message) => {
            io.to(toId).emit("signal", socket.id, message);
        });


        // CHAT MESSAGE
        socket.on("chat-message", (data, sender) => {

            // find room of this socket
            const rooms = [...socket.rooms];
            const room = rooms[1]; // first is socket.id, second is actual room

            if (!room) return;

            // create room message storage if needed
            if (!messages[room]) {
                messages[room] = [];
            }

            // store message
            messages[room].push({
                sender,
                data,
                socketId: socket.id
            });

            console.log("message", room, ":", sender, data);

            // send message to everyone in room
            io.to(room).emit("chat-message", data, sender, socket.id);

        });


        // DISCONNECT
        socket.on("disconnect", () => {

            const rooms = [...socket.rooms];
            const room = rooms[1];

            const diffTime = Math.abs(
                (timeOnline[socket.id] || new Date()) - new Date()
            );

            if (room) {

                socket.to(room).emit("user-left", socket.id);

                if (messages[room] && messages[room].length === 0) {
                    delete messages[room];
                }

            }

        });

    });

    return io;
};