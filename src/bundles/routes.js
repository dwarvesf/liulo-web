import { createRouteBundle } from 'redux-bundler';

import loadable from '@/utils/loadable';
const Home = loadable(() => import('@/pages/Home'));
const Event = loadable(() => import('@/pages/Event'));
const TopicManager = loadable(() => import('@/pages/TopicManager'));
const EventManager = loadable(() => import('@/pages/EventManager'));
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
  '/manage-topic/:code': {
    name: 'TopicManager',
    C: TopicManager,
  },
  '/manage-event/:code': {
    name: 'EventManager',
    C: EventManager,
  },
  '*': {
    name: 'NotFound',
    C: NotFound,
  },
});
