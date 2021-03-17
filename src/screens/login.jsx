import React from 'react';
import LoginForm from './components/forms/login_form';

import styles from '../styles/screens/form_screens.module.css';

function Login() {
  return (
    <>
        <div className={styles.container}>
          <div className={styles.card}>
            <h1>Sign In</h1>
            <LoginForm />
          </div>
        </div>
    </>
  );
}

export default Login;
