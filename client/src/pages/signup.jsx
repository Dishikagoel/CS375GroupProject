import { Container, Typography, TextField, Button, Stack, Paper, FormControlLabel, Checkbox } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { cyan, purple } from '@mui/material/colors';
import React, { useState, useEffect } from 'react';
//import { useEffect } from 'react';
import AppBarr from '../components/appbar';
import { Link } from 'react-router-dom';
import axios from "axios";

const theme = createTheme({
    palette: {
        primary: cyan,
        secondary: purple,
    },
});

const Signup = () => {
    const [userAgreement, setUserAgreement] = useState(false);
    const [signupSuccess, setSignupSuccess] = useState(false);

    const handleSignup = (event) => {
        event.preventDefault();
        const getFirst = document.getElementById("first").value;
        const getLast = document.getElementById("last").value;
        const getEmail = document.getElementById("email").value;
        const getPassword1 = document.getElementById("password1").value;
        const getPassword2 = document.getElementById("password2").value;
        const getPhone = document.getElementById("phone").value;
        const getDob = document.getElementById("dob").value;
        const getAddress = document.getElementById("address").value;

        let url = `http://localhost:3000/newUser/addUser`;
        axios.get(url, {
            params: {
                first: getFirst,
                last: getLast,
                email: getEmail,
                phone: getPhone,
                dob: getDob,
                address: getAddress
            }
        }).then(response => response.json()).then(body => {
            console.log("Success");
        }).catch((error) => {
            // something went wrong when inserting the row
            console.log(error);
            console.log("Error in signup.jsx");
        });
        setSignupSuccess(true);
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
                        Already have a WeBay account? <Link to="/login">Log In</Link>
                    </Typography>
                    {signupSuccess ? (
                        <div>
                            <h2>Signup Successful!</h2>
                        </div>
                    ) : (
                    <form onSubmit={handleSignup}>
                        <Stack spacing={2}>
                            <TextField id="first" label="First Name" variant="outlined" required fullWidth />                        
                            <TextField id="last" label="Last Name" variant="outlined" required fullWidth />
                            <TextField id="email" label="Email" type="email" variant="outlined" required fullWidth />
                            <TextField id="password1" label="Password" type="password" variant="outlined" required fullWidth />
                            <TextField id="password2" label="Confirm Password" type="password" variant="outlined" required fullWidth />
                            <TextField id="phone" label="Phone Number" type="tel" variant="outlined" fullWidth />
                            <TextField id="dob" label="Date of Birth" type="date" variant="outlined" fullWidth />
                            <TextField id="address" label="Address" variant="outlined" required fullWidth />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={userAgreement}
                                        onChange={(event) => setUserAgreement(event.target.checked)}
                                        color="primary"
                                    />
                                }
                                label= {
                                    <span>
                                        I agree to the{' '}
                                        <Link to="/userAgreement">Terms of Service and Privacy Policy</Link>
                                    </span>
                                }
                            />
                            <Button onClick={handleSignup} type="submit" variant="contained" fullWidth disabled={!userAgreement}>
                                Sign Up
                            </Button>
                        </Stack>
                    </form>
                        )}
                </Paper>
            </Container>
            <style>
                {`
                  body {
                    margin: 0;
                    padding: 0;
                  }
                `}
            </style>
        </ThemeProvider>
    );
};

export default Signup;
