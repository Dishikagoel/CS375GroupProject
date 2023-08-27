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
    const timeLimit = 15;
    const [countdown, setCountdown] = useState(timeLimit);
    const { auctionID } = useParams();
    
    const userid = '402';
    socket.emit('join_room', { userid, room: auctionID });

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
                    <BidPanel socket={socket} isBidOpen={isBidOpen} />
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
