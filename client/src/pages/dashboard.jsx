import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Card, CardActionArea, CardMedia, CardContent, Typography, CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { cyan, purple } from '@mui/material/colors';
import AppBarr from '../components/appbar';

const theme = createTheme({
    palette: {
        primary: cyan,
        secondary: purple,
    },
});

const Dashboard = () => {
    const [openAuctions, setOpenAuctions] = useState([]);

    useEffect(() => {
        // Fetch open auctions data from the server
        // Replace the URL with the actual endpoint when connected to backend
        // For now, we'll mock some sample data
        const sampleData = [
            {
                auctionid: '1',
                title: 'Sample Auction 1',
                imageurl: 'https://via.placeholder.com/300x200.png?text=Sample+Image+1'
            },
            {
                auctionid: '2',
                title: 'Sample Auction 2',
                imageurl: 'https://via.placeholder.com/300x200.png?text=Sample+Image+2'
            }
            // ... Add more sample data here ...
        ];
        setOpenAuctions(sampleData);
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <AppBarr />
            <div style={{ padding: '20px'}}>
                <Typography variant="h4" color="textPrimary" gutterBottom style={{ textAlign: 'center', marginBottom: '40px'}}>
                    Available Auctions
                </Typography>
                <Grid container spacing={2}>
                    {openAuctions.map(auction => (
                        <Grid item xs={12} sm={6} md={4} key={auction.auctionid}>
                            <Link to={`/auction/${auction.auctionid}`} style={{ textDecoration: 'none' }}>
                                <Card elevation={3} sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                                    <CardActionArea>
                                        <CardMedia
                                            component="img"
                                            height="200"
                                            image={auction.imageurl}
                                            alt={auction.title}
                                        />
                                        <CardContent>
                                            <Typography variant="h6" color="textPrimary">
                                                {auction.title}
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </Link>
                        </Grid>
                    ))}
                </Grid>
            </div>
        </ThemeProvider>
    );
};


export default Dashboard;
