import { Typography, AppBar, CssBaseline, Container, Toolbar, Button } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';

function AppBarr() {
    const navigate = useNavigate();
    return (
        <AppBar position="relative" color="primary">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        WeBay
                    </Typography>
                    <Button color = "inherit" onClick={()=>navigate('/userInfo')} > <AccountCircle /> </Button>
                </Toolbar>
            </AppBar>
    )
}

export default AppBarr;