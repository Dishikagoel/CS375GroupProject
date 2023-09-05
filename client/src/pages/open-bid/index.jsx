import { Grid, Typography } from "@mui/material";
import { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import UserContext from '../../components/UserContext';
import AppBarr from '../../components/appbar';
import BidPanel from "./bid-panel";
import ChatArea from "./chat-area";
import CountdownTimer from "../../components/Countdown";
import axios from 'axios';

const OpenBid = ({ socket }) => {
    const [isBidOpen, setIsBidOpen] = useState(false);
    const [isAuctionEnded, setIsAuctionEnded] = useState(false);
    const [countdown, setCountdown] = useState();
    const { auctionID } = useParams();
    const [timeMessage, setTimeMessage] = useState('');

    const [currentBidder, setCurrentBidder] = useState({});
    const [inputValues, setInputValues] = useState({});
    const [bidders, setBidders] = useState([]);

    // Fetch current authenticated user
    const currentUser = useContext(UserContext).currentUser;
    const currentUserID = currentUser.userid;

    // This url is for development only. When deploy, change it to "/get/auctionBidders/${auctionID}"
    const url = `http://localhost:3000/get/auctionBidders/${auctionID}`;

    useEffect(() => {
        axios.get(`http://localhost:3000/get/auction/${auctionID}`)
        .then(res => {
            let starttime = new Date(res.data[0]?.starttime);
            let endtime = new Date(res.data[0]?.endtime);

            let currentTime = new Date();
            if (currentTime < starttime) {
                // bidding is not open yet
                setIsBidOpen(false);
                let duration = (starttime - currentTime) / 1000; // in seconds
                setCountdown(duration);
                setTimeMessage('Time until bidding starts');
            } else if (currentTime > endtime) { 
                // bidding is closed
                setIsBidOpen(false);
                setIsAuctionEnded(true);
                setCountdown(0);
            } else {
                // bidding is open
                setIsBidOpen(true);
                let duration = (endtime - currentTime) / 1000; // in seconds
                setCountdown(duration);
                setTimeMessage('Remaining bidding time');
            }
        });
    }, [isBidOpen]);

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

    socket.emit('join_room', { userid: currentUserID, room: auctionID });


    // Send bid to server when isAuctionEnded is true
    useEffect(() => {
        if (isAuctionEnded) {
            // Send bid to server
            console.log('Auction ended');
            axios.post("http://localhost:3000/auction/submit-bids", { auctionid: auctionID })
            .then((res) => {
                console.log(res);
            }).catch((err) => {
                console.log(err);
            });
        }
    }, [isAuctionEnded]);

    return (
        <div>
            <AppBarr />

            <Grid container spacing={2}>
                <Grid item xs={4}>
                    <BidPanel 
                        socket={socket}
                        auctionID={auctionID}
                        bidders={bidders}
                        isBidOpen={isBidOpen}
                        currentBidder={currentUser}
                        inputValues={inputValues}
                        setInputValues={setInputValues}
                    />
                </Grid>
                <Grid item xs={8}>
                    <CountdownTimer 
                        timeMessage={timeMessage}
                        countdown={countdown} 
                        setCountdown={setCountdown} 
                        trigger={isBidOpen} 
                        setTrigger={setIsBidOpen} 
                    />
                    <Typography align="center" variant="h5">{isAuctionEnded ? "Bidding has ended" : !isBidOpen ? "Bidding hasn't started yet" : "Bidding is open. You might need to refresh the page."}</Typography>
                    <ChatArea 
                        socket={socket}
                        currentUser={currentUser}
                    />
                    {/* {logs.map((event) => (
                        <Typography align="center" color="textSecondary" paragraph>{event}</Typography>
                    ))} */}
                </Grid>
            </Grid>
            
        </div>
    );
}

export default OpenBid;
