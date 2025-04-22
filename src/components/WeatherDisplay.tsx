import React from 'react';
import { WeatherData } from '../services/weatherService';

interface WeatherDisplayProps {
    weather: WeatherData;
}

const WeatherDisplay: React.FC<WeatherDisplayProps> = ({ weather }) => {
    return (
        <div className="weather-display">
            <h2 className="text-2xl font-bold mb-4">Current Weather</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="text-center p-4 border rounded-lg">
                    <p className="text-3xl font-bold">{weather.temperature}°C</p>
                    <p className="text-gray-600">Temperature</p>
                </div>
                <div className="text-center p-4 border rounded-lg">
                    <p className="text-3xl font-bold">{weather.humidity}%</p>
                    <p className="text-gray-600">Humidity</p>
                </div>
            </div>
            <div className="mt-4 text-center">
                <p className="text-lg">{weather.description}</p>
                <p className="text-sm text-gray-600">{weather.date}</p>
            </div>
        </div>
    );
};

export default WeatherDisplay; 