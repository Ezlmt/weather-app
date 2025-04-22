import axios from 'axios';

export interface WeatherData {
    temperature: number;
    humidity: number;
    description: string;
    date: string;
}

export interface ForecastData {
    list: Array<{
        dt: number;
        main: {
            temp: number;
            humidity: number;
        };
        weather: Array<{
            description: string;
        }>;
    }>;
}

interface WeatherAPIResponse {
    main: {
        temp: number;
        humidity: number;
    };
    weather: Array<{
        description: string;
    }>;
    dt: number;
}

interface ForecastAPIResponse {
    list: Array<{
        dt: number;
        main: {
            temp: number;
            humidity: number;
        };
        weather: Array<{
            description: string;
        }>;
    }>;
}

interface WeatherErrorResponse {
    message: string;
}

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

const handleApiError = (error: unknown): never => {
    console.error('API Error:', error);
    const axiosError = error as { response?: { data: WeatherErrorResponse } };
    if (axiosError?.response?.data) {
        throw new Error(axiosError.response.data.message || 'Failed to fetch weather data');
    }
    throw new Error('Failed to fetch weather data');
};

export const getCurrentWeather = async (location: string): Promise<WeatherData> => {
    try {
        const response = await axios.get<WeatherAPIResponse>(`${BASE_URL}/weather`, {
            params: {
                q: location,
                appid: API_KEY,
                units: 'metric'
            }
        });
        const data = response.data;
        return {
            temperature: data.main.temp,
            humidity: data.main.humidity,
            description: data.weather[0].description,
            date: new Date(data.dt * 1000).toISOString()
        };
    } catch (error) {
        return handleApiError(error);
    }
};

export const getForecast = async (location: string): Promise<ForecastData> => {
    try {
        const response = await axios.get<ForecastAPIResponse>(`${BASE_URL}/forecast`, {
            params: {
                q: location,
                appid: API_KEY,
                units: 'metric'
            }
        });
        return response.data;
    } catch (error) {
        return handleApiError(error);
    }
};

export const getWeatherByCoordinates = async (lat: number, lon: number): Promise<WeatherData> => {
    try {
        const response = await axios.get<WeatherAPIResponse>(`${BASE_URL}/weather`, {
            params: {
                lat,
                lon,
                appid: API_KEY,
                units: 'metric'
            }
        });
        const data = response.data;
        return {
            temperature: data.main.temp,
            humidity: data.main.humidity,
            description: data.weather[0].description,
            date: new Date(data.dt * 1000).toISOString()
        };
    } catch (error) {
        return handleApiError(error);
    }
};

export const getForecastByCoordinates = async (lat: number, lon: number): Promise<ForecastData> => {
    try {
        const response = await axios.get<ForecastAPIResponse>(`${BASE_URL}/forecast`, {
            params: {
                lat,
                lon,
                appid: API_KEY,
                units: 'metric'
            }
        });
        return response.data;
    } catch (error) {
        return handleApiError(error);
    }
}; 