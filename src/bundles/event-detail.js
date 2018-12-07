import { createSelector, createAsyncResourceBundle } from 'redux-bundler';

const bundle = createAsyncResourceBundle({
  name: 'eventDetail',
  getPromise: ({ coreClient, store }) => {
    return coreClient.fetchEvent(store.selectRouteParams().code);
  },
  actionBaseType: 'EVENT_DETAIL',
  persist: false,
});

bundle.reactShouldFetchEventDetail = createSelector(
  'selectEventDetailShouldUpdate',
  'selectRouteParams',
  'selectRoute',
  (shouldUpdate, routeParams, route) => {
    if (shouldUpdate && routeParams.code && route.name === 'Event') {
      return { actionCreator: 'doFetchEventDetail' };
    }
  },
);

bundle.selectEventDetailQuestions = createSelector(
  'selectEventDetail',
  eventDetail => {
    return eventDetail?.questions?.filter(q => q.status !== 'pending') || [];
  },
);

bundle.doCreateQuestion = description => ({ dispatch, store, coreClient }) => {
  const eventDetail = store.selectEventDetail();
  return coreClient.createQuestion(eventDetail.id, description).then(resp => {
    store.doMarkEventDetailAsOutdated();
    return resp;
  });
};

bundle.doVoteQuestion = id => ({ dispatch, store, coreClient }) => {
  const eventDetail = store.selectEventDetail();
  if (!eventDetail) return null;
  return coreClient.voteQuestion(eventDetail.id, id).then(resp => {
    store.doMarkEventDetailAsOutdated();
    return resp;
  });
};
bundle.doUnvoteQuestion = id => ({ dispatch, store, coreClient }) => {
  const eventDetail = store.selectEventDetail();
  if (!eventDetail) return null;
  return coreClient.unvoteQuestion(eventDetail.id, id).then(resp => {
    store.doMarkEventDetailAsOutdated();
    return resp;
  });
};

export default bundle;
