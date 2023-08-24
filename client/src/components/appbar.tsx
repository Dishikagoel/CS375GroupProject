import { Typography, AppBar, CssBaseline, Container, Toolbar, Button } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';

function AppBarr() {
    const navigate = useNavigate();
    return (
        <AppBar position="relative" color="primary">
                <Toolbar>
                <Button color = "inherit" onClick={()=>navigate('/')} component="div"> WeBay </Button>
                <Button color = "inherit" onClick={()=>navigate('/userInfo')} > <AccountCircle /> </Button>
                </Toolbar>
            </AppBar>
    )
}

export default AppBarr;