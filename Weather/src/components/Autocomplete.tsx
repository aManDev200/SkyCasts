import { Stack, Autocomplete, TextField } from '@mui/material'
import { useEffect, useState, useContext } from 'react'
import { CountryContext } from '../context/CountryContext';

interface Country {
    name: {
      common: string;
      official: string;
    };
}
  
interface CountryName {
    commonName: string;
    officialName: string;
}
  
async function handle(): Promise<CountryName[]> {
    const data: Country[] = await test();
    return data.map((country: Country): CountryName => ({
      commonName: country.name.common,
      officialName: country.name.official,
    }));
}
  
async function test(): Promise<Country[]> {
    const response = await fetch('https://restcountries.com/v3.1/all?fields=name,flags');
    const data: Country[] = await response.json();
    return data;
}

export default function Autocompleted() {
    const [countries, setCountries] = useState<CountryName[]>([]);
    const { setCountry } = useContext(CountryContext);
    
    useEffect(() => {
        handle().then(data => setCountries(data));
    }, []);
    
    return (
        <Stack spacing={2} width='250px'>
            <Autocomplete 
                options={countries}
                getOptionLabel={(option: CountryName) => option.commonName}
                renderInput={(params) => (
                    <TextField {...params} label='Select A Country' />
                )}
                onChange={(_event, value) => {
                    if (value) {
                        setCountry(value.commonName);
                    } else {
                        setCountry(null);
                    }
                }}
            />
        </Stack>
    )
}
