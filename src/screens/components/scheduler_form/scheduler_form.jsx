import React, { useEffect, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import debounce from "lodash/debounce";
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import AsyncSelect from 'react-select/async';
import makeAnimated from 'react-select/animated';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import '../../../styles/components/select.css';
import { validationSchema, createOptions, searchShows, postScheduledShow, showToastError, minDate, maxDate, styles } from './index';

export default function SingUpForm() {
  const { handleSubmit, errors, control } = useForm({ mode: 'onChange',
    resolver: yupResolver(validationSchema)
  });
  const apiErrors = useSelector((state) => state.scheduled_shows.errors);
  const shows = useSelector((state) => state.shows.entities);
  const ids = useSelector((state) => state.shows.ids);

  const [options, setOptions] = useState([{ value: '', label: '' }]);
  const [date, setDate] = useState(minDate)
  const animatedComponents = makeAnimated();
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    setOptions(createOptions(ids))
  }, [shows])

  useEffect(() => {
    if (apiErrors && Array.isArray(apiErrors)) {
      apiErrors.forEach((error) => {
        showToastError(error)
      })
    } else {
      showToastError(apiErrors)
    }
  }, [apiErrors]);

  const onSubmit = async (data) => {
    const response = await dispatch(postScheduledShow(data));
    if (response?.meta?.requestStatus === 'fulfilled') history.push('/');
  };

  const loadOptions = useCallback(
    debounce((query, callback) => {
      console.log(query)
      dispatch(searchShows(query))
        .then(({ payload }) => callback(payload.result
          .map(id => ({ value: id, label: payload.entities.shows[id].title })
          )));
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
          {
            errors.date && <span>{errors.date.message}</span>
          }
        </div>
        <input className={styles.formSubmit} type="submit" value="Schedule" />
      </form>
    </>
  );
}
