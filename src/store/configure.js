import { createStore, compose, combineReducers } from 'redux';
import bingo from './bingo';

const reducers = combineReducers({ bingo: bingo });

// 개발 모드 일때만 적용
const isDev = process.env.NODE_ENV === 'development';
const devtools = isDev && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
const composeEnhancers = devtools || compose;

const configure = (preloadedState) => createStore(reducers, preloadedState, composeEnhancers());

export default configure;