import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import content from '../../content';
import auth from '../../auth/reducer';

const composeEnhancers =
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
  process.env.NODE_ENV === 'development'
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : compose;

const allReducers = combineReducers({
  [content.constants.NAME]: content.reducer,
  auth,
});

const store = createStore(
  allReducers,
  composeEnhancers(applyMiddleware(thunk))
);

export default store;
