import React from 'react';
import {
  FaCcVisa,
  FaCcMastercard,
  FaCcAmex,
  FaCcDiscover,
} from 'react-icons/fa';
import './index.scss';

function Footer() {
  const date = new Date();
  const year = date.getFullYear();

  return (
    <footer className="footer">
      <p className="footer__text">
        We care about your entertainment. Copyright &copy; {year} felix.com
      </p>
      <div className="footer__icons__container">
        <FaCcVisa className="footer__icon" />
        <FaCcMastercard className="footer__icon" />
        <FaCcAmex className="footer__icon" />
        <FaCcDiscover className="footer__icon" />
      </div>
    </footer>
  );
}

export default Footer;
