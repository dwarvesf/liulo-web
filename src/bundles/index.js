import {
  composeBundles,
  createUrlBundle,
  createCacheBundle,
} from 'redux-bundler';

import cache from '@/utils/cache';
import extraArgs from './extra-args';
import routes from './routes';

export default composeBundles(
  createUrlBundle(),
  routes,
  createCacheBundle(cache.set),
  extraArgs,
);
