import { Container, Typography, TextField, Button, Stack, Paper, FormControlLabel, Checkbox } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { cyan, purple } from '@mui/material/colors';
import React, { useState } from 'react';
import AppBarr from '../components/appbar';

const theme = createTheme({
    palette: {
        primary: cyan,
        secondary: purple,
    },
});

const Signup = () => {
    const [userAgreement, setUserAgreement] = useState(false);

    const handleSignup = (event) => {
        event.preventDefault();
        // will add signup logic here
    };

    return (
        <ThemeProvider theme={theme}>
            <AppBarr />
            <Container>
                <Paper elevation={3} sx={{ padding: 3, marginTop: 5 }}>
                    <Typography variant="h4" color="textPrimary" gutterBottom style={{ textAlign: 'center' }}>
                        Sign Up for WeBay
                    </Typography>
                    <Typography variant="subtitle2" color="textSecondary" gutterBottom style={{ textAlign: 'center' }}>
                        Create a free account or log in
                    </Typography>
                    <form onSubmit={handleSignup}>
                        <Stack spacing={2}>
                            <TextField label="Full Name" variant="outlined" required fullWidth />
                            <TextField label="Email" type="email" variant="outlined" required fullWidth />
                            <TextField label="Password" type="password" variant="outlined" required fullWidth />
                            <TextField label="Confirm Password" type="password" variant="outlined" required fullWidth />
                            <TextField label="Phone Number" type="tel" variant="outlined" fullWidth />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={userAgreement}
                                        onChange={(event) => setUserAgreement(event.target.checked)}
                                        color="primary"
                                    />
                                }
                                label="I agree to the Terms of Service and Privacy Policy"
                            />
                            <Button type="submit" variant="contained" fullWidth disabled={!userAgreement}>
                                Sign Up
                            </Button>
                        </Stack>
                    </form>
                </Paper>
            </Container>
        </ThemeProvider>
    );
};

export default Signup;
