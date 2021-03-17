import React from 'react';
import SchedulerForm from './components/forms/scheduler_form';

import styles from '../styles/screens/form_screens.module.css';

function Scheduler() {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.card}>
          <h1>Scheduler</h1>
          <SchedulerForm />
        </div>
      </div>
    </>
  );
}

export default Scheduler;
