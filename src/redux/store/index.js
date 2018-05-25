import { createStore, combineReducers } from 'redux';

import generalReducer from '../reducers/general';

const reducer = combineReducers({
  generalReducer,
});

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

export default store;
