import { Container, Typography, TextField, Button, Stack, Paper, Grid } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { cyan, purple } from '@mui/material/colors';
import { useState, useEffect, useContext } from 'react'; 
import UserContext from '../../components/UserContext';
import CountdownTimer from '../../components/Countdown';
import { useParams } from 'react-router-dom';
import AppBarr from '../../components/appbar';
import axios from 'axios';

const theme = createTheme({
    palette: {
        primary: cyan,
        secondary: purple,
    },
});

const SealBid = () => {
    const {auctionID} = useParams();
    const [productDetails, setProductDetails] = useState(null);
    const [inputValue, setInputValue] = useState(0);
    const [countdown, setCountdown] = useState(null);
    const [submitted, setSubmitted] = useState(false);

    // Fetch current authenticated user
    const currentUser = useContext(UserContext).currentUser;
    const currentUserID = currentUser.userid;

    useEffect(() => {
        axios.get(`http://localhost:3000/get/auction/${auctionID}`)
            .then(response => {
                setProductDetails(response.data[0]);
                setInputValue(response.data[0]?.minbid);

                // Calculate the remaining time based on your backend data
                const endTime = new Date(response.data[0]?.endtime).getTime();
                const currentTime = new Date().getTime();
                const remainingTimeInSeconds = Math.max(0, Math.floor((endTime - currentTime) / 1000));
                setCountdown(remainingTimeInSeconds);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, [auctionID]);

    useEffect(() => {
        axios.post(`http://localhost:3000/auction/save-sealed-bid`, {
            auctionid: auctionID,
            userid: currentUserID,
            bid: inputValue,
        }).then((response) => {
            console.log(response);
        }).catch((error) => {
            console.log(error);
        });
    }, [submitted]);

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
    };

    return (
        <ThemeProvider theme={theme}>
            <AppBarr/>
            <Container sx={{marginBottom: 5}}>
                {submitted ? (
                    <Paper elevation={3} sx={{padding: 3, marginTop: 5, marginBottom: 2}}>
                        <Typography
                            variant="h3"
                            color="textPrimary"
                            gutterBottom
                            style={{
                                textAlign: 'center'
                            }}
                        >
                            Bid Submitted Successfully!
                        </Typography>
                    </Paper>
                ) : (
                    <>
                        <Paper elevation={3} sx={{padding: 3, marginTop: 5, marginBottom: 2}}>
                            <Typography
                                variant="h3"
                                color="textPrimary"
                                gutterBottom
                                style={{
                                    textAlign: 'center'
                                }}
                            >
                                Sealed Bid
                            </Typography>
                            <Typography color='textSecondary' gutterBottom style={{textAlign: 'center'}}>
                                Welcome to the Sealed Bid auction. <br/>
                                In this type of auction, you will be able to submit your bid only ONCE. <br/>
                                You will not be able to see other bidders' bids.
                                The highest bidder will win the auction.
                            </Typography>
                        </Paper>
                        <CountdownTimer
                            timeMessage={"Time left to submit your bid"}
                            countdown={countdown}
                            setCountdown={setCountdown}
                            trigger={submitted}
                            setTrigger={setSubmitted}
                        />
                        <Grid container spacing={2} sx={{marginTop: 3}}>
                            <Grid item xs={6}>
                                <Paper elevation={3} sx={{padding: 3}}>
                                    <form onSubmit={handleSubmit}>
                                        <Stack spacing={2}>
                                            <TextField
                                                label="Enter your bid in here"
                                                variant="outlined"
                                                value={inputValue}
                                                onChange={handleInputChange}
                                                type="number"
                                                inputProps={{min: productDetails ? productDetails.minbid : 0}}
                                            />
                                            <Button type="submit" variant="contained" color="primary">
                                                Submit
                                            </Button>
                                        </Stack>
                                    </form>
                                </Paper>
                            </Grid>
                            <Grid item xs={6}>
                                {productDetails ? (
                                    <Paper elevation={3} sx={{padding: 3}}>
                                        <Typography variant="h5" gutterBottom>
                                            {productDetails.productname}
                                        </Typography>
                                        <Typography variant="body1" color="textSecondary" gutterBottom>
                                            {productDetails.productdesc}
                                        </Typography>
                                        <Typography variant="body1" color="textSecondary" gutterBottom>
                                            Minimum Bid: ${productDetails.minbid}
                                        </Typography>
                                        <img src={productDetails.image_urls[0]} alt={productDetails.productname}
                                             style={{width: '100%'}}/>
                                    </Paper>
                                ) : (
                                    <Paper elevation={3} sx={{padding: 3}}>
                                        <Typography variant="h5" gutterBottom>
                                            Loading...
                                        </Typography>
                                    </Paper>
                                )}
                            </Grid>
                        </Grid>
                    </>
                )}
            </Container>
        </ThemeProvider>
    );
}

export default SealBid;
