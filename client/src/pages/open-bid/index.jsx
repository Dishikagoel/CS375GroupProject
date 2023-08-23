import { TextField, Typography, Container, Stack } from "@mui/material";
import { useEffect, useState, useContext } from 'react';
import SendBid from './send-bid';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import UserContext from '../../components/UserContext';

const OpenBid = ({ socket }) => {
    const [bidders, setBidders] = useState([]);
    // get auctionID from params
    const { auctionID } = useParams();
    
    // Fetch current authenticated user
    const currentUser = useContext(UserContext).currentUser;
    const currentUserID = currentUser.userid;

    const [currentBidder, setCurrentBidder] = useState({});
    const [inputValues, setInputValues] = useState({});

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
    

    const [bid, setBid] = useState(currentBidder?.bid);
    const [logs, setLogs] = useState([]);



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
                    {bidders.map((bidder) => ( 
                        <TextField 
                            id="outlined-basic"
                            key={bidder.userid}
                            label={`${bidder.firstname} ${bidder.lastname}`}
                            value={inputValues[bidder.userid]}
                            InputProps={{
                                readOnly: true,
                                style: { cursor: 'default', backgroundColor: '#ffffff' }, // Adjust styling as needed
                            }}
                        />
                    ))}
                </Stack>
                <SendBid socket={socket} currentBidder={currentBidder} auctionID={auctionID} />
                {logs.map((event) => (
                    <Typography align="center" color="textSecondary" paragraph>{event}</Typography>
                ))}
            </Container>
        </div>
    );
}

export default OpenBid;
