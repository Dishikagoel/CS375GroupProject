import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {Grid, Typography, CssBaseline, Paper, Card, CardContent, Divider,} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { cyan, purple } from '@mui/material/colors';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import AppBarr from '../components/appbar';
import axios from 'axios';

const theme = createTheme({
    palette: {
        primary: cyan,
        secondary: purple,
    },
});

const Product = () => {
    const { auctionId } = useParams();
    const [auctionDetails, setAuctionDetails] = useState(null);

    useEffect(() => {
        axios
            .get(`http://localhost:3000/get/auction/${auctionId}`)
            .then((response) => {
                console.log(response);
                setAuctionDetails(response.data[0]);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, [auctionId]);

    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <AppBarr />
            <div style={{ padding: '20px' }}>
                {auctionDetails ? (
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            {auctionDetails.image_urls && auctionDetails.image_urls.length > 0 ? (
                                <Slider {...sliderSettings}>
                                    {auctionDetails.image_urls.map((imageUrl, index) => (
                                        <div
                                            key={index}
                                            style={{
                                                height: '100%',
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                            }}
                                        >
                                            <img
                                                src={imageUrl}
                                                alt={auctionDetails.productname}
                                                style={{
                                                    width: '100%',
                                                    maxHeight: '100%',
                                                    objectFit: 'cover',
                                                }}
                                            />
                                        </div>
                                    ))}
                                </Slider>
                            ) : (
                                <div style={{ height: '100%', backgroundColor: 'lightgray', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    No Images Available
                                </div>
                            )}
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Paper elevation={3} style={{ padding: '20px', display: 'flex', flexDirection: 'column', height: '100%' }}>
                                <Typography variant="h5" gutterBottom>
                                    {auctionDetails.productname}
                                </Typography>
                                <Typography variant="body1" color="textSecondary" gutterBottom>
                                    {auctionDetails.productdesc}
                                </Typography>
                                <Divider style={{ margin: '12px 0' }} />
                                <Typography variant="body2">
                                    Host: {auctionDetails.host}
                                </Typography>
                                <Typography variant="body2">
                                    Minimum Bid: {auctionDetails.minbid}
                                </Typography>
                                <Typography variant="body2">
                                    Auction Type: {auctionDetails.auctiontype}
                                </Typography>
                                <Typography variant="body2">
                                    Start Time: {auctionDetails.starttime}
                                </Typography>
                                <Typography variant="body2">
                                    End Time: {auctionDetails.endtime}
                                </Typography>
                            </Paper>
                        </Grid>

                    </Grid>
                ) : (
                    <Typography variant="h6" color="textSecondary" align="center">
                        Loading auction details...
                    </Typography>
                )}
            </div>
        </ThemeProvider>
    );
};

export default Product;
