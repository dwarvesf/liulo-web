import { client as coreClient } from '@/services/core';
export default {
  name: 'extra-args',
  getExtraArgs: store => {
    return { coreClient };
  },
  init: store => {
    coreClient.setToken(store.selectUserToken());
    coreClient.onRequestError(() => store.doUnsetUser());
    coreClient.onStatus401(() => store.doUnsetUser());
    // subscribes to token updates
    store.subscribeToSelectors(['selectUserToken'], ({ userToken }) => {
      coreClient.setToken(userToken);
    });
  },
};
