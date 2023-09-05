import { Typography, AppBar, CssBaseline, Container, Toolbar, CardContent, Tabs, Tab, Box, Button, Stack, Avatar, Paper } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import { cyan, purple } from '@mui/material/colors';
import AppBarr from '../components/appbar';
import {Link} from "react-router-dom";
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from '@mui/material';

function AuctionTable({ auctions }) {
    const formatTime = (timestamp) => {
        const date = new Date(timestamp);
        const formattedDate = date.toLocaleDateString(); // Format the date
        const formattedTime = date.toLocaleTimeString(); // Format the time
        return `${formattedDate} ${formattedTime}`;
    };
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Auction ID</TableCell>
            <TableCell>Product Name</TableCell>
            <TableCell>Product Description</TableCell>
            <TableCell>Minimum Bid</TableCell>
            <TableCell>Start Time</TableCell>
            <TableCell>End Time</TableCell>
            <TableCell>Auction Type</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {auctions.map((auction) => (
            <TableRow key={auction.auctionid}>
              <TableCell>{auction.auctionid}</TableCell>
              <TableCell>{auction.productname}</TableCell>
              <TableCell>{auction.productdesc}</TableCell>
              <TableCell>{auction.minbid}</TableCell>
                <TableCell>{formatTime(auction.starttime)}</TableCell>
                <TableCell>{formatTime(auction.endtime)}</TableCell>
                <TableCell>{auction.auctiontype}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

function BidTable({ bids }) {
    return (
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Auction ID</TableCell>
              <TableCell>Final Bid</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bids.map((bid) => (
              <TableRow key={bid.auctionid}>
                <TableCell>{bid.finalbid}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }


const theme = createTheme({
    palette: {
        primary: cyan,
        secondary: purple
    }
});

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function Buttons() {
    return (
        <Stack spacing={2} direction="row">
            <Link to="/newAuction">
                <Button variant="contained" startIcon={<Avatar sx={{ width: '25px', height: '25px', backgroundColor: theme.palette.secondary.main }}><AddIcon sx={{ fontSize: '18px', color: 'white' }} /></Avatar>}>New Auction</Button>
            </Link>
            <Link to="/dashboard" style={{ textDecoration: 'none' }}>
                <Button variant="contained">Browse Products</Button>
            </Link>
        </Stack>
    );
}

function CustomTabPanel(props: TabPanelProps) {
const { children, value, index, ...other } = props;

return (
    <div
    role="tabpanel"
    hidden={value !== index}
    id={`simple-tabpanel-${index}`}
    aria-labelledby={`simple-tab-${index}`}
    {...other}
    >
    {value === index && (
        <Box sx={{ p: 3 }}>
        <Typography>{children}</Typography>
        </Box>
    )}
    </div>
);
}

function a11yProps(index: number) {
return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
};
}

function BasicTabs({ auctions, bids }) {
    const [value, setValue] = React.useState(0);
  
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
      setValue(newValue);
    };
  
    return (
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="Your Purchases" {...a11yProps(0)} />
            <Tab label="Your Auctions" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
            {bids.length === 0 ? (
                <div>You have not made any previous purchases yet.</div>
            ) : (
                <BidTable bids={bids} />
            )}
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
            {auctions.length === 0 ? (
                <div>No auctions available.</div>
            ) : (
                <AuctionTable auctions={auctions} />
            )}
        </CustomTabPanel>
      </Box>
    );
  }  


const UserInfo = () => {
    const userId = localStorage.getItem('userId'); 
    const [firstName, setFirstName] = useState(null);
    const [auctions, setAuctions] = useState([]);
    const [bids, setBids] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:3000/get/userinfo/${userId}`)
            .then((response) => {
                const userData = response.data[0]; 
                const userFirstName = userData.firstname;
                setFirstName(userFirstName); 
            })
            .catch((error) => {
                console.log('Error:', error);
            });

        axios.get(`http://localhost:3000/get/userAuctionInfo/${userId}`)
            .then((response) => {
                setAuctions(response.data);
            })
            .catch((error) => {
                console.log('Error:', error);
            });
        
        axios.get(`http://localhost:3000/get/userBidInfo/${userId}`)
        .then((response) => {
            setBids(response.data);
        })
        .catch((error) => {
            console.log('Error:', error);
        });

    }, [userId]);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <AppBarr />
            <main>
                <div>
                    <Container>
                    <Paper elevation={3} sx={{ padding: 3, marginTop: 5 }}>
                        <CardContent sx={{ marginBottom: 3 }}>
                            <Typography variant="h4" align="center" color="textPrimary" gutterBottom>
                                {firstName ? `Hello ${firstName}!` : `Hello ${userId}`}
                            </Typography>
                            <BasicTabs auctions={auctions} bids={bids} />
                            </CardContent>
                            <Box sx={{ marginBottom: 3 }}>
                                <Buttons />
                            </Box>
                            <Typography sx={{ marginBottom: 3 }}>
                                Strikes: 0
                            </Typography>
                    </Paper>
                    </Container>
                </div>
            </main>
        </ThemeProvider>
    );
}

export default UserInfo;