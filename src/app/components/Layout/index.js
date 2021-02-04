import React from 'react';
import Header from '../Header';
import Footer from '../Footer';
import './index.scss';

function Layout({ children, loginState }) {
  return (
    <>
      <Header loginState={loginState} />
      <main>{children}</main>
      <Footer />
    </>
  );
}

export default Layout;
