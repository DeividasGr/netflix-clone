import React from 'react';
import useFetch from '../../hooks/useFetch';
import Movie from '../../components/Movie';
import Button from '../../components/Button';
import Hero from '../../components/Hero';
import Loader from '../../components/Loader';
import './index.scss';

function Home({ favorites, toggleFavorites }) {
  const { isLoading, error, payload: movies = [] } = useFetch(
    'https://academy-video-api.herokuapp.com/content/free-items'
  );

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

export default Home;
