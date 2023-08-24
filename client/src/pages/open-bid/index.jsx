import { Grid, Paper, TextField, Typography, Container, Stack } from "@mui/material";
import { useEffect, useState, useContext } from 'react';
import SendBid from './send-bid';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import UserContext from '../../components/UserContext';
import { useThemeContext } from "../../components/ThemeContext";
import AppBarr from '../../components/appbar';
import BidPanel from "./bid-panel";
import ChatArea from "./chat-area";

const OpenBid = ({ socket }) => {
    
    return (
        <div>
            <AppBarr />

            <Grid container spacing={2}>
                <Grid item xs={4}>
                    <BidPanel socket={socket} />
                </Grid>
                <Grid item xs={8}>
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
