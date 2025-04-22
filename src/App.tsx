import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import WeatherDisplay from './components/WeatherDisplay';
import ForecastDisplay from './components/ForecastDisplay';
import WeatherRecords from './components/WeatherRecords';
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
      setWeather(null);
      setForecast(null);

      if (!location.trim()) {
        throw new Error('Please enter a location');
      }

      const [weatherData, forecastData] = await Promise.all([
        getCurrentWeather(location),
        getForecast(location),
      ]);
      setWeather(weatherData);
      setForecast(forecastData);
    } catch (err) {
      console.error('Error fetching weather:', err);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Failed to fetch weather data. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLocationSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchWeather(location.trim());
  };

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      return;
    }

    setLoading(true);
    setError(null);
    setWeather(null);
    setForecast(null);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const [weatherData, forecastData] = await Promise.all([
            getWeatherByCoordinates(position.coords.latitude, position.coords.longitude),
            getForecastByCoordinates(position.coords.latitude, position.coords.longitude),
          ]);
          setWeather(weatherData);
          setForecast(forecastData);
        } catch (err) {
          console.error('Error fetching weather:', err);
          if (err instanceof Error) {
            setError(err.message);
          } else {
            setError('Failed to fetch weather data. Please try again.');
          }
        } finally {
          setLoading(false);
        }
      },
      (err) => {
        console.error('Geolocation error:', err);
        setError('Unable to retrieve your location. Please check your browser settings.');
        setLoading(false);
      },
      {
        timeout: 10000,
        enableHighAccuracy: true,
      }
    );
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
                disabled={loading}
              />
              <button
                type="submit"
                className={`px-4 py-2 rounded text-white ${loading ? 'bg-blue-300' : 'bg-blue-500 hover:bg-blue-600'
                  }`}
                disabled={loading}
              >
                {loading ? 'Searching...' : 'Search'}
              </button>
              <button
                type="button"
                onClick={getCurrentLocation}
                className={`px-4 py-2 rounded text-white ${loading ? 'bg-green-300' : 'bg-green-500 hover:bg-green-600'
                  }`}
                disabled={loading}
              >
                {loading ? 'Locating...' : 'Use My Location'}
              </button>
            </form>
          </div>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          {loading && (
            <div className="text-center py-8">
              <p className="text-gray-600">Loading weather data...</p>
            </div>
          )}

          {weather && <WeatherDisplay weather={weather} />}
          {forecast && <ForecastDisplay forecast={forecast} />}

          <WeatherRecords />
        </div>
      </div>
    </QueryClientProvider>
  );
};

export default App;
