import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'redux-bundler-react';

import 'typeface-lato';
import './styles';
import App from './App';
import getStore from './bundles';
import cache from './utils/cache';

const render = ({ store }) => {
  let app = <App />;
  ReactDOM.render(
    <Provider store={store}>{app}</Provider>,
    document.getElementById('app'),
  );
};

// this is entirely optional, but here we here we try to pull starting data
// from our local cache. We're using a util called money-clip here that
// will only return if the version number is a match and it's not
// older than the specified maxAge.
cache.getAll().then(initialData => {
  if (initialData) {
    console.log('starting with locally cache data:', initialData);
  }
  render({ store: getStore(initialData) });
});
