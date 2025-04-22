import axios from 'axios';

const API_KEY = 'YOUR_OPENWEATHERMAP_API_KEY';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export interface WeatherData {
    main: {
        temp: number;
        feels_like: number;
        humidity: number;
        pressure: number;
    };
    weather: {
        main: string;
        description: string;
        icon: string;
    }[];
    wind: {
        speed: number;
        deg: number;
    };
    name: string;
}

export interface ForecastData {
    list: {
        dt: number;
        main: {
            temp: number;
            feels_like: number;
            humidity: number;
            pressure: number;
        };
        weather: {
            main: string;
            description: string;
            icon: string;
        }[];
        wind: {
            speed: number;
            deg: number;
        };
    }[];
    city: {
        name: string;
    };
}

export const getCurrentWeather = async (location: string): Promise<WeatherData> => {
    const response = await axios.get(`${BASE_URL}/weather`, {
        params: {
            q: location,
            appid: API_KEY,
            units: 'metric',
        },
    });
    return response.data;
};

export const getForecast = async (location: string): Promise<ForecastData> => {
    const response = await axios.get(`${BASE_URL}/forecast`, {
        params: {
            q: location,
            appid: API_KEY,
            units: 'metric',
        },
    });
    return response.data;
};

export const getWeatherByCoordinates = async (lat: number, lon: number): Promise<WeatherData> => {
    const response = await axios.get(`${BASE_URL}/weather`, {
        params: {
            lat,
            lon,
            appid: API_KEY,
            units: 'metric',
        },
    });
    return response.data;
};

export const getForecastByCoordinates = async (lat: number, lon: number): Promise<ForecastData> => {
    const response = await axios.get(`${BASE_URL}/forecast`, {
        params: {
            lat,
            lon,
            appid: API_KEY,
            units: 'metric',
        },
    });
    return response.data;
}; 