import * as types from './actionTypes';
import * as actions from './actions';
import * as selectors from './selectors';
import * as constants from './constants';
import reducer from './reducer';

const contentModule = { reducer, types, constants, selectors, actions };

export default contentModule;
