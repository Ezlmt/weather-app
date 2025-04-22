import React from 'react';
import { WeatherData } from '../services/weatherService';

interface WeatherDisplayProps {
    weather: WeatherData;
}

const WeatherDisplay: React.FC<WeatherDisplayProps> = ({ weather }) => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">{weather.name}</h2>
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-4xl font-bold">{Math.round(weather.main.temp)}°C</p>
                    <p className="text-gray-600">{weather.weather[0].description}</p>
                </div>
                <img
                    src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                    alt={weather.weather[0].description}
                    className="w-20 h-20"
                />
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4">
                <div>
                    <p className="text-gray-600">Feels Like</p>
                    <p className="font-semibold">{Math.round(weather.main.feels_like)}°C</p>
                </div>
                <div>
                    <p className="text-gray-600">Humidity</p>
                    <p className="font-semibold">{weather.main.humidity}%</p>
                </div>
                <div>
                    <p className="text-gray-600">Wind Speed</p>
                    <p className="font-semibold">{weather.wind.speed} m/s</p>
                </div>
                <div>
                    <p className="text-gray-600">Pressure</p>
                    <p className="font-semibold">{weather.main.pressure} hPa</p>
                </div>
            </div>
        </div>
    );
};

export default WeatherDisplay; 