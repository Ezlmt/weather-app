import axios from 'axios';

const API_KEY = 'b764ed424914efe10722348d2a111ed9';
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

const handleApiError = (error: unknown, context: string): never => {
    if (error && typeof error === 'object' && 'response' in error) {
        const axiosError = error as { response?: { data?: any; status?: number } };
        console.error(`${context} API Error:`, {
            status: axiosError.response?.status,
            data: axiosError.response?.data
        });
        if (axiosError.response?.data?.message) {
            throw new Error(axiosError.response.data.message);
        }
    }
    console.error(`${context} Unknown Error:`, error);
    throw new Error('Failed to fetch weather data. Please check your internet connection and try again.');
};

export const getCurrentWeather = async (location: string): Promise<WeatherData> => {
    try {
        console.log('Fetching weather for location:', location);
        const url = `${BASE_URL}/weather`;
        const params = {
            q: location,
            appid: API_KEY,
            units: 'metric',
        };
        console.log('Weather API request:', { url, params });

        const response = await axios.get<WeatherData>(url, { params });
        console.log('Weather API response:', response.data);
        return response.data;
    } catch (error) {
        return handleApiError(error, 'Weather');
    }
};

export const getForecast = async (location: string): Promise<ForecastData> => {
    try {
        console.log('Fetching forecast for location:', location);
        const url = `${BASE_URL}/forecast`;
        const params = {
            q: location,
            appid: API_KEY,
            units: 'metric',
        };
        console.log('Forecast API request:', { url, params });

        const response = await axios.get<ForecastData>(url, { params });
        console.log('Forecast API response:', response.data);
        return response.data;
    } catch (error) {
        return handleApiError(error, 'Forecast');
    }
};

export const getWeatherByCoordinates = async (lat: number, lon: number): Promise<WeatherData> => {
    try {
        console.log('Fetching weather for coordinates:', { lat, lon });
        const url = `${BASE_URL}/weather`;
        const params = {
            lat,
            lon,
            appid: API_KEY,
            units: 'metric',
        };
        console.log('Weather API request:', { url, params });

        const response = await axios.get<WeatherData>(url, { params });
        console.log('Weather API response:', response.data);
        return response.data;
    } catch (error) {
        return handleApiError(error, 'Weather');
    }
};

export const getForecastByCoordinates = async (lat: number, lon: number): Promise<ForecastData> => {
    try {
        console.log('Fetching forecast for coordinates:', { lat, lon });
        const url = `${BASE_URL}/forecast`;
        const params = {
            lat,
            lon,
            appid: API_KEY,
            units: 'metric',
        };
        console.log('Forecast API request:', { url, params });

        const response = await axios.get<ForecastData>(url, { params });
        console.log('Forecast API response:', response.data);
        return response.data;
    } catch (error) {
        return handleApiError(error, 'Forecast');
    }
}; 