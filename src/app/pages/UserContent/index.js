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

  useEffect(() => {
    dispatch(content.actions.getMovies());
  }, [dispatch]);

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

export default UserContent;
