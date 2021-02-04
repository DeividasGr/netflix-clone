import React from 'react';
import Button from '../Button';
import './index.scss';

function Hero() {
  return (
    <>
      <section className="hero">
        <div className="hero__container">
          <h1 className="hero__text"> Wanna more Content ?</h1>
          <Button onClick={() => alert('another click')}>Get Access</Button>
        </div>
      </section>
    </>
  );
}

export default Hero;
