import React, { useState, useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import WeatherDisplay from './components/WeatherDisplay';
import ForecastDisplay from './components/ForecastDisplay';
import {
  getCurrentWeather,
  getForecast,
  getWeatherByCoordinates,
  getForecastByCoordinates,
  WeatherData,
  ForecastData,
} from './services/weatherService';

const queryClient = new QueryClient();

const App: React.FC = () => {
  const [location, setLocation] = useState('');
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchWeather = async (location: string) => {
    try {
      setLoading(true);
      setError(null);
      const [weatherData, forecastData] = await Promise.all([
        getCurrentWeather(location),
        getForecast(location),
      ]);
      setWeather(weatherData);
      setForecast(forecastData);
    } catch (err) {
      setError('Failed to fetch weather data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleLocationSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (location.trim()) {
      fetchWeather(location.trim());
    }
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            setLoading(true);
            setError(null);
            const [weatherData, forecastData] = await Promise.all([
              getWeatherByCoordinates(position.coords.latitude, position.coords.longitude),
              getForecastByCoordinates(position.coords.latitude, position.coords.longitude),
            ]);
            setWeather(weatherData);
            setForecast(forecastData);
          } catch (err) {
            setError('Failed to fetch weather data. Please try again.');
          } finally {
            setLoading(false);
          }
        },
        () => {
          setError('Unable to retrieve your location');
        }
      );
    } else {
      setError('Geolocation is not supported by your browser');
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-gray-100 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8">Weather App</h1>
          
          <div className="mb-8">
            <form onSubmit={handleLocationSearch} className="flex gap-4">
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Enter location (city, zip code, etc.)"
                className="flex-1 p-2 border rounded"
              />
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Search
              </button>
              <button
                type="button"
                onClick={getCurrentLocation}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Use My Location
              </button>
            </form>
          </div>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          {loading && (
            <div className="text-center">
              <p>Loading...</p>
            </div>
          )}

          {weather && <WeatherDisplay weather={weather} />}
          {forecast && <ForecastDisplay forecast={forecast} />}
        </div>
      </div>
    </QueryClientProvider>
  );
};

export default App;
