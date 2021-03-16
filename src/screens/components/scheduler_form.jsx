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
import '../../styles/components/select.css';

import searchShows from '../../requests/search_shows.js';
import postScheduledShow from '../../requests/scheduled_show_post';

toast.configure();

const minDate = dayjs().toDate();
const maxDate = dayjs().add(1, 'year').toDate();

const validationSchema = yup.object().shape({
  date: yup.date().min(minDate, "WHAT? You can't schedule on the past")
    .max(maxDate, "Max date is up to one year!")
});

export default function SingUpForm() {
  const { handleSubmit, errors, control } = useForm({ mode: 'onChange', resolver: yupResolver(validationSchema) });
  const animatedComponents = makeAnimated();
  const dispatch = useDispatch();

  const [options, setOptions] = useState([{ value: '', label: '' }]);
  const shows = useSelector((state) => state.shows.entities);
  const ids = useSelector((state) => state.shows.ids);

  const [date, setDate] = useState(minDate)

  const createOptions = (showIds) => {
    return showIds.map((id) => {
      return { value: shows[id].id, label: shows[id].title }
    })
  }

  useEffect(() => {
    setOptions(createOptions(ids))
  }, [shows])

  const onSubmit = async (data) => {
    dispatch(postScheduledShow(data));
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

  const displayOptions = (data) => {
    return data.payload.result.map((id) => {
      return { value: id, label: data.payload.entities.shows[id].title }
    });
  }

  const loadOptions = useCallback(
    debounce((query, callback) => {
      dispatch(searchShows(query))
        .then((data) => callback(displayOptions(data)));
    }, 1000)
  )

  return (
    <>
      <form className={styles.formContainer} onSubmit={handleSubmit(onSubmit)}>
        <Controller
          className={styles.select}
          classNamePrefix={"select"}
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
          minDate={minDate}
          maxDate={maxDate}
          onSelect={(date) => setDate(date)}
          selected={date}
          control={control}
          as={DatePicker}
        />
        <div className={`${styles.formWarning} ${errors.date ? styles.error : ''}`}>
          {errors.date && <span>{errors.date.message}</span>}
        </div>
        <input className={styles.formSubmit} type="submit" value="Schedule" />
      </form>
    </>
  );
}
