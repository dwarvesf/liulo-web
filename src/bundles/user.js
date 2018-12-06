const initialState = { accessToken: undefined, user: undefined, role: '' };

export default {
  name: 'user',
  persistActions: ['USER_UPDATE', 'USER_UNSET'],
  getReducer: () => {
    return (state = initialState, { type, payload }) => {
      if (type === 'USER_UPDATE') {
        return Object.assign({}, state, { ...payload });
      }
      if (type === 'USER_UNSET') {
        return { ...initialState };
      }
      return state;
    };
  },
  selectUser: state => state.user,
  selectUserToken: state => state.user.accessToken,
  selectIsLoggedIn: state => !!state.user.accessToken,
  doUpdateUser: user => ({ type: 'USER_UPDATE', payload: user }),
  doUnsetUser: () => ({ type: 'USER_UNSET' }),
};
