import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { persistStore } from 'redux-persist';
import DevTools from '../containers/DevTools';
import rootReducer from '../reducers';

const configureStore = initialState => {
  let store;

  const isServer = typeof window === 'undefined';

  if (isServer) {
    store = createStore(
      rootReducer,
      initialState,
      compose(applyMiddleware(thunk, logger), DevTools.instrument())
    );
  } else {
    const { persistReducer } = require('redux-persist');
    const storage = require('redux-persist/lib/storage').default;

    const persistConfig = {
      key: 'hse:dpro',
      storage,
      whitelist: [
        'subscriber',
        'honorifics',
        'currentPage',
        'presentationCategories',
        'registrationCategories',
      ],
    };

    store = createStore(
      persistReducer(persistConfig, rootReducer),
      initialState,
      compose(applyMiddleware(thunk, logger), DevTools.instrument())
    );

    store.__PERSISTOR = persistStore(store);
  }

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      store.replaceReducer(rootReducer);
    });
  }

  return store;
};

export default configureStore;
