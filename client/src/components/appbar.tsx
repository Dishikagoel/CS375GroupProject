import { Typography, AppBar, CssBaseline, Container, Toolbar, Button } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';
import React from 'react';

function AppBarr() {
    const navigate = useNavigate();

    const userId = localStorage.getItem('userId');
    const isLoggedIn = !!userId;

    const handleLogout = () => {
        localStorage.removeItem('userId');
        navigate('/');
    };

    return (
        <AppBar position="relative" color="primary">
            <Toolbar>
                <Button color="inherit" onClick={() => navigate('/')}>WeBay</Button>
                {isLoggedIn ? (
                    <React.Fragment>
                        <Button color="inherit" onClick={() => navigate('/userInfo')}>
                            <AccountCircle />
                        </Button>
                        <Button color="inherit" onClick={handleLogout}>
                            Logout
                        </Button>
                    </React.Fragment>
                ) : null}
            </Toolbar>
        </AppBar>
    );
        
}

export default AppBarr;