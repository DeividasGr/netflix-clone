import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../Button';
import './index.scss';

function Movie({ image, title, desc, isFavorite, toggleFavorites, id }) {
  const [showMore, setShowMore] = useState(false);

  return (
    <>
      <div className="image__container">
        <Link to={`/singlemovie/${id}`}>
          <img className="movie__img" src={image} alt={title} />
        </Link>
      </div>
      <div className="movie__content">
        <Link to={`/singlemovie/${id}`}>
          <h3 className="movie__title">{title}</h3>
        </Link>
        <p className="movie__desc">
          {showMore ? desc : `${desc.substring(0, 100)}...`}
          <button className="read-btn" onClick={() => setShowMore(!showMore)}>
            {showMore ? 'show less' : 'read more'}
          </button>
        </p>
        <Button
          onClick={() => toggleFavorites(id)}
          isFavorite={isFavorite}
          marginBottom
        >
          {isFavorite ? 'Remove' : 'Favorite'}
        </Button>
      </div>
    </>
  );
}

export default Movie;
