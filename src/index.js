import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import store from './store';
import {
  QueryClient,
  QueryClientProvider,
} from "react-query";

import './styles/global.css';

const queryClient = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <App />
    </Provider>
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);

