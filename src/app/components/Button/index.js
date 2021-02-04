import React from 'react';
import { Link } from 'react-router-dom';
import './index.scss';

function Button({
  children,
  onClick,
  isFavorite,
  marginBottom,
  marginTop,
  to,
}) {
  const favorite = isFavorite ? 'btn--dark' : '';
  const mb = marginBottom ? 'mb-sm' : '';
  const mt = marginTop ? 'mt-sm' : '';
  const Component = to ? Link : 'button';
  return (
    <Component
      onClick={onClick}
      className={`btn ${favorite} ${mt} ${mb}`}
      to={to}
    >
      {children}
    </Component>
  );
}

export default Button;
