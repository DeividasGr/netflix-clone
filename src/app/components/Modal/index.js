import React from 'react';
import './index.scss';

function Modal({ movie, show, close }) {
  if (!show) {
    return null;
  }

  return (
    <div onClick={() => close()} className="modal">
      <iframe
        className="iframe"
        title="movieFrame"
        src={movie.video}
        frameBorder="0"
        allowFullScreen
      />
    </div>
  );
}

export default Modal;
