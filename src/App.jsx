import React, { useState, useEffect, useCallback } from 'react';
import styles from './App.module.css';
import WeatherSearch from './components/WeatherSearch';
import WeatherCard from './components/WeatherCard';
import Forecast from './components/Forecast';
import Favorites from './components/Favorites';
import Loader from './components/Loader';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [unit] = useState('metric');
  const [favorites, setFavorites] = useState(() => {
    const f = localStorage.getItem('favorites');
    return f ? JSON.parse(f) : [];
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const handleSearch = useCallback(async (city) => {
    setLoading(true);
    setError('');
    const apiKey = '71756a1adc15b10186f710bfb5293669';
    try {
      const weatherRes = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${apiKey}`
      );
      if (!weatherRes.ok) throw new Error('City not found');
      const wJson = await weatherRes.json();
      setWeatherData(wJson);

      const forecastRes = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${unit}&appid=${apiKey}`
      );
      const fJson = await forecastRes.json();
      setForecastData(fJson);
    } catch (err) {
      setError(err.message);
      setWeatherData(null);
      setForecastData(null);
    } finally {
      setLoading(false);
    }
  }, [unit]);

  useEffect(() => {
    handleSearch('Kerala');
  }, [handleSearch]);


  return (
    <div className={styles.app}>
      <div className={styles.search}>
        <div className={styles.header}>
          <h1>Aeolus Dashboard</h1>
        </div>
        <WeatherSearch onSearch={handleSearch} />
        <Favorites favorites={favorites} onSearch={handleSearch} />
      </div>
      <div className={styles.content}>
        {error && <p className={styles.error}>{error}</p>}
        {loading && <Loader />}

        {weatherData && !loading && (
          <>
            <WeatherCard
              data={weatherData}
              unit={unit}
              favorites={favorites}
              setFavorites={setFavorites}
            />
            <Forecast data={forecastData} unit={unit} />
          </>
        )}
      </div>
    </div>
  );
}

export default App;
