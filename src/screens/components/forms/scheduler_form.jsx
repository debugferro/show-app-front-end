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
import { scheduleValidationSchema, createOptions, searchShows, postScheduledShow, showToastError, showToastSuccess, minDate, maxDate, styles } from './index';

export default function SingUpForm() {
  const { handleSubmit, errors, control } = useForm({ mode: 'onChange',
    resolver: yupResolver(scheduleValidationSchema)
  });
  const apiError = useSelector((state) => state.scheduled_shows.errors);
  const shows = useSelector((state) => state.shows.entities);
  const ids = useSelector((state) => state.shows.ids);

  const [options, setOptions] = useState([{ value: '', label: '' }]);
  const [date, setDate] = useState(minDate)
  const animatedComponents = makeAnimated();
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    setOptions(createOptions(ids, shows))
  }, [shows])

  useEffect(() => {
    if (Array.isArray(apiError)) {
      apiError.forEach((error) => {
        showToastError(error)
      })
    } else {
      showToastError(apiError)
    }
  }, [apiError]);

  const onSubmit = async (data) => {
    const response = await dispatch(postScheduledShow(data));
    if (response?.meta?.requestStatus === 'fulfilled') {
      showToastSuccess("Scheduling successful!")
      history.push('/');
    }
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
          name={'show'}
          control={control}
          defaultValue={options}
          render={({ ref, onBlur, onChange }) => (
            <AsyncSelect
              cacheOptions
              inputRef={ref}
              onBlur={onBlur}
              onChange={onChange}
              className={styles.select}
              classNamePrefix={"select"}
              defaultOptions={options}
              loadOptions={loadOptions}
              closeMenuOnSelect={true}
              components={animatedComponents}
            />
          )}
        />
        <div className={`${styles.formWarning} ${errors.show ? styles.error : ''}`}>
          {
            errors.show && <span>{errors.show.message}</span>
          }
        </div>
        <Controller
          name={'date'}
          control={control}
          defaultValue={minDate}
          render={({ ref, onBlur  }) => (
            <DatePicker
              showTimeInput
              inputRef={ref}
              onBlur={onBlur}
              className={styles.dateInput}
              timeInputLabel={"Time:"}
              minDate={minDate}
              maxDate={maxDate}
              onSelect={(date) => setDate(date)}
              selected={date}
            />
          )}
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
