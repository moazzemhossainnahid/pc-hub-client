import Router from 'next/router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { CookiesProvider } from 'react-cookie';
import { Toaster } from 'react-hot-toast';
import '@/styles/globals.css';
import Layout from '@/Components/Layout/Layout';

export default function App({ Component, pageProps }) {
  NProgress.configure({ showSpinner: false });

  Router.events.on('routeChangeStart', () => {
    NProgress.start();
  });

  Router.events.on('routeChangeComplete', () => {
    NProgress.done();
  });

  return (
    <>
      <CookiesProvider>
        <Toaster
          toastOptions={{
            duration: 3000,
          }}
        />
        <Layout>
          < Component {...pageProps} />
        </Layout>
      </CookiesProvider>
    </>
  )
}
