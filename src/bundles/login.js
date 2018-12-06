import { createAsyncActions } from './utils/asyncActions';

const initialState = { success: false, error: '', countLoginFailed: 0 };
const actions = createAsyncActions('USER_LOGIN');

export default {
  name: 'login',
  getReducer: () => {
    return (state = initialState, { type, payload }) => {
      if (type === actions.STARTED) {
        return Object.assign({}, state, payload);
      }
      if (type === actions.FINISHED) {
        return Object.assign({}, state, {
          success: true,
          error: '',
          countLoginFailed: 0,
        });
      }
      if (type === actions.FAILED) {
        return Object.assign({}, state, {
          success: false,
          error: payload,
          countLoginFailed: state.countLoginFailed + 1,
        });
      }
      return state;
    };
  },
  selectLoginStatus: state => state.login,
  selectLoginError: state => state.login.error,
  doMarkLoginSuccess: () => ({ type: actions.FINISHED }),
  doClearLoginError: () => ({ dispatch, store }) => {
    if (store.selectLoginError()) {
      dispatch({ type: actions.FAILED, payload: '' });
    }
  },
  doSetLoginError: err => ({ dispatch, store }) => {
    dispatch({ type: actions.FAILED, payload: err });
  },
  doLogin: ({ provider, accessToken }) => ({ dispatch, store, coreClient }) => {
    return coreClient
      .login({ provider, access_token: accessToken })
      .then(data => {
        dispatch({ type: actions.FINISHED });
        console.log(data);
        const userData = {
          accessToken: data.jwt,
          ...data.user,
        };
        store.doUpdateUser(userData);
      })
      .catch(_err => {
        alert('Something went wrong');
        store.doSetLoginError('Something went wrong');
      });
  },
};
