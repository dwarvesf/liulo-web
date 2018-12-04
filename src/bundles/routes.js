import { createRouteBundle } from 'redux-bundler';

import loadable from '@/utils/loadable';
const Home = loadable(() => import('@/pages/Home'));
const About = loadable(() => import('@/pages/About'));
const NotFound = loadable(() => import('@/pages/NotFound'));

export default createRouteBundle({
  '/': {
    name: 'Home',
    C: Home,
  },
  '/about': {
    name: 'About',
    C: About,
  },
  '*': {
    name: 'NotFound',
    C: NotFound,
  },
});
