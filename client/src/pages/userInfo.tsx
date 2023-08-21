import { Typography, AppBar, CssBaseline, Container, Toolbar, CardContent, Tabs, Tab, Box, Button, Stack } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { cyan, purple } from '@mui/material/colors';
import * as React from 'react';
import AppBarr from '../components/appbar';

const theme = createTheme({
    palette: {
        primary: cyan,
        secondary: purple
    }
});

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function Buttons() {
    return (
      <Stack spacing={2} direction="row">
        <Button variant="contained">Make a New Auction</Button>
        <Button variant="contained">Browse Products</Button>
      </Stack>
    );
}

function CustomTabPanel(props: TabPanelProps) {
const { children, value, index, ...other } = props;

return (
    <div
    role="tabpanel"
    hidden={value !== index}
    id={`simple-tabpanel-${index}`}
    aria-labelledby={`simple-tab-${index}`}
    {...other}
    >
    {value === index && (
        <Box sx={{ p: 3 }}>
        <Typography>{children}</Typography>
        </Box>
    )}
    </div>
);
}

function a11yProps(index: number) {
return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
};
}

function BasicTabs() {
const [value, setValue] = React.useState(0);

const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
};

return (
    <Box sx={{ width: '100%' }}>
    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
        <Tab label="Your Purchases" {...a11yProps(0)} />
        <Tab label="Your Auctions" {...a11yProps(1)} />
        </Tabs>
    </Box>
    <CustomTabPanel value={value} index={0}>
        1. Purchase 
        &nbsp;
    </CustomTabPanel>
    <CustomTabPanel value={value} index={1}>
        1. Auctions
        &nbsp;
    </CustomTabPanel>
    </Box>
);
}


const UserInfo = () => {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <AppBarr />
            <main>
                <div>
                    <Container>
                        <CardContent>
                            <Typography variant="h4" align="center" color="textPrimary" gutterBottom>
                                Hello "user name"
                            </Typography>
                            <BasicTabs />
                            </CardContent>
                            &nbsp;
                            <Buttons />
                            &nbsp;
                            <Typography>
                                Strikes: 0
                            </Typography>
                    </Container>
                </div>
            </main>
        </ThemeProvider>
    );
}

export default UserInfo;