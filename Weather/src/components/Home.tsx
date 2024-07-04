import{ useState, useEffect, useContext, useRef } from 'react';
import { 
    Box,
    Card,
    CardContent,
    Typography,
    CardMedia,
    useTheme,
    Button,
} from '@mui/material';
import html2canvas from 'html2canvas';
import copy from 'clipboard-copy';
import Autocompleted from './Autocomplete';
import NavBar from './Navbar';
import { CountryContext } from '../context/CountryContext';
import '../index.css';

interface AirQualityData {
    co: number;
    no2: number;
    o3: number;
    so2: number;
    pm2_5: number;
    pm10: number;
    us_epa_index: number;
    gb_defra_index: number;
}

interface WeatherData {
    location: {
      name: string;
      country: string;
    };
    current: {
      temp_c: number;
      temp_f: number;
      condition: {
        text: string;
        icon: string;
      };
      feelslike_c: number;
      humidity: number;
      wind_kph: number;
      last_updated: string;
      air_quality: AirQualityData;
    };
}

interface ForecastData {
    location: {
      name: string;
      country: string;
    };
    forecast: {
      forecastday: {
        date: string;
        day: {
          maxtemp_c: number;
          maxtemp_f: number;
          mintemp_c: number;
          mintemp_f: number;
          avgtemp_c: number;
          avgtemp_f: number;
          maxwind_kph: number;
          totalprecip_mm: number;
          avghumidity: number;
          condition: {
            text: string;
            icon: string;
          };
        };
      }[];
    };
}

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

export default function Home() {
    const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
    const [forecastData, setForecastData] = useState<ForecastData | null>(null);
    const { country } = useContext(CountryContext);
    const theme = useTheme();
    const contentRef = useRef(null);

    useEffect(() => {
        async function fetchData() {
            const location = country || 'India';
            const weatherUrl = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${location}&aqi=yes`;
            const forecastUrl = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${location}&days=1&aqi=yes`;

            const [weatherResponse, forecastResponse] = await Promise.all([
                fetch(weatherUrl),
                fetch(forecastUrl)
            ]);

            const weatherResult = await weatherResponse.json();
            const forecastResult = await forecastResponse.json();

            setWeatherData(weatherResult);
            setForecastData(forecastResult);
        }
        fetchData();
    }, [country]);

    const captureAndCopyScreenshot = async () => {
        if (contentRef.current) {
            try {
                const canvas = await html2canvas(contentRef.current);
                const dataUrl = canvas.toDataURL('image/png');
                await copy(dataUrl);
                alert('Screenshot copied to clipboard!');
            } catch (error) {
                console.error('Failed to capture or copy screenshot:', error);
                alert('Failed to capture or copy screenshot. Please try again.');
            }
        }
    };

    return (
        <div className="home-container">
            <NavBar />
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
                width: '100%',
                paddingTop: '5%',
                backgroundColor: theme.palette.background.default,
            }}>
                <Autocompleted />
            </Box>
            <Box ref={contentRef} sx={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                bgcolor: theme.palette.background.default,
                padding: '40px',
                gap: '40px',
                maxWidth: '1200px', 
                margin: '0 auto',
            }}>
                <Box sx={{ 
                    width: { xs: '100%', sm: '45%', md: '30%' },
                    transition: 'transform 0.3s, box-shadow 0.3s',
                    '&:hover': { 
                        transform: 'scale(1.03)', 
                        boxShadow: '0 10px 20px rgba(0,0,0,0.2)'
                    }
                }}>
                    <Card className="weather-card">
                        <CardMedia
                            component="img"
                            height='140'
                            image="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Stormclouds.jpg/250px-Stormclouds.jpg"
                            alt="weather background" 
                        />
                        <CardContent sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                            <Typography variant='h4' gutterBottom component="div" sx={{ fontWeight: 'bold', color: theme.palette.primary.main }}>
                                Weather
                            </Typography>
                            {weatherData && (
                                <>
                                    <Typography variant="h6" gutterBottom sx={{ color: theme.palette.text.secondary }}>
                                        {weatherData.location.name}, {weatherData.location.country}
                                    </Typography>
                                    <Box display="flex" alignItems="center" mb={2}>
                                        <img 
                                            src={`https:${weatherData.current.condition.icon}`} 
                                            alt={weatherData.current.condition.text}
                                            style={{ marginRight: '10px' }}
                                        />
                                        <Typography variant="body1">
                                            {weatherData.current.condition.text}
                                        </Typography>
                                    </Box>
                                    <Typography variant="h5" fontWeight="bold" mb={2} sx={{ color: theme.palette.secondary.main }}>
                                        {weatherData.current.temp_c}°C / {weatherData.current.temp_f}°F
                                    </Typography>
                                    <Box sx={{ flexGrow: 1 }}>
                                        <Typography variant="body2">
                                            Feels like: {weatherData.current.feelslike_c}°C
                                        </Typography>
                                        <Typography variant="body2">
                                            Humidity: {weatherData.current.humidity}%
                                        </Typography>
                                        <Typography variant="body2">
                                            Wind: {weatherData.current.wind_kph} km/h
                                        </Typography>
                                    </Box>
                                    <Typography variant="caption" display="block" mt={2} sx={{ color: theme.palette.text.secondary }}>
                                        Last updated: {weatherData.current.last_updated}
                                    </Typography>
                                </>
                            )}
                        </CardContent>
                    </Card>
                </Box>

                <Box sx={{ 
                    width: { xs: '100%', sm: '45%', md: '30%' },
                    transition: 'transform 0.3s, box-shadow 0.3s',
                    '&:hover': { 
                        transform: 'scale(1.03)', 
                        boxShadow: '0 10px 20px rgba(0,0,0,0.2)'
                    }
                }}>
                    <Card className="forecast-card">
                        <CardMedia
                            component="img"
                            height='140'
                            image="https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                            alt="forecast background" 
                        />
                        <CardContent sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                            <Typography variant='h4' gutterBottom component="div" sx={{ fontWeight: 'bold', color: theme.palette.primary.main }}>
                                Forecast
                            </Typography>
                            {forecastData && (
                                <>
                                    <Typography variant="h6" gutterBottom sx={{ color: theme.palette.text.secondary }}>
                                        {forecastData.location.name}, {forecastData.location.country}
                                    </Typography>
                                    <Box display="flex" alignItems="center" mb={2}>
                                        <img 
                                            src={`https:${forecastData.forecast.forecastday[0].day.condition.icon}`} 
                                            alt={forecastData.forecast.forecastday[0].day.condition.text}
                                            style={{ marginRight: '10px' }}
                                        />
                                        <Typography variant="body1">
                                            {forecastData.forecast.forecastday[0].day.condition.text}
                                        </Typography>
                                    </Box>
                                    <Typography variant="h5" fontWeight="bold" mb={2} sx={{ color: theme.palette.secondary.main }}>
                                        {forecastData.forecast.forecastday[0].day.avgtemp_c}°C / {forecastData.forecast.forecastday[0].day.avgtemp_f}°F
                                    </Typography>
                                    <Box sx={{ flexGrow: 1 }}>
                                        <Typography variant="body2">
                                            Max Temp: {forecastData.forecast.forecastday[0].day.maxtemp_c}°C / {forecastData.forecast.forecastday[0].day.maxtemp_f}°F
                                        </Typography>
                                        <Typography variant="body2">
                                            Humidity: {forecastData.forecast.forecastday[0].day.avghumidity}%
                                        </Typography>
                                        <Typography variant="body2">
                                            Wind: {forecastData.forecast.forecastday[0].day.maxwind_kph} km/h
                                        </Typography>
                                    </Box>
                                    <Typography variant="caption" display="block" mt={2} sx={{ color: theme.palette.text.secondary }}>
                                        Date: {forecastData.forecast.forecastday[0].date}
                                    </Typography>
                                </>
                            )}
                        </CardContent>
                    </Card>
                </Box>

                <Box sx={{ 
                    width: { xs: '100%', sm: '45%', md: '30%' },
                    transition: 'transform 0.3s, box-shadow 0.3s',
                    '&:hover': { 
                        transform: 'scale(1.03)', 
                        boxShadow: '0 10px 20px rgba(0,0,0,0.2)'
                    }
                }}>
                    <Card className="air-quality-card">
                        <CardMedia
                            component="img"
                            height='150'
                            image="https://images.pexels.com/photos/209831/pexels-photo-209831.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                            alt="air quality background" 
                        />
                        <CardContent sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                            <Typography variant='h4' gutterBottom component="div" sx={{ fontWeight: 'bold', color: theme.palette.primary.main }}>
                                Air Quality
                            </Typography>
                            {weatherData && forecastData && (
                                <>
                                    <Typography variant="h6" gutterBottom sx={{ color: theme.palette.text.secondary }}>
                                        {weatherData.location.name}, {weatherData.location.country}
                                    </Typography>
                                    <Box sx={{ flexGrow: 1 }}>
                                        <Typography variant="body2">
                                            CO: {weatherData.current.air_quality.co.toFixed(2)}
                                        </Typography>
                                        <Typography variant="body2">
                                            NO2: {weatherData.current.air_quality.no2.toFixed(2)}
                                        </Typography>
                                        <Typography variant="body2">
                                            O3: {weatherData.current.air_quality.o3.toFixed(2)}
                                        </Typography>
                                        <Typography variant="body2">
                                            SO2: {weatherData.current.air_quality.so2.toFixed(2)}
                                        </Typography>
                                        <Typography variant="body2">
                                            PM2.5: {weatherData.current.air_quality.pm2_5.toFixed(2)}
                                        </Typography>
                                        <Typography variant="body2">
                                            PM10: {weatherData.current.air_quality.pm10.toFixed(2)}
                                        </Typography>
                                        <Typography variant="body2">
                                            US EPA Index: {weatherData.current.air_quality.us_epa_index}
                                        </Typography>
                                        <Typography variant="body2">
                                            UK DEFRA Index: {weatherData.current.air_quality.gb_defra_index}
                                        </Typography>
                                    </Box>
                                    <Typography variant="caption" display="block" mt={2} sx={{ color: theme.palette.text.secondary }}>
                                        Date: {forecastData.forecast.forecastday[0].date}
                                    </Typography>
                                </>
                            )}
                        </CardContent>
                    </Card>
                </Box>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2, mb: 4 }}>
                <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={captureAndCopyScreenshot}
                    className="screenshot-button"
                >
                    Capture and Copy Screenshot
                </Button>
            </Box>
        </div>
    );
}
