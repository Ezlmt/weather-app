import React from 'react';
import { ForecastData } from '../services/weatherService';

interface ForecastDisplayProps {
    forecast: ForecastData;
}

const ForecastDisplay: React.FC<ForecastDisplayProps> = ({ forecast }) => {
    // 获取每天中午的天气预报
    const dailyForecasts = forecast.list.filter((item) => {
        const date = new Date(item.dt * 1000);
        return date.getHours() === 12;
    });

    return (
        <div className="bg-white p-6 rounded-lg shadow-md mt-4">
            <h2 className="text-2xl font-bold mb-4">5-Day Forecast</h2>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {dailyForecasts.map((day) => {
                    const date = new Date(day.dt * 1000);
                    return (
                        <div key={day.dt} className="text-center p-4 border rounded-lg">
                            <p className="font-semibold">
                                {date.toLocaleDateString('en-US', { weekday: 'short' })}
                            </p>
                            <img
                                src={`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                                alt={day.weather[0].description}
                                className="w-16 h-16 mx-auto"
                            />
                            <p className="text-xl font-bold">{Math.round(day.main.temp)}°C</p>
                            <p className="text-sm text-gray-600">{day.weather[0].description}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ForecastDisplay; 