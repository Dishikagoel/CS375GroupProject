import { Typography, AppBar, CssBaseline, Container, Toolbar, Button } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { cyan, purple } from '@mui/material/colors';
import AppBarr from '../../components/appbar';

const theme = createTheme({
    palette: {
        primary: cyan,
        secondary: purple
    }
});

const Home = () => {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <AppBarr />
            <main>
                <div>
                    <Container maxWidth="sm">
                        <Typography variant="h2" align="center" color="textPrimary" gutterBottom>
                            Welcome to WeBay
                        </Typography>
                        <Typography variant="h5" align="center" color="textSecondary" paragraph>
                            The biggest online aunction site in the world!
                        </Typography>
                    </Container>
                </div>
            </main>
        </ThemeProvider>
    );
}

export default Home;