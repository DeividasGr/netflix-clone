import React from 'react';
import { Link, Switch, Route } from 'react-router-dom';
import Button from '../Button';
import mainLogo from '../../../assets/icon.png';
import './index.scss';

function Header() {
  return (
    <header>
      <nav className="nav">
        <Link to="/">
          <img className="nav__logo" src={mainLogo} alt="bussiness logo" />
        </Link>
        <Switch>
          <Route exact path="/login">
            {null}
          </Route>
          <Route exact path="/">
            <Button to="/login">Sign In</Button>
          </Route>
          <Route path="*">
            <Button to="/" onClick={() => localStorage.removeItem('token')}>
              Logout
            </Button>
          </Route>
        </Switch>
      </nav>
    </header>
  );
}

export default Header;
