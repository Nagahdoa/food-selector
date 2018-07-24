import thunk from 'redux-thunk';
import modules from './modules';
import { applyMiddleware, createStore, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';

const middleware = applyMiddleware(thunk);
const composeEnhancers = composeWithDevTools({});

const combinedReducers = combineReducers({
    foods: modules.foods.reducers.reducer,
});

export default (initialState = {}) => createStore(combinedReducers, initialState, composeEnhancers(middleware));
