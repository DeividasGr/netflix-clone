import * as types from './actionTypes';

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
    case types.GET_MOVIES:
      return { ...state, movies: { ...INITIAL_STATE.movies, isLoading: true } };
    case types.GET_MOVIES_SUCCESS:
      return {
        ...state,
        movies: { ...INITIAL_STATE.movies, data: action.payload },
      };
    case types.GET_MOVIES_FAILURE:
      return {
        ...state,
        movies: { ...INITIAL_STATE.movies, error: action.payload },
      };
    case types.GET_SINGLE_MOVIE:
      return {
        ...state,
        movies: { ...state.movies, isLoading: true, error: null },
      };
    case types.GET_SINGLE_MOVIE_SUCCESS:
      console.log('single movie success ', action);
      return {
        ...state,
        movies: {
          ...state.movies,
          isLoading: false,
          //state.movies.data check for movie id
          data: state.movies.data.concat(action.payload),
        },
      };
    case types.GET_SINGLE_MOVIE_FAILURE:
      return {
        ...state,
        movies: {
          ...INITIAL_STATE.movies,
          isLoading: false,
          error: action.payload,
        },
      };
    case types.TOGGLE_FAVORITE:
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
