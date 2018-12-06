import { createAsyncActions } from './utils/asyncActions';
const initialState = { isShow: false };
const actions = createAsyncActions('LOGIN_DIALOG');

export default {
  name: 'loginDialog',
  getReducer: () => {
    return (state = initialState, { type, payload }) => {
      if (type === actions.STARTED) {
        return Object.assign({}, state, {
          isShow: true,
        });
      }
      if (type === actions.FINISHED) {
        return Object.assign({}, state, {
          isShow: false,
        });
      }
      return state;
    };
  },
  selectLoginDialogStatus: ({ loginDialog }) => {
    return loginDialog.isShow;
  },
  doOpenLoginDialog: () => ({ dispatch }) => {
    dispatch({ type: actions.STARTED });
  },
  doCloseLoginDialog: () => ({ dispatch }) => {
    dispatch({ type: actions.FINISHED });
  },
};
