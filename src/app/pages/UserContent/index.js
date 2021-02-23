import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import content from '../../../content';
import Movie from '../../components/Movie';
import Loader from '../../components/Loader';
import './index.scss';

function UserContent({ toggleFavorites }) {
  const dispatch = useDispatch();
  const movies = useSelector(content.selectors.getMovies);
  const favorites = useSelector(content.selectors.getFavorites);
  const isLoading = useSelector(content.selectors.isLoading);
  const error = useSelector(content.selectors.getError);
  // const token = useSelector((state) => state.auth.token);

  // const fetchOptions = useRef({
  //   headers: { authorization: token },
  // });

  useEffect(() => {
    dispatch(content.actions.getMovies());
  }, [dispatch]);

  // useFetch({
  //   url: 'https://academy-video-api.herokuapp.com/content/items',
  //   fetchOptions: fetchOptions.current,
  //   onSuccess: () => dispatch(content.actions.getMoviesSuccess()),
  //   onFailure: () => dispatch(content.actions.getMoviesFailure()),
  //   onStart: () => dispatch(content.actions.getMovies()),
  // });

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
                isFavorite={favorites.includes(id)}
                toggleFavorites={() =>
                  dispatch(content.actions.toggleFavorites(id))
                }
              />
            </div>
          );
        })}
      </div>
      {error && <p>{error}</p>}
    </section>
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

export default UserContent;
