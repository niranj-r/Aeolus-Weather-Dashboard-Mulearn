import React from 'react';
import styles from './Favorites.module.css';

function Favorites({ favorites, onSearch }) {
  if (!favorites.length) return null;

  return (
    <div className={styles.container}>
      <h3>Favorites</h3>
      <div className={styles.list}>
        {favorites.map((c) => (
          <button key={c} onClick={() => onSearch(c)} className={styles.btn}>{c}</button>
        ))}
      </div>
    </div>
  );
}

export default Favorites;
