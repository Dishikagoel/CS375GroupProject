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


const BidPanel = ({ socket, isBidOpen }) => {
    const [bidders, setBidders] = useState([]);
    // get auctionID from params
    const { auctionID } = useParams();

    // Fetch current authenticated user
    const currentUser = useContext(UserContext).currentUser;
    const currentUserID = currentUser.userid;

    const [currentBidder, setCurrentBidder] = useState({});
    const [inputValues, setInputValues] = useState({});

    const [logs, setLogs] = useState([]);

    const [bid, setBid] = useState(currentBidder?.bid);
    
    // This url is for development only. When deploy, change it to "/get/auctionBidders/${auctionID}"
    const url = `http://localhost:3000/get/auctionBidders/${auctionID}`;

    useEffect(() => {
        axios.get(url)
        .then(response => {
            console.log("effect is running")
            setBidders(response.data);
            
            const myBidder = response.data.find(bidder => bidder.userid === currentUserID);
            setCurrentBidder(myBidder);

            const newInputValues = {};
            for (let i=0; i < response.data.length; i++) {
                newInputValues[response.data[i].userid] = response.data[i].finalbid;
            }
            setInputValues(newInputValues);
            
        })
        .catch(error => console.log('Error fetching data:', error));
    }, [auctionID]);

    
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