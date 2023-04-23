import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

const NavItems = ({ setIsMenuOpen }) => {
  const router = useRouter();
  // const { user, token } = useSelector((state) => state.userContext);

  return (
    <>
      <li>
        <Link legacyBehavior href='/'>
          <a
            className={`font-semibold text-base tracking-wider text-white transition-colors duration-200 hover:text-red-100 nav_items ${
              router.pathname === '/' ? 'nav_active' : ''
            } `}
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </a>
        </Link>
      </li>
      <li>
        <Link legacyBehavior href='/about'>
          <a
            className={`font-semibold text-base tracking-wider text-white transition-colors duration-200 hover:text-red-100 nav_items ${
              router.pathname === '/about' ? 'nav_active' : ''
            } `}
            onClick={() => setIsMenuOpen(false)}
          >
            About us
          </a>
        </Link>
      </li>
      {/* If  user not authenticated */}
      {/* {!token && (
        <li>
          <Link href='/business'>
            <a
              className={`font-semibold text-base tracking-wider text-white transition-colors duration-200 hover:text-red-100 nav_items ${
                router.pathname === '/business' ? 'nav_active' : ''
              } `}
              onClick={() => setIsMenuOpen(false)}
            >
              Add your Business
            </a>
          </Link>
        </li>
      )} */}
      <li>
        <Link legacyBehavior href='/faq'>
          <a
            className={`font-semibold text-base tracking-wider text-white transition-colors duration-200 hover:text-red-100 nav_items ${
              router.pathname === '/faq' ? 'nav_active' : ''
            } `}
            onClick={() => setIsMenuOpen(false)}
          >
            FAQs
          </a>
        </Link>
      </li>
      <li>
        <Link legacyBehavior href='/contact'>
          <a
            className={`font-semibold text-base tracking-wider text-white transition-colors duration-200 hover:text-red-100 nav_items ${
              router.pathname === '/contact' ? 'nav_active' : ''
            } `}
            onClick={() => setIsMenuOpen(false)}
          >
            Contact us
          </a>
        </Link>
      </li>
    </>
  );
};

export default NavItems;
