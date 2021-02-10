import { createStore, combineReducers } from 'redux';
import content from '../../content/reducer';
import auth from '../../auth/reducer';

const reducers = combineReducers({
  content,
  auth,
});

const store = createStore(reducers);

export default store;
