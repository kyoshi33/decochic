import '../styles/globals.css';
import Head from 'next/head';
import { persistStore, persistReducer } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import storage from 'redux-persist/lib/storage';
import { Provider } from 'react-redux';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import user from '../reducers/user'
import cart from '../reducers/cart';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';



const reducers = combineReducers({ user, cart });

const persistConfig = { key: 'confochic', storage };

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);


const store = configureStore({
  reducer: persistReducer(persistConfig, reducers),
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});

const persistor = persistStore(store);



function App({ Component, pageProps }) {

  return (
    <>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <Head>
            <title>ConfoChic</title>
          </Head>
          <Elements stripe={stripePromise}>
            <Component {...pageProps} />
          </Elements>

        </PersistGate>
      </Provider>

    </>
  );
}

export default App;
