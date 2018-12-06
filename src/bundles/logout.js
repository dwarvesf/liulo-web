import { createAsyncActions } from './utils/asyncActions';
import cache from '@/utils/cache';

const initialState = { success: false, error: '' };
const actions = createAsyncActions('USER_LOGIN');

export default {
  name: 'logout',
  getReducer: () => {
    return (state = initialState, { type, payload }) => {
      if (type === actions.STARTED) {
        return Object.assign({}, state, payload);
      }
      if (type === actions.FINISHED) {
        return Object.assign({}, state, { success: true, error: '' });
      }
      if (type === actions.FAILED) {
        return Object.assign({}, state, {
          success: false,
          error: payload,
        });
      }
      return state;
    };
  },
  doLogout: () => async ({ dispatch, store, coreClient }) => {
    try {
      const resp = await coreClient.logout();
      dispatch({ type: actions.FINISHED });
      return resp;
    } catch (err) {
      dispatch({
        type: actions.FAILED,
        payload: err?.response?.data?.error || 'Something went wrong',
      });
    } finally {
      await cache.clear();
      location.reload();
    }
  },
};
