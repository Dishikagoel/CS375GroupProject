import { Button, TextField } from "@mui/material";
import { useState } from 'react';


const SendBid = ({ socket, currentBidder, auctionID, isBidOpen }) => {
    const [bid, setBid] = useState('');
    const currentBidderID = currentBidder?.userid;
    const currentBidderName = currentBidder?.firstname + ' ' + currentBidder?.lastname;

    const sendBid = () => {
        if (bid !== '') {
            const bidtime = Date.now();
            socket.emit('send-bid', { auctionID, currentBidderID, currentBidderName, bid, bidtime });
            setBid('');
        } 
    }

    return (
        <div style={{ marginTop: 'auto' }}>
            <TextField 
                label={`You are: ${currentBidderName}`}
                value={bid}
                onChange={(e) => setBid(e.target.value)}
                variant="outlined"
                fullWidth
                disabled={!isBidOpen}
            />
            <Button variant="contained" onClick={sendBid} style={{ marginTop: '5px' }}>Submit bid</Button>
        </div>
    );
};

export default SendBid;