const { Server } = require('socket.io');

module.exports = (server) => {
    const io = new Server(server, {
        cors: {
            origin: 'http://localhost:5173',
            methods: ['GET', 'POST'],
        }
    });

    io.on('connection', (socket) => {
        console.log(`A user connected: ${socket.id}`);
        
        socket.on('send-bid', (data) => {

            io.emit('receive-bid', data);
        })

    })
}
