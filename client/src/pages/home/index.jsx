import { Typography, AppBar, CssBaseline, Container, Button, Toolbar, Grid, Paper } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { cyan, purple } from '@mui/material/colors';
import { Link } from 'react-router-dom';
import AppBarr from '../../components/appbar';
import axios from 'axios';
import { useEffect, useState } from 'react';

const theme = createTheme({
    palette: {
        primary: cyan,
        secondary: purple
    }
});

const Home = () => {
    const url = "http://localhost:3000/get/auction";
    const [auctions, setAuctions] = useState([]);

    useEffect(() => {
        axios.get(url).then((res) => {
            setAuctions(res.data);
        });
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <AppBarr />
            <main>
                <Container maxWidth="md" sx={{ mt: 5 }}>
                    <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
                        <Typography variant="h2" color="primary" gutterBottom>
                            Welcome to WeBay
                        </Typography>
                        <Typography variant="h5" color="textSecondary" paragraph>
                            The biggest online auction site in the world!
                        </Typography>
                        <Grid container spacing={2} justifyContent="center">
                            <Grid item>
                                <Button variant="contained" color="secondary" component={Link} to="/signup">
                                    Sign Up
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button variant="contained" color="secondary" component={Link} to="/login">
                                    Log In
                                </Button>
                            </Grid>
                        </Grid>
                    </Paper>
                </Container>
            </main>
        </ThemeProvider>
    );
}

export default Home;