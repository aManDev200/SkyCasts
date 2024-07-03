import React, { createContext, useState, ReactNode } from 'react';

interface CountryContextProps {
    country: string | null;
    setCountry: (country: string | null) => void;
}

export const CountryContext = createContext<CountryContextProps>({
    country: null,
    setCountry: () => {},
});

interface CountryProviderProps {
    children: ReactNode;
}

export const CountryProvider: React.FC<CountryProviderProps> = ({ children }) => {
    const [country, setCountry] = useState<string | null>(null);

    return (
        <CountryContext.Provider value={{ country, setCountry }}>
            {children}
        </CountryContext.Provider>
    );
};
