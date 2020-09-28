import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { persistStore } from 'redux-persist';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from '../reducers';

const configureStore = initialState => {
    let store;

    const isServer = typeof window === 'undefined';

    if (isServer) {
        store = createStore(
            rootReducer,
            initialState,
            composeWithDevTools(applyMiddleware(thunk))
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
            composeWithDevTools(applyMiddleware(thunk))
        );

        store.__PERSISTOR = persistStore(store);
    }

    return store;
};

export default configureStore;
