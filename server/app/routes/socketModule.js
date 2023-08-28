const { Server } = require('socket.io');
const pool = require('../db');

let auctionRoom = '';
let allBidders = [];

module.exports = (server) => {
    const io = new Server(server, {
        cors: {
            origin: 'http://localhost:5173',
            methods: ['GET', 'POST'],
        }
    });

    io.on('connection', (socket) => {
        console.log(`A user connected: ${socket.id}`);

        socket.on('join_room', (data) => {
            const { userid, room } = data;
            socket.join(room);

            auctionRoom = room;
            allBidders.push({ id: socket.id, userid, room });

            socket.on('send-bid', (data) => {
                const { auctionID, currentBidderID, currentBidderName, bid, bidtime } = data;
    
                const timestampInSeconds = Math.floor(bidtime / 1000);
                const postgresTimestamp = new Date(timestampInSeconds * 1000).toISOString();
    
                const bidData = [currentBidderID, auctionID, postgresTimestamp, bid];
                const updateQuery = `
                    UPDATE bid
                    SET submittedtime = $3, finalbid = $4
                    WHERE userid = $1 AND auctionid = $2;
                `;
                pool.query(updateQuery, bidData, (error, result) => {
                    if (error) {
                        console.error("Error querying database:", error);
                        socket.emit('receive-bid', { error: "An error occurred while submitting bid." });
                    }
                });
                io.in(room).emit('receive-bid', data);

                socket.on('disconnect', () => {
                    console.log('User disconnected:', socket.id);
                    socket.off('send-bid');
                });
            });
        });
        
    });
}
