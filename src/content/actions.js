import * as types from './actionTypes';

export const getMovies = () => async (dispatch, getState) => {
  dispatch({ type: types.GET_MOVIES });
  try {
    if (getState().auth.token) {
      const response = await fetch(
        'https://academy-video-api.herokuapp.com/content/items',
        {
          headers: { authorization: getState().auth.token },
        }
      );
      const data = await response.json();

      if (!response.ok) {
        const error = 'Something went wrong!';
        throw new Error(
          JSON.stringify({ message: error, status: response.status })
        );
      }

      dispatch({ type: types.GET_MOVIES_SUCCESS, payload: data });
    } else {
      const response = await fetch(
        'https://academy-video-api.herokuapp.com/content/free-items'
      );
      const data = await response.json();

      if (!response.ok) {
        const error = 'Something went wrong!';
        throw new Error(
          JSON.stringify({ message: error, status: response.status })
        );
      }

      dispatch({ type: types.GET_MOVIES_SUCCESS, payload: data });
    }
  } catch (error) {
    const { status } = JSON.parse(error.message);
    if (status === 401) {
      localStorage.removeItem('token');
      // history.replace('/login');
    }
    dispatch({ type: types.GET_MOVIES_FAILURE, payload: error.message });
  }
};

export const getMoviesSuccess = (json) => ({
  type: types.GET_MOVIES_SUCCESS,
  payload: json,
});

export const getMoviesFailure = (error) => ({
  type: types.GET_MOVIES_FAILURE,
  payload: error,
});

export const getMovie = () => ({
  type: types.GET_SINGLE_MOVIE,
});

export const getMovieSuccess = (json) => ({
  type: types.GET_SINGLE_MOVIE_SUCCESS,
  payload: json,
});

export const getMovieFailure = (error) => ({
  type: types.GET_SINGLE_MOVIE_FAILURE,
  payload: error,
});

export const toggleFavorites = (id) => ({
  type: types.TOGGLE_FAVORITE,
  payload: id,
});
