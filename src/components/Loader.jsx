import React from 'react';
import styles from './Loader.module.css';
import loaderImg from './loader.png';

function Loader() {
  return (
    <div className={styles.loaderWrap}>
      <img src={loaderImg} alt="Loading..." className={styles.loaderImage} />
    </div>
  );
}

export default Loader;
