import React from 'react';
import styles from './Forecast.module.css';

function Forecast({ data, unit }) {
  if (!data || !data.list) return null;

  const days = data.list.filter((i) => i.dt_txt.includes("12:00:00"));

  return (
    <div className={styles.wrap}>
      {days.slice(0, 5).map((d) => (
        <div key={d.dt} className={styles.day}>
          <p>{new Date(d.dt_txt).toLocaleDateString()}</p>
          <img src={`http://openweathermap.org/img/wn/${d.weather[0].icon}@2x.png`} alt="" />
          <p>{Math.round(d.main.temp)}°{unit === 'metric' ? 'C' : 'F'}</p>
          <p className={styles.desc}>{d.weather[0].main}</p>
        </div>
      ))}
    </div>
  );
}

export default Forecast;
