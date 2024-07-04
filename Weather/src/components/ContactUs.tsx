import { useState, ChangeEvent, FormEvent } from 'react';
import { 
    Paper,
    TextField,
    Typography,
    Box,
    Button,
    Grid,
    Snackbar,
    Alert
} from '@mui/material';
import NavBar from './Navbar';
import axios from 'axios';

interface FormData {
    name: string;
    phoneNumber: string;
    email: string;
    message: string;
}

export default function ContactUs() {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        phoneNumber: '',
        email: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [responseMessage, setResponseMessage] = useState('');
    const [showSnackbar, setShowSnackbar] = useState(false);
    const [isError, setIsError] = useState(false);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const response = await axios.post('https://sky-casts-backend.vercel.app/contact', formData);
            setResponseMessage(response.data.message);
            setIsError(false);
            setFormData({ name: '', phoneNumber: '', email: '', message: '' });
        } catch (error) {
            console.error(error);
            setResponseMessage('An error occurred while submitting the form');
            setIsError(true);
        } finally {
            setIsSubmitting(false);
            setShowSnackbar(true);
        }
    };

    const handleCloseSnackbar = () => {
        setShowSnackbar(false);
    };

    return (
        <>
        <NavBar />
        <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '80vh' }}>
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
                        Contact Us
                    </Typography>
                    <Typography variant="body2" sx={{ marginBottom: '20px', textAlign: 'center' }}>
                        Have a question or feedback? We'd love to hear from you!
                    </Typography>
                    <Box component="form" sx={{ '& .MuiTextField-root': { margin: '10px 0' } }} onSubmit={handleSubmit}>
                        <TextField 
                            fullWidth
                            label="Name"
                            variant="outlined"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                        <TextField 
                            fullWidth
                            label="Phone Number"
                            type="tel"
                            variant="outlined"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            required
                        />
                        <TextField 
                            fullWidth
                            label="Email"
                            type='email'
                            variant="outlined"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                        <TextField 
                            fullWidth
                            label="Message"
                            multiline
                            rows={4}
                            variant="outlined"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            required
                        />
                        <Box sx={{ textAlign: 'center', marginTop: '20px', fontWeight : 700}}>
                            <Button 
                                variant="contained" 
                                color="primary" 
                                type="submit"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Sending...' : 'Send'}
                            </Button>
                        </Box>
                    </Box>
                    <Typography variant="body2" sx={{ marginTop: '20px', textAlign: 'center' }}>
                        Or reach us at: amansinghdev200@gmail.com | +91-6306877617
                    </Typography>
                </Paper>
            </Grid>
        </Grid>
        <Snackbar 
            open={showSnackbar} 
            autoHideDuration={6000} 
            onClose={handleCloseSnackbar}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
            <Alert onClose={handleCloseSnackbar} severity={isError ? "error" : "success"} sx={{ width: '100%' }}>
                {responseMessage}
            </Alert>
        </Snackbar>
        </>
    );
}
