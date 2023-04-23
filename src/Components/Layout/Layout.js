import Head from 'next/head';
import Footer from './Footer';
import NavBar from './NavBar';

const Layout = ({ children }) => {
  return (
    <>
      <Head>
        <title>FoodClub | Claim your food discount!</title>
        <meta
          name='description'
          content='Foodclub is a member and partner based club where members can enjoy guaranteed discount from club partners. Get your Membership and start saving, feel special!'
        />
        <link rel='icon' href='/favicon.png' />
      </Head>
      <header> 
        <NavBar />
      </header>
      <main>{children}</main>
      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default Layout;
