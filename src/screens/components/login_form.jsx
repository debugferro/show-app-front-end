import React from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import styles from '../../styles/components/form.module.css';

import requestAuthentication from '../../requests/authentication';

const validationSchema = yup.object().shape({
  email: yup.string().required('Email is required!'),
  password: yup.string().required('Password is required!'),
});

export default function LoginForm() {
  const { register, handleSubmit, errors } = useForm({ mode: 'onChange', resolver: yupResolver(validationSchema) });
  const dispatch = useDispatch();
  const history = useHistory();

  const onSubmit = async (data) => {
    dispatch(requestAuthentication(data));
    history.push('/');
  };

  return (
    <div>
      <form className={styles.formContainer} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.formInput}>
          <input required noValidate type="text" name="email" id="email" ref={register()} />
          <label htmlFor="email">E-mail</label>
          <div className={`${styles.formWarning} ${errors.email ? styles.error : ''}`}>
            {errors.email && <p>{errors.email.message}</p>}
          </div>
        </div>
        <div className={styles.formInput}>
          <input required noValidate type="password" name="password" id="password" ref={register()} />
          <label htmlFor="password">Password</label>
          <div className={`${styles.formWarning} ${errors.password ? styles.error : ''}`}>
            {errors.password && <span>{errors.password.message}</span>}
          </div>
        </div>
        <p>Dont have login? <Link to="/signup">Signup</Link></p>
        <input className={styles.formSubmit} type="submit" />
      </form>
    </div>
  );
}
