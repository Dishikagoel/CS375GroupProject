import { TextField, Typography, Container, Stack } from "@mui/material";
import { useState } from 'react';
import SendBid from './send-bid';

const OpenBid = ({ socket, numBidders, currentUserID, auctionID }) => {
    currentUserID = parseInt(currentUserID);
    const currentUser = numBidders.find(bidder => bidder.userID === currentUserID);
    const [bid, setBid] = useState(currentUser.bid);
    const [logs, setLogs] = useState([]);


    const initialInputValues = {};
    for (let i=0; i < numBidders.length; i++) {
        initialInputValues[numBidders[i].userID] = numBidders[i].bid;
    }

    const [inputValues, setInputValues] = useState(initialInputValues);


    const handleInputChange = (userId, newValue) => {
        setInputValues((prevInputValues) => ({
          ...prevInputValues,
          [userId]: newValue,
        }));
      };


    socket.on('receive-bid', ({ auctionID, currentBidderID, currentBidderName, bid, bidtime }) => {
        const message = `Auction ${auctionID} received bid ${bid} from bidder ${currentBidderName} at ${bidtime}`;
        setLogs(logs.concat(message));
        setBid(bid);
        handleInputChange(currentBidderID, bid);
    });

    return (
        <div>
            <Container>
                <Typography variant="h2" align="center" color="textPrimary" gutterBottom>
                    Open Bid
                </Typography>
                <Stack spacing={2}>
                    {numBidders.map((bidder) => ( 
                        <TextField 
                            id="outlined-basic"
                            key={bidder.userID}
                            label={bidder.name}
                            value={inputValues[bidder.userID]}
                            InputProps={{
                                readOnly: true,
                                style: { cursor: 'default', backgroundColor: '#ffffff' }, // Adjust styling as needed
                            }}
                        />
                    ))}
                </Stack>
                <SendBid socket={socket} currentBidder={currentUser} auctionID={auctionID} />
                {logs.map((event) => (
                    <Typography align="center" color="textSecondary" paragraph>{event}</Typography>
                ))}
            </Container>
        </div>
    );
}

export default OpenBid;
