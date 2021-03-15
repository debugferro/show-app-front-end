let config;
if (process.env.NODE_ENV === 'production') {
  config = {
    url: '',
  };
} else {
  config = {
    url: process.env.REACT_APP_API_DEV,
  };
}

export default config;
