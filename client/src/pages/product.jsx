import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {Grid, Typography, CssBaseline, Paper, Card, CardContent, Divider, Button} from '@mui/material';
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
    const [productDetails, setProductDetails] = useState(null);

    useEffect(() => {
        axios
            .get(`http://localhost:3000/get/auction/${auctionId}`)
            .then((response) => {
                setProductDetails(response.data[0]);
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
                {productDetails ? (
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            {productDetails.image_urls && productDetails.image_urls.length > 0 ? (
                                <Slider {...sliderSettings}>
                                    {productDetails.image_urls.map((imageUrl, index) => (
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
                                                alt={productDetails.productname}
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
                                    {productDetails.productname}
                                </Typography>
                                <Typography variant="body1" color="textSecondary" gutterBottom>
                                    {productDetails.productdesc}
                                </Typography>
                                <Divider style={{ margin: '12px 0' }} />
                                <Typography variant="body2">
                                    Host: {productDetails.host}
                                </Typography>
                                <Typography variant="body2">
                                    Minimum Bid: {productDetails.minbid}
                                </Typography>
                                <Typography variant="body2">
                                    Auction Type: {productDetails.auctiontype}
                                </Typography>
                                <Typography variant="body2">
                                    Start Time: {productDetails.starttime}
                                </Typography>
                                <Typography variant="body2">
                                    End Time: {productDetails.endtime}
                                </Typography>
                            </Paper>
                        </Grid>

                    </Grid>
                ) : (
                    <Typography variant="h6" color="textSecondary" align="center">
                        Loading auction details...
                    </Typography>
                )}
                {productDetails && (
                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                        <Button variant="contained" color="primary">
                            Enter Auction
                        </Button>
                    </div>
                )}
            </div>
        </ThemeProvider>
    );
};

export default Product;
