import rootReducer from "./rootReducer";
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import expireIn from "redux-persist-transform-expire-in";
import sessionStorage from "redux-persist/es/storage/session";

const { compose, applyMiddleware, createStore } = require("redux");
const { default: thunk } = require("redux-thunk");

// const persistConfig = {
//   key: 'root',
//   storage,
//   transforms: [
//     expireReducer('preference', {
//       expireSeconds: 25
//     })
//   ],
// }

/**
 * Enable redux devtools for dev mode & debugging local environments
 **/
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

/**
 * Create Enhancers
 **/
const enhancer = composeEnhancers(applyMiddleware(thunk));

/**
 * Create Store
 **/
const persistedReducer = persistReducer({
  key: '_auth',
  storage: sessionStorage,
  whitelist: ['auth'],
  transforms: [expireIn(12*60*60*1000, "expires_in")],
}, rootReducer)

export const store = createStore(persistedReducer, enhancer);
export const persistor = persistStore(store)
