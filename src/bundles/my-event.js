import { createSelector, createAsyncResourceBundle } from 'redux-bundler';

const bundle = createAsyncResourceBundle({
  name: 'myEvent',
  getPromise: ({ coreClient, store }) => {
    return coreClient.fetchMyEvent(store.selectRouteParams().code);
  },
  actionBaseType: 'MY_EVENT',
  persist: false,
});

bundle.reactShouldFetchMyEvent = createSelector(
  'selectMyEventShouldUpdate',
  'selectIsLoggedIn',
  'selectRoute',
  'selectRouteParams',
  (shouldUpdate, isLoggedIn, route, routeParams) => {
    if (
      isLoggedIn &&
      shouldUpdate &&
      routeParams.code &&
      route.name === 'EventManager'
    ) {
      return { actionCreator: 'doFetchMyEvent' };
    }
  },
);

bundle.selectMyEventTopics = createSelector('selectMyEvent', myEvent => {
  return myEvent?.topics || [];
});

bundle.doActiveTopic = id => ({ dispatch, store, coreClient }) => {
  const myEvent = store.selectMyEvent();
  if (!myEvent) return null;
  return coreClient.activeTopic(id).then(resp => {
    store.doMarkMyEventAsOutdated();
    return resp;
  });
};

bundle.doDeactiveTopic = id => ({ dispatch, store, coreClient }) => {
  const myEvent = store.selectMyEvent();
  if (!myEvent) return null;
  return coreClient.deactiveTopic(id).then(resp => {
    store.doMarkMyEventAsOutdated();
    return resp;
  });
};

bundle.doCreateTopic = data => ({ dispatch, store, coreClient }) => {
  const myEvent = store.selectMyEvent();
  if (!myEvent) return null;
  return coreClient.createTopic(myEvent.id, data).then(resp => {
    store.doMarkMyEventAsOutdated();
    return resp;
  });
};

export default bundle;
