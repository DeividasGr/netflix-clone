const INITIAL_STATE = {
  token: localStorage.getItem('token'),
};

function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      localStorage.setItem('token', action.payload);
      return { ...state, token: action.payload };
    case 'LOGOUT':
      localStorage.removeItem('token');
      return { ...state, token: null };
    default:
      return state;
  }
}

export default reducer;
