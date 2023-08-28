import { Grid, Typography } from "@mui/material";
import { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import UserContext from '../../components/UserContext';
// The following import is not being used, and was causing errors since the components/ThemeContext file doesnt exist
// import { useThemeContext } from "../../components/ThemeContext";
import AppBarr from '../../components/appbar';
import BidPanel from "./bid-panel";
import ChatArea from "./chat-area";
import CountdownTimer from "../../components/Countdown";
import axios from 'axios';

const OpenBid = ({ socket }) => {
    const [isBidOpen, setIsBidOpen] = useState(true);
    const [isAuctionEnded, setIsAuctionEnded] = useState(false);
    const [countdown, setCountdown] = useState();
    const { auctionID } = useParams();

    const [currentBidder, setCurrentBidder] = useState({});
    const [inputValues, setInputValues] = useState({});
    const [bidders, setBidders] = useState([]);

    // Fetch current authenticated user
    const currentUser = useContext(UserContext).currentUser;
    const currentUserID = currentUser.userid;

    // This url is for development only. When deploy, change it to "/get/auctionBidders/${auctionID}"
    const url = `http://localhost:3000/get/auctionBidders/${auctionID}`;

    useEffect(() => {
        axios.get(`http://localhost:3000/get/bid/${auctionID}`)
        .then(res => {
            let starttime = new Date(res.data[0].starttime);
            let endtime = new Date(res.data[0].endtime);
            
            let duration = (endtime - starttime) / 1000; // in seconds
            console.log(duration);
            setCountdown(duration);
        })
    }, []);

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

    // Set isAuctionEnded to true when countdown reaches 0 and isBidOpen is false
    useEffect(() => {
        if (countdown === 0 && !isBidOpen) {
            setIsAuctionEnded(true);
        }
    }, [countdown, isBidOpen]);

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
                        currentBidder={currentBidder}
                        inputValues={inputValues}
                        setInputValues={setInputValues}
                    />
                </Grid>
                <Grid item xs={8}>
                    <CountdownTimer countdown={countdown} setCountdown={setCountdown} trigger={isBidOpen} setTrigger={setIsBidOpen} />
                    <Typography align="center" variant="h5">{isBidOpen ? "Bidding is opended" : "Bidding is closed"}</Typography>
                    <ChatArea />
                    {/* {logs.map((event) => (
                        <Typography align="center" color="textSecondary" paragraph>{event}</Typography>
                    ))} */}
                </Grid>
            </Grid>
            
        </div>
    );
}

export default OpenBid;
