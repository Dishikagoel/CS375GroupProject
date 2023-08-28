import { Paper, TextField, List, ListItem, ListItemText, Typography } from "@mui/material";
import { useEffect, useState, useContext } from 'react';
import SendBid from './send-bid';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import UserContext from '../../components/UserContext';

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
        setInputValues((prevInputValues) => ({
          ...prevInputValues,
          [userId]: newValue,
        }));
      };

    useEffect(() => {
        socket.on('receive-bid', ({ auctionID, currentBidderID, currentBidderName, bid, bidtime }) => {
            const message = `Auction ${auctionID} received bid ${bid} from bidder ${currentBidderName} at ${bidtime}`;
            setLogs(logs.concat(message));
            setBid(bid);
            handleInputChange(currentBidderID, bid);
        });
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