import { Typography, AppBar, CssBaseline, Container, Toolbar } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { cyan, purple } from '@mui/material/colors';

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
            <AppBar position="relative" color="primary">
                <Toolbar>
                    <Typography variant="h6" color="inherit" noWrap>
                        WeBay
                    </Typography>
                </Toolbar>
            </AppBar>
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