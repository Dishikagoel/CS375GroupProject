import { Typography, AppBar, CssBaseline, Container, Toolbar, CardContent, Tabs, Tab, Box, Button, Stack, Avatar, Paper } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import { cyan, purple } from '@mui/material/colors';
import AppBarr from '../components/appbar';
import {Link} from "react-router-dom";
import axios from 'axios';
import React, { useEffect, useState } from 'react';

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

function BasicTabs() {
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
        1. Purchase 
        &nbsp;
    </CustomTabPanel>
    <CustomTabPanel value={value} index={1}>
        1. Auctions
        &nbsp;
    </CustomTabPanel>
    </Box>
);
}


const UserInfo = () => {
    const userId = localStorage.getItem('userId'); 
    const [firstName, setFirstName] = useState(null);

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
                            <BasicTabs />
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