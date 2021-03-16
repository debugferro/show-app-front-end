import React, { useEffect, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import dayjs from 'dayjs';

import debounce from "lodash/debounce";

import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import AsyncSelect from 'react-select/async';
import makeAnimated from 'react-select/animated';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import styles from '../../styles/components/form.module.css';
import searchShows from '../../requests/search_shows.js';


toast.configure();

const validationSchema = yup.object().shape({
  email: yup.string()
    .email('E-mail address format is invalid')
    .required('E-mail address is required'),
  first_name: yup.string().min(3).max(20).required('First Name is required'),
  last_name: yup.string().min(3).max(20).required('Last Name is required'),
  username: yup.string().min(3).max(20).required('Username is required'),
  password: yup.string().required('Password is required!').min(8).max(20),
  password_confirmation: yup.string().required('Password confirmation is required')
    .oneOf([yup.ref('password'), null], 'Password must match'),
});

export default function SingUpForm() {
  const { register, handleSubmit, errors, control } = useForm({ mode: 'onChange', resolver: yupResolver(validationSchema) });
  const animatedComponents = makeAnimated();

  const dispatch = useDispatch();

  const [options, setOptions] = useState([{value: '', label: ''}]);
  const shows = useSelector((state) => state.shows.entities);
  const ids = useSelector((state) => state.shows.ids);

  const [date, setDate] = useState(dayjs());

  const createOptions = (showIds) => {
    return showIds.map((id) => {
      return { value: shows[id].id, label: shows[id].title }
    })
  }

  useEffect(() => {
    setOptions(createOptions(ids))
  }, [shows])

  const onSubmit = async (data) => {
  };

  // useEffect(() => {
  //   if (apiErrors && apiErrors.length) {
  //     apiErrors.forEach((error) => {
  //       toast.error(error, {
  //         position: "top-right",
  //         autoClose: 5000,
  //         hideProgressBar: false,
  //         closeOnClick: true,
  //         pauseOnHover: true,
  //         draggable: true,
  //         progress: undefined,
  //       });
  //     })
  //   }
  // }, [apiErrors]);

  // const loadOptions = async (query) => {
  //   await setSearchTerm(query)
  //   await refetch()
  //   return createOptions()
  // }

  // const displayOptions = (payload) => {
  //   return payload.data.entities.map((id) => {
  //     return { value: shows[id].id, label: shows[id].title }
  //   })
  // }

const loadOptions = useCallback(
  debounce((query, callback) => {
    dispatch(searchShows(query))
    .then((options) => callback(console.log(options)));
  }, 1000)
)

// const addYears = (date, quantity) => {
//   const full = date.getDate();
//   date.setMonth(date.getFullYear() + quantity);
//   const teste = new Date(date.setFullYear(date.getFullYear() + quantity))
//   console.log(teste)
//   return teste
// };

  return (
    <>
      <form className={styles.formContainer} onSubmit={handleSubmit(onSubmit)}>
        <Controller
          className={styles.select}
          name={'show'}
          control={control}
          cacheOptions
          defaultOptions={options}
          loadOptions={loadOptions}
          closeMenuOnSelect={true}
          components={animatedComponents}
          as={AsyncSelect}
        />
        <Controller
          name={'date'}
          className={styles.dateInput}
          showTimeInput
          timeInputLabel={"Time:"}
          dateFormat={"MM/dd/yyyy h:mm aa"}
          minDate={date.toDate()}
          maxDate={date.add(1, 'year').toDate()}
          selected={date.toDate()}
          control={control}
          placeholderText={"When you're watching?"}
          as={DatePicker}
        />
        <div className={styles.formInput}>
          <input required noValidate type="text" name="email" id="email" ref={register()} />
          <label htmlFor="email">E-mail</label>
          <div className={`${styles.formWarning} ${errors.email ? styles.error : ''}`}>
            {errors.email && <span>{errors.email.message}</span>}
          </div>
        </div>
        <input className={styles.formSubmit} type="submit" value="Sign Up" />
      </form>
    </>
  );
}

// const onSubmit = async (data) => {

// };

// const searchShow = async (query) => {
//   const response = await mutation.mutate(query)
//   console.log(queryClient.getQueryState('shows'))
//   // return createOptions(response.payload.entities)
// }

// const loadOptions = useCallback(
//   debounce((query, callback) => {
//     searchShow(query).then((options) => callback(options));
//   }, 1000)
// )
