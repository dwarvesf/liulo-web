import {
  composeBundles,
  createUrlBundle,
  createCacheBundle,
} from 'redux-bundler';

import cache from '@/utils/cache';
import extraArgs from './extra-args';
import routes from './routes';
import user from './user';
import login from './login';
import logout from './logout';
import loginDialog from './login-dialog';
import eventDetail from './event-detail';
import myTopic from './my-topic';
import myEvent from './my-event';

export default composeBundles(
  createUrlBundle(),
  routes,
  createCacheBundle(cache.set),
  extraArgs,
  user,
  login,
  loginDialog,
  logout,
  eventDetail,
  myTopic,
  myEvent,
);
