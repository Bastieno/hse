import React from 'react';
import App from 'next/app';
import Head from 'next/head';
import Router from 'next/router';
import axios from 'axios';
import NProgress from 'nprogress';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import withRedux from 'next-redux-wrapper';
import DevTools from '../containers/DevTools';
import makeStore from '../store';
import { version } from '../package.json'
import 'antd/dist/antd.css';
import 'react-image-gallery/styles/css/image-gallery.css';

axios.defaults.baseURL = 'https://api.oghseconf.com.ng/api';
axios.defaults.timeout = 20000;

const showProgressBar = delay => {
  const timer = setTimeout(() => NProgress.start(), delay);
  Router.events.on('routeChangeComplete', () => stopProgress(timer));
  Router.events.on('routeChangeError', () => stopProgress(timer));
};

const stopProgress = timer => {
  clearTimeout(timer);
  NProgress.done();
};

Router.events.on('routeChangeStart', () => showProgressBar(300));

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    const pageProps = Component.getInitialProps
      ? await Component.getInitialProps(ctx)
      : {};

    return { pageProps };
  }

  render() {
    const { Component, pageProps, store } = this.props;

    return (
      <Provider store={store}>
        <PersistGate persistor={store.__PERSISTOR} loading={null}>
          <Head>
            {/* <title>International HSE Biennial Conference</title> */}
            <title>{`International HSE Biennial Conference v${version}`}</title>
          </Head>
          <Component {...pageProps} />
          {/* {process.env.NODE_ENV === 'development' && <DevTools />} */}
        </PersistGate>
      </Provider>
    );
  }
}

export default withRedux(makeStore)(MyApp);
