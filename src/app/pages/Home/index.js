import React from 'react';
import { useDispatch } from 'react-redux';
import useFetch from '../../hooks/useFetch';
import Movie from '../../components/Movie';
import Button from '../../components/Button';
import Hero from '../../components/Hero';
import Loader from '../../components/Loader';
import content from '../../../content';
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
  const dispatch = useDispatch();

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
                  toggleFavorites={() =>
                    dispatch(content.actions.toggleFavorites(id))
                  }
                  isFavorite={favorites.includes(id)}
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

// const enhance = connect(
//   (state) => ({
//     movies: content.selectors.getMovies(state),
//     favorites: content.selectors.getFavorites(state),
//     loading: content.selectors.isLoading(state),
//     token: state.auth.token,
//   }),
//   (dispatch) =>
//     bindActionCreators(
//       {
//         onStart: content.actions.getMovies,
//         onSuccess: content.actions.getMoviesSuccess,
//         onFailure: content.actions.getMoviesFailure,
//         toggleFavorites: content.actions.toggleFavorites,
//       },
//       dispatch
//     )
// );

export default Home;
