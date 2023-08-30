import { Paper, List, ListItem, ListItemText, Typography } from "@mui/material";
import { useEffect, useState } from 'react';
import SendBid from './send-bid';

const leftColumnStyle = {
    padding: '16px', // Adjust as needed
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '85vh'
  };


const BidPanel = ({ socket, auctionID, bidders, isBidOpen, currentBidder, inputValues, setInputValues }) => {
    const [logs, setLogs] = useState([]);
    const [bid, setBid] = useState(currentBidder?.bid);

    const handleInputChange = (userId, newValue) => {
        console.log('handleInputChange', userId, newValue);
        setInputValues((prevInputValues) => ({
          ...prevInputValues,
          [userId]: newValue,
        }));
      };

    useEffect(() => {
        const receiveBidHandler = ({ auctionID, currentBidderID, currentBidderName, bid, bidtime }) => {
            const message = `Auction ${auctionID} received bid ${bid} from bidder ${currentBidderName} at ${bidtime}`;
            setLogs(logs.concat(message));
            setBid(bid);
            handleInputChange(currentBidderID, bid);
        };
        socket.on('receive-bid', receiveBidHandler);

        // Clean up the event listener when the component unmounts
        return () => {
            socket.off('receive-bid', receiveBidHandler);
        };
    }, [socket]);

    return (
        <Paper elevation={3} style={leftColumnStyle}>
            <List>
                {bidders.map((bidder) => (
                    <ListItem key={bidder.userid}>
                    <div>
                        <div>
                            <Typography variant="caption">{`${bidder.firstname} ${bidder.lastname}`}</Typography>
                        </div>
                        <div>
                            <ListItemText primary={inputValues[bidder.userid]} />
                        </div>
                    </div>
                    </ListItem>
                ))}
            </List>
            <SendBid 
                socket={socket} 
                currentBidder={currentBidder} 
                auctionID={auctionID}
                isBidOpen={isBidOpen}
            />
        </Paper>
    )
}

export default BidPanel;