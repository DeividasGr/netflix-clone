const INITIAL_STATE = {
  movies: {
    data: [],
    isLoading: false,
    error: null,
  },
  favorites: [],
};

function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'GET_MOVIES':
      return { ...state, movies: { ...INITIAL_STATE.movies, isLoading: true } };
    case 'GET_MOVIES_SUCCESS':
      return {
        ...state,
        movies: { ...INITIAL_STATE.movies, data: action.payload },
      };
    case 'GET_MOVIES_FAIL':
      return {
        ...state,
        movies: { ...INITIAL_STATE.movies, error: action.payload },
      };
    case 'TOGGLE_FAVORITE':
      const toggleFavorites = (id) => {
        if (state.favorites.includes(id)) {
          return state.favorites.filter((favorite) => favorite !== id);
        } else {
          return state.favorites.concat(id);
        }
      };
      return { ...state, favorites: toggleFavorites(action.payload) };
    default:
      return state;
  }
}

export default reducer;