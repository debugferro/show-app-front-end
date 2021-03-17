import dayjs from 'dayjs';
import * as yup from 'yup';
import { formErrorMessages as errorMessage } from '../../../shared/form_error_messages';

// SCHEDULER_FORM REQUESTS:
export { default as searchShows } from '../../../requests/search_shows.js';
export { default as postScheduledShow } from '../../../requests/scheduled_show_post';

// SIGNUP_FORM REQUESTS:
export { default as requestSignUp } from '../../../requests/signup';
export { default as authenticate } from '../../../actions/authenticate';

export { showToastError, showToastSuccess } from '../shared/show_toast_alert';
export { default as styles } from '../../../styles/components/form.module.css';

// SHARED FUNCTIONS & SCHEMAS -----------------------------------------------

export const createOptions = (ids, shows) => {
  return ids.map((id) => {
    return { value: shows[id].id, label: shows[id].title }
  })
}

export const minDate = dayjs().toDate();
export const maxDate = dayjs().add(1, 'year').toDate();
export const scheduleValidationSchema = yup.object().shape({
  date: yup.date().min(minDate, errorMessage.minDate)
    .max(maxDate, errorMessage.maxDate)
    .required(errorMessage.required),
  show: yup.object({ value: yup.number(), label: yup.string() })
    .required(errorMessage.required)
});

export const signupValidationSchema = yup.object().shape({
  email: yup.string()
    .email(errorMessage.emailInvalid)
    .required(errorMessage.emailReq),
  first_name: yup.string().min(3).max(20).required(errorMessage.firstNameReq),
  last_name: yup.string().min(3).max(20).required(errorMessage.lastNameReq),
  username: yup.string().min(3).max(20).required(errorMessage.usernameReq),
  password: yup.string().required(errorMessage.passwordReq).min(8).max(20),
  password_confirmation: yup.string().required(errorMessage.passwordConfReq)
    .oneOf([yup.ref('password'), null], errorMessage.passwordMatch),
});

export const loginValidationSchema = yup.object().shape({
  email: yup.string().required(errorMessage.emailReq),
  password: yup.string().required(errorMessage.passwordReq),
});
