import { Route, Redirect, useLocation } from 'react-router-dom';

function PublicRoute(props) {
  const location = useLocation();
  const isLogedIn = !!localStorage.getItem('token');

  if (!isLogedIn) {
    return <Route {...props} />;
  }

  return (
    <Redirect
      to={{ pathname: '/usercontent', state: { initialRoute: location } }}
    />
  );
}

export default PublicRoute;
