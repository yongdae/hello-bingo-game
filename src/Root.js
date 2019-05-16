import React from 'react';
import App from './components/App';
import { Provider } from 'react-redux';
import configure from './store/configure';

const store = configure();

const Root = () => {
  return (
      <Provider store={store}>
          <App/>
      </Provider>
  );
};

export default Root;