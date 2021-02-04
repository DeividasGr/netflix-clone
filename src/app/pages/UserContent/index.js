import React, { useRef } from 'react';
import useFetch from '../../hooks/useFetch';
import Movie from '../../components/Movie';
import Loader from '../../components/Loader';
import './index.scss';

function UserContent({ favorites, toggleFavorites }) {
  const fetchOptions = useRef({
    headers: { authorization: localStorage.getItem('token') },
  });
  const { isLoading, error, payload: movies = [] } = useFetch(
    'https://academy-video-api.herokuapp.com/content/items',
    fetchOptions.current
  );

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

export default UserContent;
