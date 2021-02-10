import React from 'react';
import useFetch from '../../hooks/useFetch';
import Movie from '../../components/Movie';
import Button from '../../components/Button';
import Hero from '../../components/Hero';
import Loader from '../../components/Loader';
import { connect } from 'react-redux';
import './index.scss';

function Home({
  isLoading,
  error,
  movies,
  onSuccess,
  onFailure,
  onStart,
  favorites,
  toggleFavorites,
}) {
  useFetch({
    url: 'https://academy-video-api.herokuapp.com/content/free-items',
    onSuccess,
    onFailure,
    onStart,
  });

  return isLoading ? (
    <Loader />
  ) : (
    <>
      <Hero />
      <section className="movies">
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
                  toggleFavorites={toggleFavorites}
                  favorites={favorites}
                />
              </div>
            );
          })}
        </div>
        {error && <p>{error}</p>}
        <Button onClick={() => alert('getting more content')}>
          Get More Content
        </Button>
      </section>
    </>
  );
}

const mapStateToProps = ({ content }) => {
  return {
    favorites: content.favorites,
    movies: content.movies.data,
    isLoading: content.movies.isLoading,
    error: content.movies.error,
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

export default connect(mapStateToProps, mapDispatchToProps)(Home);
