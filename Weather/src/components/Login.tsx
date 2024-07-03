import { 
    Paper,
    TextField,
    Typography,
    Box,
    Button,
    Grid
} from '@mui/material';
import NavBar from './Navbar';

export default function Login() {
    return (
        <>
        <NavBar />
        <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '100vh' }}>
            <Grid item xs={10} sm={8} md={6} lg={4}>
                <Paper elevation={24} sx={{ padding: '32px', borderRadius: '15px' }}>
                    <Typography variant='h4' color="primary" sx={{ 
                        textAlign: 'center',
                        margin: '0 0 30px 0',
                        fontWeight: 700,
                        letterSpacing: 1,
                        textTransform: 'uppercase',
                        borderBottom: '2px solid',
                        paddingBottom: '10px',
                        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
                        position: 'relative',
                        '::before': {
                            content: '""',
                            position: 'absolute',
                            bottom: '-2px',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            width: '50px',
                            height: '2px',
                            backgroundColor: 'primary.main',
                        }
                    }}>
                        Login
                    </Typography>
                    <Box component="form" sx={{ '& .MuiTextField-root': { margin: '10px 0' } }}>
                        <TextField 
                            fullWidth
                            label="Email"
                            type='email'
                            variant="outlined"
                        />
                        <TextField 
                            fullWidth
                            label="Password"
                            type="password"
                            variant="outlined"
                        />
                        <Box sx={{ textAlign: 'center', marginTop: '20px', fontWeight : 700}}>
                            <Button variant="contained" color="primary">
                                Login
                            </Button>
                        </Box>
                    </Box>
                </Paper>
            </Grid>
        </Grid>
        </>
    );
}
