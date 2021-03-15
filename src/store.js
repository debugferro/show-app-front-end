import { configureStore, combineReducers } from '@reduxjs/toolkit';
import userSlice from './slices/user_slice';
import signUpSlice from './slices/signup_slice';
// import cocktailsSLice from './slices/cocktails_slice';
// import ingredientsSlice from './slices/ingredients_slice';
// import newCocktailFormSlice from './slices/new_cocktail_form_slice';

const reducer = combineReducers({
  user: userSlice,
  signup: signUpSlice
});

const store = configureStore({
  reducer,
});

export default store;
