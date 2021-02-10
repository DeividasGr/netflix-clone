import React, { useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import Button from '../../components/Button';
import Modal from '../../components/Modal';
import Loader from '../../components/Loader';
import { connect } from 'react-redux';
import './index.scss';

function SingleMovieContent({
  isLoading,
  error,
  movie,
  token,
  onSuccess,
  onFailure,
  onStart,
  favorites,
  toggleFavorites,
}) {
  const { movieId } = useParams();
  const url = `https://academy-video-api.herokuapp.com/content/items/${movieId}`;
  const fetchOptions = useRef({
    headers: { authorization: token },
  });

  useFetch({
    url: url,
    fetchOptions: fetchOptions.current,
    onSuccess,
    onFailure,
    onStart,
  });

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

const mapStateToProps = ({ content, auth }) => {
  return {
    movie: content.movies.data,
    isLoading: content.movies.isLoading,
    error: content.movies.error,
    favorites: content.favorites,
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

export default connect(mapStateToProps, mapDispatchToProps)(SingleMovieContent);
