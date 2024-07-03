import {
    Stack,
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Button,
    useTheme,
    useMediaQuery
} from '@mui/material';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import { Link } from 'react-router-dom';

export default function NavBar() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <AppBar position='static' color='primary' sx={{ padding: '0 16px', backgroundColor: '#1e1e1e' }}>
            <Toolbar>
                <IconButton size='large' edge='start' color='inherit' aria-label='logo'>
                    <AcUnitIcon />
                </IconButton>
                <Typography variant='h4' component='div' sx={{ flexGrow: 1, marginRight: 2, color: '#ffffff' }}>
                    SkyCast
                </Typography>
                <Stack
                    spacing={isMobile ? 1 : 2}
                    direction={isMobile ? 'column' : 'row'}
                    sx={{
                        '& .MuiButton-root': {
                            color: 'white',
                            '&:hover': {
                                backgroundColor: theme.palette.primary.main,
                                color: 'black'
                            }
                        }
                    }}
                >
                    <Button component={Link} to="/">Home</Button>
                    <Button component={Link} to="/contact">Contact Us</Button>
                </Stack>
            </Toolbar>
        </AppBar>
    );
}
