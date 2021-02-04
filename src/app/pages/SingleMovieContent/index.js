import React, { useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import Button from '../../components/Button';
import Modal from '../../components/Modal';
import Loader from '../../components/Loader';
import './index.scss';

function SingleMovieContent({ favorites, toggleFavorites }) {
  const { movieId } = useParams();
  const fetchOptions = useRef({
    headers: { authorization: localStorage.getItem('token') },
  });
  const { isLoading, error, payload: movie = [] } = useFetch(
    `https://academy-video-api.herokuapp.com/content/items/${movieId}`,
    fetchOptions.current
  );
  const [show, setShow] = useState(false);

  const showModal = () => {
    setShow(true);
  };

  return isLoading ? (
    <Loader />
  ) : (
    <section className="movies">
      <Modal
        movie={movie}
        show={show}
        close={() => {
          setShow(false);
        }}
      />
      <div className="single-movie__container">
        <div className="single-movie__img-container">
          <img
            className="single-movie__img"
            src={movie.image}
            alt={movie.title}
          />
        </div>
        <div className="single-movie__content-container">
          <h3 className="single-movie__title">{movie.title}</h3>
          <p className="single-movie__content">{movie.description}</p>
          <div>
            <Button onClick={() => showModal()}>Watch</Button>
            <Button
              onClick={() => toggleFavorites(movie.id)}
              isFavorite={favorites.includes(movie.id) ? true : false}
              marginBottom
            >
              {favorites.includes(movie.id) ? 'Remove' : 'Favorite'}
            </Button>
          </div>
        </div>
      </div>
      {error && <p>{error}</p>}
    </section>
  );
}

export default SingleMovieContent;
