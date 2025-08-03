import React from 'react';
import styles from './WeatherCard.module.css';

function WeatherCard({ data, unit, favorites, setFavorites }) {
  const fav = favorites.includes(data.name);

  const toggleFav = () => {
    if (fav) {
      setFavorites(favorites.filter((c) => c !== data.name));
    } else {
      setFavorites([...favorites, data.name]);
    }
  };

  return (
    <div className={styles.card}>
      <h2>{data.name}, {data.sys.country}</h2>
      <p className={styles.temp}>{Math.round(data.main.temp)}°{unit === 'metric' ? 'C' : 'F'}</p>
      <p className={styles.desc}>{data.weather[0].description}</p>
      <p>Humidity: {data.main.humidity}%</p>
      <p>Wind: {data.wind.speed}{unit === 'metric' ? ' m/s' : ' mph'}</p>
      <button onClick={toggleFav}>
        {fav ? 'Remove Favorite' : 'Add Favorite'}
      </button>
    </div>
  );
}

export default WeatherCard;
