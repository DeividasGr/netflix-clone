import { NAME } from './constants';

export const getMovies = (state) => state[NAME].movies.data;

export const getFavorites = (state) => state[NAME].favorites;
export const isLoading = (state) => state[NAME].movies.isLoading;
export const getError = (state) => state[NAME].movies.error;

export const getFavoriteMovies = (state) => {
  const allMovies = state[NAME].movies.data;
  const favorites = state[NAME].favorites;

  const favoriteMovies = allMovies.filter(({ id }) => favorites.includes(id));

  return favoriteMovies;
};
