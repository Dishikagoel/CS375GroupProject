import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link component
import { Grid, Card, CardActionArea, CardContent, Typography, CssBaseline } from '@mui/material';
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

const Dashboard = () => {
    const [openAuctions, setOpenAuctions] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/get/auction')
            .then(response => {
                const activeAuctions = response.data.filter(auction => auction.active === true);
                setOpenAuctions(activeAuctions);
            })
            .catch(error => {
                console.error("Error fetching data:", error);
            });
    }, []);

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
            <div style={{ padding: '20px'}}>
                <Typography variant="h4" color="textPrimary" gutterBottom style={{ textAlign: 'center', marginBottom: '40px'}}>
                    Available Auctions
                </Typography>
                <Grid container spacing={2}>
                    {openAuctions.map(auction => (
                        <Grid item xs={12} sm={6} md={2.5} key={auction.auctionid}>
                            <Link to={`/product/${auction.auctionid}`} style={{ textDecoration: 'none' }}>
                                <Card style={{ width: '250px', height: '300px', display: 'flex', flexDirection: 'column' }}>
                                    <CardActionArea style={{ flex: '1', maxHeight: '80%' }}>
                                        {auction.image_urls && auction.image_urls.length > 0 ? (
                                            <Slider {...sliderSettings} style={{ height: '100%' }}>
                                                {auction.image_urls.map((imageUrl, index) => (
                                                    <div key={index} style={{ height: '80%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                        <img
                                                            src={imageUrl}
                                                            alt={auction.title}
                                                            style={{ width: '100%', maxHeight: '100%', objectFit: 'cover' }}
                                                        />
                                                    </div>
                                                ))}
                                            </Slider>
                                        ) : (
                                            <div style={{ height: '100%', backgroundColor: 'lightgray', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                No Images Available
                                            </div>
                                        )}
                                    </CardActionArea>
                                    <CardContent style={{ height: '20%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
                                        <Typography variant="body2" color="textSecondary" style={{ textAlign: 'center', marginBottom: '-7px' }}>
                                            {auction.productname}
                                        </Typography>
                                    </CardContent>
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
