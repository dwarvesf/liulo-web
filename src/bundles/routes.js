import { createRouteBundle } from 'redux-bundler';

import loadable from '@/utils/loadable';
const Home = loadable(() => import('@/pages/Home'));
const Event = loadable(() => import('@/pages/Event'));
const NotFound = loadable(() => import('@/pages/NotFound'));

export default createRouteBundle({
  '/': {
    name: 'Home',
    C: Home,
  },
  '/event/:code': {
    name: 'Event',
    C: Event,
  },
  '*': {
    name: 'NotFound',
    C: NotFound,
  },
});
