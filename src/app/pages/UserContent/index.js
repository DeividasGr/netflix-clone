import React, { useRef } from 'react';
import { connect } from 'react-redux';
import useFetch from '../../hooks/useFetch';
import Movie from '../../components/Movie';
import Loader from '../../components/Loader';
import './index.scss';

function UserContent({
  isLoading,
  error,
  movies,
  token,
  onSuccess,
  onFailure,
  onStart,
  favorites,
  toggleFavorites,
}) {
  const fetchOptions = useRef({
    headers: { authorization: token },
  });

  useFetch({
    url: 'https://academy-video-api.herokuapp.com/content/items',
    fetchOptions: fetchOptions.current,
    onSuccess,
    onFailure,
    onStart,
  });

  console.log(movies);

  return isLoading ? (
    <Loader />
  ) : (
    <section className="user-content">
      <div className="movies__list">
        {movies.map((movie) => {
          const { image, title, description, id } = movie;
          return (
            <div key={id} className="movie">
              <Movie
                id={id}
                image={image}
                title={title}
                desc={description}
                favorites={favorites}
                toggleFavorites={toggleFavorites}
              />
            </div>
          );
        })}
      </div>
      {error && <p>{error}</p>}
    </section>
  );
}

const mapStateToProps = ({ content, auth }) => {
  return {
    favorites: content.favorites,
    movies: content.movies.data,
    loading: content.movies.isLoading,
    error: content.movies.error,
    token: auth.token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onStart: () => {
      dispatch({ type: 'GET_MOVIES' });
    },
    onSuccess: (json) => {
      dispatch({ type: 'GET_MOVIES_SUCCESS', payload: json });
    },
    onFailure: (error) => {
      dispatch({ type: 'GET_MOVIES_FAIL', payload: error });
    },
    toggleFavorites: (id) => {
      dispatch({ type: 'TOGGLE_FAVORITE', payload: id });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserContent);
