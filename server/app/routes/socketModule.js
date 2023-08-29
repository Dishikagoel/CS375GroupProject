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

            const sendBidHandler = (data) => {
                const { auctionID, currentBidderID, currentBidderName, bid, bidtime } = data;
                const timestampInSeconds = Math.floor(bidtime / 1000);
                const postgresTimestamp = new Date(timestampInSeconds * 1000).toISOString();
                console.log('Bid received:', data);
                const bidData = [currentBidderID, auctionID, postgresTimestamp, bid];
                const updateQuery = `
                    UPDATE bid
                    SET submittedtime = $3, finalbid = $4
                    WHERE userid = $1 AND auctionid = $2;
                `;
                /* pool.query(updateQuery, bidData, (error, result) => {
                    if (error) {
                        console.error("Error querying database:", error);
                        socket.emit('receive-bid', { error: "An error occurred while submitting bid." });
                    }
                }); */
                io.in(auctionRoom).emit('receive-bid', data);
            }

            const sendMessageHandler = (data) => {
                // {userid: '401', sender: "me", message: 'I am fine'}
                const { userid, sender, message } = data;
                console.log('Message received:', data);
                io.in(auctionRoom).emit('receive_message', data);
            }

            socket.on('join_room', (data) => {
                const { userid, room } = data;
                socket.join(room);

                auctionRoom = room;
                allBidders.push({ id: socket.id, userid, room });

                socket.once('send-bid', sendBidHandler);
                socket.once('send_message', sendMessageHandler);
            });    
        
        socket.on('disconnect', () => {
            console.log('User disconnected:', socket.id);
            socket.leave(auctionRoom);
            socket.removeAllListeners();
        });
    });
}
