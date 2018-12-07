import { createSelector, createAsyncResourceBundle } from 'redux-bundler';

const bundle = createAsyncResourceBundle({
  name: 'myTopic',
  getPromise: ({ coreClient, store }) => {
    return coreClient.fetchMyTopic(store.selectRouteParams().code);
  },
  actionBaseType: 'MY_TOPIC',
  persist: false,
});

bundle.reactShouldFetchMyTopic = createSelector(
  'selectMyTopicShouldUpdate',
  'selectIsLoggedIn',
  'selectRoute',
  'selectRouteParams',
  (shouldUpdate, isLoggedIn, route, routeParams) => {
    if (
      isLoggedIn &&
      shouldUpdate &&
      routeParams.code &&
      route.name === 'TopicManager'
    ) {
      return { actionCreator: 'doFetchMyTopic' };
    }
  },
);

bundle.selectMyTopicQuestions = createSelector('selectMyTopic', myTopic => {
  return myTopic?.questions || [];
});

bundle.doRemoveQuestion = id => ({ dispatch, store, coreClient }) => {
  const myTopic = store.selectMyTopic();
  if (!myTopic) return null;
  return coreClient.removeQuestion(myTopic.id, id).then(resp => {
    store.doMarkMyTopicAsOutdated();
    return resp;
  });
};

bundle.doMarkAnsweredQuestion = id => ({ dispatch, store, coreClient }) => {
  const myTopic = store.selectMyTopic();
  if (!myTopic) return null;
  return coreClient.markAnsweredQuestion(myTopic.id, id).then(resp => {
    store.doMarkMyTopicAsOutdated();
    return resp;
  });
};

bundle.doUnmarkAnsweredQuestion = id => ({ dispatch, store, coreClient }) => {
  const myTopic = store.selectMyTopic();
  if (!myTopic) return null;
  return coreClient.unmarkAnsweredQuestion(myTopic.id, id).then(resp => {
    store.doMarkMyTopicAsOutdated();
    return resp;
  });
};

export default bundle;
