import dayjs from 'dayjs';
import * as yup from 'yup';
import { formErrorMessages as errorMessage } from '../../../form_error_messages';

export { default as searchShows } from '../../../requests/search_shows.js';
export { default as postScheduledShow } from '../../../requests/scheduled_show_post';
export { showToastError } from '../shared/show_toast_error';
export { default as styles } from '../../../styles/components/form.module.css';
export const minDate = dayjs().toDate();
export const maxDate = dayjs().add(1, 'year').toDate();

export const validationSchema = yup.object().shape({
  date: yup.date().min(minDate, errorMessage.minDate)
    .max(maxDate, errorMessage.maxDate)
    .required(errorMessage.required),
  show: yup.object({ value: yup.number(), label: yup.string() })
    .required(errorMessage.required)
});

export const createOptions = (showIds) => {
  return showIds.map((id) => {
    return { value: shows[id].id, label: shows[id].title }
  })
}
