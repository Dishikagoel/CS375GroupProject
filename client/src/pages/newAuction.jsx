import React, {useEffect, useState} from 'react';
import { Typography, AppBar, CssBaseline, Container, Button, Toolbar, Grid, Paper, TextField, InputLabel, Select, MenuItem, FormControl} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { cyan, purple } from '@mui/material/colors';
import AppBarr from '../components/appbar';
import axios from "axios";
import { useParams } from 'react-router-dom';

const theme = createTheme({
    palette: {
        primary: cyan,
        secondary: purple,
    },
});

const NewAuction = () => {
    const { auctionID } = useParams();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [images, setImages] = useState([]);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [auctionDate, setAuctionDate] = useState('');
    const [auctionType, setAuctionType] = useState('');
    const [auctionStartTime, setAuctionStartTime] = useState('');
    const [auctionEndTime, setAuctionEndTime] = useState('');
    const [minimumBid, setMinimumBid] = useState('');
    const [timePeriod, setTimePeriod] = useState('');
    const [timePeriodError, setTimePeriodError] = useState('');
    const [isDraggingOver, setIsDraggingOver] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [uniqueImages, setUniqueImages] = useState([]);
    const [isSubmitted, setIsSubmitted] = useState(false);


    const handleImageUpload = async (event) => {
        const selectedImages = Array.from(event.target.files);
        const newImages = selectedImages.filter(image => !uniqueImages.includes(image.name));
        if (newImages.length !== selectedImages.length) {
            setErrorMessage('Image already exists.');
            setTimeout(() => {
                setErrorMessage('');
            }, 5000);
        }
        setUniqueImages(prevUniqueImages => [...prevUniqueImages, ...newImages.map(image => image.name)]);
        setImages(prevImages => [...prevImages, ...newImages]);
    };


    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        let imageList;
        images.forEach(image => {
            formData.append('images', image);
        });
                                                                
        try {
            // This url is for development only. When deploy, change it to "/get/auctionBidders/${auctionID}"
            const response = await axios.post(`http://localhost:3000/upload/${auctionID}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.status === 200) {
                if (images.length > 0) {
                    console.log('Images uploaded successfully');
                    imageList = response.data.uploadedUrls;
                }
                setIsSubmitted(true);
            } else {
                console.error('Failed to upload images');

            }
        } 
        catch (error) {
            console.error('Error uploading images:', error);
        }

        let myUrl = `http://localhost:3000/newAuction/addAuction`;
        axios.post(myUrl, {
            host: "hostid",
            title: title,
            minBid: minimumBid,
            prodDesc: description,
            auctType: auctionType,
            start: "2023-08-12 13:00:00",
            end: "2023-08-12 14:00:00",
            timePeriod: timePeriod,
            active: true,
            imagesList: imageList
        }).then(response => response.json()).then(body => {
            //console.log("Success");
        }).catch((error) => {
            // something went wrong when inserting the row
            console.log(error);
            //console.log("Error in newAuction.jsx");
        });
    };

    const removeImage = (indexToRemove) => {
        setImages((prevImages) => prevImages.filter((_, index) => index !== indexToRemove));
    };

    const handleMinimumBidChange = (e) => {
        setMinimumBid(e.target.value);
    };

    const calculateTimePeriod = (start, end) => {
        const startTime = new Date(`2000-01-01T${start}`);
        const endTime = new Date(`2000-01-01T${end}`);
        const duration = (endTime - startTime) / (1000 * 60);

        setTimePeriod(duration.toString());

        if (duration > 720) {
            setTimePeriodError("Time period exceeds 12 hours. Adjust start or end time.");
        } else {
            setTimePeriodError('');
        }
    };

    const handleAuctionStartTimeChange = (e) => {
        const startTime = e.target.value;
        setAuctionStartTime(startTime);
        calculateTimePeriod(startTime, auctionEndTime);
    };

    const handleAuctionEndTimeChange = (e) => {
        const endTime = e.target.value;
        setAuctionEndTime(endTime);
        calculateTimePeriod(auctionStartTime, endTime);
    };

    const handleDrop = (event) => {
        event.preventDefault();
        setIsDraggingOver(false);
        const selectedFiles = Array.from(event.dataTransfer.files);
        const imageFiles = selectedFiles.filter(file => file.type.startsWith('image/'));
        const newImages = imageFiles.filter(file => !uniqueImages.includes(file.name));
        if (newImages.length !== imageFiles.length) {
            setErrorMessage('You cannot upload the same image twice.');
            setTimeout(() => {
                setErrorMessage('');
            }, 5000);
        } else {
            setUniqueImages(prevUniqueImages => [...prevUniqueImages, ...newImages.map(file => file.name)]);
            setImages(prevImages => [...prevImages, ...newImages]);
        }
    };


    const handleDragOver = (event) => {
        event.preventDefault();
        setIsDraggingOver(true);
    };

    const handleDragLeave = () => {
        setIsDraggingOver(false);
    };

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <AppBarr />
            <main style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', paddingTop: '8vh', paddingBottom: '8vh' }}>
                {isSubmitted ? (
                    <div>
                        <Typography variant="h4" color="textPrimary" align="center" gutterBottom>
                            Auction Created Successfully!
                        </Typography>
                    </div>
                ) : (
                    <Container>
                        <Paper elevation={3} sx={{ p: 4 }}>
                            <Typography variant="h4" color="textPrimary" align="center" gutterBottom>
                                Create a New Auction
                            </Typography>
                            <form id="form" onSubmit={handleSubmit}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <TextField
                                            name="prodName"
                                            label="Product Name"
                                            variant="outlined"
                                            required
                                            fullWidth
                                            value={title}
                                            onChange={(e) => setTitle(e.target.value)}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            name="prodDesc"
                                            label="Product Description"
                                            variant="outlined"
                                            required
                                            fullWidth
                                            multiline
                                            rows={4}
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                        />
                                    </Grid>
                                    <Grid item xs={12} mb={2}>
                                        <InputLabel>Upload Images</InputLabel>
                                        {errorMessage && (
                                            <Typography color="error" variant="body2" align="center" mb={2}>
                                                {errorMessage}
                                            </Typography>
                                        )}
                                        <div
                                            onDrop={handleDrop}
                                            onDragOver={handleDragOver}
                                            onDragLeave={handleDragLeave}
                                            style={{
                                                border: `2px dashed ${isDraggingOver ? theme.palette.secondary.main : '#ccc'}`,
                                                padding: '1rem',
                                                borderRadius: '4px',
                                                transition: 'border-color 0.3s',
                                                backgroundColor: isDraggingOver ? 'cyan' : 'white',
                                                textAlign: 'center',
                                            }}
                                        >
                                            {isDraggingOver ? 'Drop here to upload' : 'Drag and drop images or click to select'}
                                        </div>
                                        <input
                                            type="file"
                                            multiple
                                            accept="image/*"
                                            onChange={handleImageUpload}
                                        />
                                        <ul>
                                            {images.map((image, index) => (
                                                <li key={index}>
                                                    {image.name}
                                                    <Button onClick={() => removeImage(index)}>Remove</Button>
                                                </li>
                                            ))}
                                        </ul>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            name="phone"
                                            label="Phone Number"
                                            variant="outlined"
                                            fullWidth
                                            required
                                            value={phoneNumber}
                                            onChange={(e) => setPhoneNumber(e.target.value)}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            name="email"
                                            label="Email"
                                            type="email"
                                            variant="outlined"
                                            fullWidth
                                            required
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <InputLabel>Auction Date *</InputLabel>
                                        <TextField
                                            name="date"
                                            type="date"
                                            variant="outlined"
                                            fullWidth
                                            required
                                            value={auctionDate}
                                            onChange={(e) => setAuctionDate(e.target.value)}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <InputLabel>Auction Type *</InputLabel>
                                        <FormControl fullWidth variant="outlined">
                                            <Select
                                                value={auctionType}
                                                required
                                                onChange={(e) => setAuctionType(e.target.value)}
                                                label="Auction Type"
                                                name="auctType"
                                            >
                                                <MenuItem value="First-Bid Sealed">First-Bid Sealed</MenuItem>
                                                <MenuItem value="Second-Bid Sealed">Second-Bid Sealed</MenuItem>
                                                <MenuItem value="Open-Ascending">Open-Ascending</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} sm={6} mb={2}>
                                        <InputLabel>Auction Start Time *</InputLabel>
                                        <TextField
                                            name="start"
                                            type="time"
                                            variant="outlined"
                                            fullWidth
                                            required
                                            value={auctionStartTime}
                                            onChange={handleAuctionStartTimeChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6} mb={2}>
                                        <InputLabel>Auction End Time *</InputLabel>
                                        <TextField
                                            name="end"
                                            type="time"
                                            variant="outlined"
                                            fullWidth
                                            required
                                            value={auctionEndTime}
                                            onChange={handleAuctionEndTimeChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6} mb={2}>
                                        <TextField
                                            name="minBid"
                                            label="Minimum Bid (USD)"
                                            type="number"
                                            variant="outlined"
                                            fullWidth
                                            required
                                            value={minimumBid}
                                            onChange={handleMinimumBidChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6} mb={2}>
                                        <TextField
                                            name="timePeriod"
                                            label="Time Period (minutes)"
                                            variant="outlined"
                                            fullWidth
                                            value={timePeriod}
                                            InputProps={{
                                                readOnly: true,
                                            }}
                                            error={!!timePeriodError}
                                            helperText={timePeriodError}
                                        />
                                    </Grid>
                                    <Grid item xs={12} mb={2}>
                                        <Button
                                            onClick={handleSubmit}
                                            type="submit"
                                            value="save"
                                            variant="contained"
                                            color="primary"
                                            fullWidth
                                            disabled={timePeriod > 720}
                                        >
                                            Create Auction
                                        </Button>
                                    </Grid>
                                </Grid>
                            </form>
                        </Paper>
                    </Container>
                )}
            </main>
        </ThemeProvider>
);
};

export default NewAuction;