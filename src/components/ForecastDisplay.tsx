import React from 'react';
import { ForecastData } from '../services/weatherService';

interface ForecastDisplayProps {
    forecast: ForecastData;
}

const ForecastDisplay: React.FC<ForecastDisplayProps> = ({ forecast }) => {
    // Get weather forecast for noon each day
    const dailyForecasts = forecast.list.filter((item) => {
        const date = new Date(item.dt * 1000);
        return date.getHours() === 12;
    });

    return (
        <div className="forecast-display">
            <h2 className="text-2xl font-bold mb-4">5-Day Forecast</h2>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {dailyForecasts.map((day) => {
                    const date = new Date(day.dt * 1000);
                    return (
                        <div key={day.dt} className="text-center p-4 border rounded-lg">
                            <p className="font-semibold">{date.toLocaleDateString()}</p>
                            <p className="text-2xl">{Math.round(day.main.temp)}°C</p>
                            <p>{day.weather[0].description}</p>
                            <p>Humidity: {day.main.humidity}%</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ForecastDisplay; 