import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, Typography, CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { cyan, purple } from '@mui/material/colors';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import axios from 'axios';

const theme = createTheme({
    palette: {
        primary: cyan,
        secondary: purple,
    },
});

const ProductDetails = () => {
    const { auctionid } = useParams();
    const [productDetails, setProductDetails] = useState(null);

    useEffect(() => {
        // Fetch product details based on the auctionid
        axios.get(`http://localhost:3000/get/auction/${auctionid}`)
            .then(response => {
                setProductDetails(response.data);
            })
            .catch(error => {
                console.error("Error fetching product details:", error);
            });
    }, [auctionid]);

    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    if (!productDetails) {
        return <div>Loading...</div>;
    }

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <div style={{ padding: '20px'}}>
                <Typography variant="h4" color="textPrimary" gutterBottom style={{ textAlign: 'center', marginBottom: '40px'}}>
                    Product Details
                </Typography>
                <Card style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
                    <CardContent>
                        {productDetails.image_urls && productDetails.image_urls.length > 0 ? (
                            <Slider {...sliderSettings}>
                                {productDetails.image_urls.map((imageUrl, index) => (
                                    <div key={index} style={{ height: '300px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                        <img
                                            src={imageUrl}
                                            alt={productDetails.title}
                                            style={{ width: '100%', maxHeight: '100%', objectFit: 'cover' }}
                                        />
                                    </div>
                                ))}
                            </Slider>
                        ) : (
                            <div style={{ height: '300px', backgroundColor: 'lightgray', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                No Images Available
                            </div>
                        )}
                        <Typography variant="h5" color="textPrimary" gutterBottom style={{ marginTop: '20px' }}>
                            {productDetails.productname}
                        </Typography>
                        <Typography variant="body1" color="textSecondary">
                            Host: {productDetails.host}
                        </Typography>
                        <Typography variant="body1" color="textSecondary">
                            Description: {productDetails.desc}
                        </Typography>
                        <Typography variant="body1" color="textSecondary">
                            Auction Type: {productDetails.auctiontype}
                        </Typography>
                        <Typography variant="body1" color="textSecondary">
                            Start Time: {productDetails.starttime}
                        </Typography>
                        <Typography variant="body1" color="textSecondary">
                            End Time: {productDetails.endtime}
                        </Typography>
                        <Typography variant="body1" color="textSecondary">
                            Minimum Bid: {productDetails.minbid}
                        </Typography>
                    </CardContent>
                </Card>
            </div>
        </ThemeProvider>
    );
};

export default ProductDetails;
