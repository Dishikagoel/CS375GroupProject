import { Typography, AppBar, CssBaseline, Container, Button, Toolbar, Grid, Paper } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { cyan, purple } from '@mui/material/colors';
import { Link } from 'react-router-dom';
import AppBarr from '../components/appbar';

const theme = createTheme({
    palette: {
        primary: cyan,
        secondary: purple
    }
});

const UserAgreement = () => {
    return (
        <ThemeProvider theme={theme}>
            <AppBarr />
            <Container>
                <Paper elevation={3} sx={{ padding: 3, marginTop: 5 }}>
                    <Typography variant="h4" color="textPrimary" gutterBottom style={{ textAlign: 'center' }}>
                        Verily, a User Accord: Where Merriment and the Web Converge
                    </Typography>
                    <Typography variant="body1" paragraph>
                        Hail and well met! By employing this digital fiefdom, thou dost step into a realm of smiles and joyous humors. Attend, for a declaration of thy expectations:
                    </Typography>
                    <Typography variant="body1" paragraph>
                        <strong>1. A Merry Atmosphere:</strong> This abode is a realm unsuitable for woe. Laughter is not only permitted but encouraged.
                        <br />
                        <strong>2. Emojis Speaketh Louder:</strong> Converse with us using the pictorial tongue of emojis. A picture speaks a myriad words, yon? 😉
                        <br />
                        <strong>3. Cookies, sans the Crumbs:</strong> We deploy cookies for a richer experience, yet rest assured, they shan't be crumbly.
                        <br />
                        <strong>4. Disputes, Resolved with Merriment:</strong> In the unlikely event of disquiet, let us settle it as friends, perchance through a contest of virtual thumb-wrestling.
                        <br />
                        <strong>5. Typos, of Little Concern:</strong> If thee espies a typo, fret not. Apprise us, and we shalt rectify it as expeditiously as the spell "auto-correct" is cast.
                        <br />
                        <strong>6. A Dance at Every Turn:</strong> Should thou feel the impulse, dance with glee whilst perusing. Here, judgment abideth not, only mirth.
                        <br />
                        <strong>7. Share and Rejoice:</strong> Our content exists for sharing, inspiration, and certainly, merriment. Doff thy cap and share the good tidings.
                        <br />
                        <strong>8. The Bane of Boredom Banished:</strong> Shouldst thou detect yawns, deem it an exigency. We shall dispatch virtual confetti cannons, anon!
                        <br />
                        <strong>9. The Ultimate Goal:</strong> Above all, our aim is to provoke smiles, chortles, perchance even snorts of gaiety. Enjoy the odyssey!
                    </Typography>
                </Paper>
            </Container>
        </ThemeProvider>
    );
};

export default UserAgreement;