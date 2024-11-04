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
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



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
            <meta name="description" content="ConfoChic - Le meilleur choix pour vos meubles confortables et stylés." />
            <meta name="keywords" content="meubles, canapés, tables, confort, décoration intérieure" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta charSet="UTF-8" />
            <link rel="icon" href="/Logo.jpg" />
          </Head>
          <Elements stripe={stripePromise}>
            <ToastContainer position="top-center" />
            <Component {...pageProps} />
          </Elements>

        </PersistGate>
      </Provider>

    </>
  );
}

export default App;
