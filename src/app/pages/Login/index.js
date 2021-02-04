import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Button from '../../components/Button';
import { FaEye } from 'react-icons/fa';
import './index.scss';

function Login() {
  const history = useHistory();
  const [field, setField] = useState(false);
  const [password, setPassword] = useState('');
  const [username, setusername] = useState('');
  const [formError, setFormError] = useState(null);
  const [apiError, setApiError] = useState(null);

  const type = field ? 'text' : 'password';

  const onLoginSubmit = async (e) => {
    e.preventDefault();

    if (username === '' || password === '') {
      setFormError('Fields are required');
      return;
    }

    try {
      const config = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      };
      const response = await fetch(
        'https://academy-video-api.herokuapp.com/auth/login',
        config
      );
      const data = await response.json();
      localStorage.setItem('token', data.token);
      if (response.ok) {
        history.replace('/usercontent');
      } else {
        const error = 'Failure: please check the login details';
        throw new Error(error);
      }
    } catch (error) {
      setApiError(error.message);
    }
  };

  return (
    <section className="login">
      <form className="login__form" onSubmit={onLoginSubmit}>
        <label htmlFor="username" className="login__label">
          Username
        </label>
        <input
          id="username"
          value={username}
          className="login__input"
          type="text"
          onChange={(e) => {
            setusername(e.target.value);
          }}
        />
        <label htmlFor="password" className="login__label">
          Password
        </label>
        <div className="login__input__container">
          <input
            id="password"
            value={password}
            className="login__input "
            type={type}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <FaEye className="login__logo" onClick={() => setField(!field)} />
        </div>
        {formError && <div>Fields cannot be empty</div>}
        {apiError && <div>{apiError}</div>}
        <Button marginTop>Sign In</Button>
      </form>
    </section>
  );
}

export default Login;
