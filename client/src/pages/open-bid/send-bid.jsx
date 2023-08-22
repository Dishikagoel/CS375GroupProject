import { Button, TextField, Container } from "@mui/material";
import { useState } from 'react';

const SendBid = ({ socket, currentBidder, auctionID }) => {
    const [bid, setBid] = useState('');
    const currentBidderID = currentBidder.userID;
    const currentBidderName = currentBidder.name;

    const sendBid = () => {
        if (bid !== '') {
            const bidtime = Date.now();
            socket.emit('send-bid', { auctionID, currentBidderID, currentBidderName, bid, bidtime });
            setBid('');
        } 
    }

    return (
        <div>
            <Container>
                <TextField 
                    id="outlined-basic"
                    key={currentBidder.userID}
                    label={`You are: ${currentBidder.name}`}
                    value={bid}
                    onChange={(e) => setBid(e.target.value)}
                />
                <Button variant="contained" onClick={sendBid}>Submit bid</Button>
            </Container>
        </div>
    );
};

export default SendBid;