import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Movie from '../../components/Movie';
import Button from '../../components/Button';
import Hero from '../../components/Hero';
import Loader from '../../components/Loader';
import content from '../../../content';
import './index.scss';

function Home() {
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

export default Home;
