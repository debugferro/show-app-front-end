import React from 'react';
import { Link } from 'react-router-dom';

import styles from '../../styles/components/navbar.module.css';

function NavBar() {
  return (
    <div className={styles.navContainer}>
      <div className={styles.content}>
        <div>
          <h1>What's to watch?</h1>
        </div>
        <div className={styles.links}>
          <Link to="/">Home</Link>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
