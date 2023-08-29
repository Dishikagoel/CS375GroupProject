import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Stack, Paper, Alert } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { cyan, purple } from '@mui/material/colors';
import { Link } from 'react-router-dom';
import AppBarr from '../components/appbar';
import axios from 'axios';
import {useNavigate} from "react-router-dom"

const theme = createTheme({
    palette: {
        primary: cyan,
        secondary: purple,
    },
});

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [loginError, setLoginError] = useState(false);

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/post/login', {
                user: username,
                pass: password,
            });
            console.log("res: ", response.data.message);
            if (response.data.message === 'User not found' || response.data.message === 'Incorrect passowrd') {
                setLoginError(true);
                console.log("Login failed");
            } else {
                navigate("/dashboard");
                console.log("Login successful");
            }
        } catch (error) {
            setLoginError(true);
            console.log('Error:', error);
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <AppBarr />
            <Container>
                <Paper elevation={3} sx={{ padding: 3, marginTop: 5 }}>
                    <Typography variant="h4" color="textPrimary" gutterBottom style={{ textAlign: 'center' }}>
                        Log In to WeBay
                    </Typography>
                    <Typography variant="subtitle2" color="textSecondary" gutterBottom style={{ textAlign: 'center' }}>
                        Don't have an account? <Link to="/signup">Sign Up</Link>
                    </Typography>
                    <form onSubmit={handleLogin}>
                        <Stack spacing={2}>
                            <TextField
                                label="Username"
                                variant="outlined"
                                required
                                fullWidth
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <TextField
                                label="Password"
                                type="password"
                                variant="outlined"
                                required
                                fullWidth
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <Button type="submit" variant="contained" fullWidth>
                                Log In
                            </Button>
                        </Stack>
                    </form>
                    {loginError && <Alert severity="error" className="error-box">Username or password is incorrect</Alert>}
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

export default Login;
