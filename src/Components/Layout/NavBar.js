import {
  CalendarIcon,
  ClipboardListIcon,
  CreditCardIcon,
  CurrencyPoundIcon,
  LockOpenIcon,
  LogoutIcon,
  UserIcon,
} from '@heroicons/react/outline';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
// import { fetchRestaurant } from '../../services/asyncReducer';
// import { editRestaurant } from '../../services/restaurantReducer';
// import {
//   setFaq,
//   setIsProfileOpen,
//   setLoadingFaq,
// } from '../../services/globalReducer';
// import {
//   defaultUser,
//   setClaimHistory,
//   setLoadingHistory,
//   setLoadingUser,
//   setMetrics,
//   setToken,
//   setUser,
// } from '../../services/userReducer';
import NavigationSidebar from './NavigationSidebar';
import NavItems from './NavItems';

export const NavBar = () => {
  const router = useRouter();
  // const { isProfileOpen } = useSelector((state) => state.globalContext);
  // const { user, token, loadingUser } = useSelector(
  //   (state) => state.userContext
  // );
  // const dispatch = useDispatch();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cookies, , removeCookie] = useCookies(['token']);

  // get all restaurants
  // useEffect(() => {
  //   dispatch(fetchRestaurant());
  // }, []);

  // get all faqs
  // useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       dispatch(setLoadingFaq(true));

  //       const faqResponse = await axios.get(
  //         `${process.env.NEXT_PUBLIC_API_URL}/api/faqs`
  //       );

  //       if (faqResponse?.data?.data) {
  //         dispatch(setFaq(faqResponse?.data?.data));
  //       }

  //       dispatch(setLoadingFaq(false));
  //     } catch (err) {
  //       console.log(err.message);
  //     }
  //   }
  //   fetchData();
  // }, []);

  // get user data from cookie
  // useEffect(() => {
  //   async function fetchData() {
  //     if (cookies?.token) {
  //       try {
  //         dispatch(setLoadingUser(true));
  //         dispatch(setLoadingHistory(true));
  //         // get user profile data
  //         const userResponse = await axios.get(
  //           `${process.env.NEXT_PUBLIC_API_URL}/api/user/profile`,
  //           {
  //             headers: {
  //               Authorization: `Bearer ${cookies?.token}`,
  //             },
  //           }
  //         );

  //         if (userResponse?.data?.data) {
  //           dispatch(setUser(userResponse?.data?.data));
  //           dispatch(setToken(cookies?.token));
  //         }

  //         dispatch(setLoadingUser(false));

  //         // get user claim history data
  //         const historyResponse = await axios.get(
  //           `${process.env.NEXT_PUBLIC_API_URL}/api/claims`,
  //           {
  //             headers: {
  //               Authorization: `Bearer ${cookies?.token}`,
  //             },
  //           }
  //         );

  //         if (historyResponse?.data?.data) {
  //           dispatch(setClaimHistory(historyResponse?.data?.data));
  //         }

  //         // get user metrics data
  //         const metricsResponse = await axios.get(
  //           `${process.env.NEXT_PUBLIC_API_URL}/api/metrics`,
  //           {
  //             headers: {
  //               Authorization: `Bearer ${cookies?.token}`,
  //             },
  //           }
  //         );

  //         if (metricsResponse?.data?.data) {
  //           dispatch(setMetrics(metricsResponse?.data?.data));
  //         }

  //         dispatch(setLoadingHistory(false));

  //         // get user restaurants data
  //         const restaurantResponse = await axios.get(
  //           `${process.env.NEXT_PUBLIC_API_URL}/api/associated-restaurant`,
  //           {
  //             headers: {
  //               Authorization: `Bearer ${cookies?.token}`,
  //             },
  //           }
  //         );

  //         if (restaurantResponse?.data?.restaurant) {
  //           dispatch(editRestaurant(restaurantResponse?.data?.restaurant));
  //         }
  //       } catch (err) {
  //         console.log(err.message);
  //       }
  //     }
  //   }
  //   fetchData();
  // }, [cookies?.token, dispatch]);

  const handleLogout = async () => {


    const loading = toast.loading('Please wait...');
    // expire the token
    if (token) {
      try {
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/logout`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } catch (err) {
        console.log(err.message);
      }
    }

    // delete cookies data
    removeCookie('token', { path: '/' });
    // remove user from reducer
    dispatch(setUser(defaultUser));
    // remove token from reducer
    dispatch(setToken(null));
    router.push('/login');
    toast.dismiss(loading);
    toast.success('Successfully Log out!');

  };

  return (
    <nav className='top-0 w-full fixed z-40 bg-brand-1000'>
      <div className='px-4 py-3 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl lg:px-8'>
        <div className='relative flex items-center justify-between'>
          <div className='w-40 h-full'>
            <Link legacyBehavior href='/'>
              <a>
                <Image
                  src='https://i.ibb.co/Lv0Pj2p/logo.png'
                  alt='FoodClub'
                  layout='responsive'
                  width={180}
                  height={70}
                  className='inline-flex items-center rounded-xl shadow-3xl'
                  placeholder='blur'
                  blurDataURL='https://i.ibb.co/Lv0Pj2p/logo.png'
                  objectFit='contain'
                />
              </a>
            </Link>
          </div>
          <ul className='items-center hidden space-x-8 lg:flex'>
            {/* Nav Links Items */}
            <NavItems setIsMenuOpen={setIsMenuOpen} />
          </ul>
          <ul className='items-center hidden space-x-8 lg:flex'>
            {/* If  user not authenticated */}
            {/* {!token && !loadingUser && (
              <>
                <li>
                  <Link href='/login'>
                    <a
                      className={`font-semibold text-base tracking-wider text-white transition-colors duration-200 hover:text-red-100 nav_items ${
                        router.pathname === '/login' ? 'nav_active' : ''
                      } `}
                    >
                      Login
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href='/signup'>
                    <a className='inline-flex items-center justify-center h-12 px-6 font-semibold tracking-wide text-white transition duration-200 rounded shadow-3xl bg-red-500 hover:bg-red-600  focus:outline-none'>
                      Register now
                    </a>
                  </Link>
                </li>
              </>
            )} */}

            {/* If user loading */}
            {/* {loadingUser && (
              <div className='flex justify-center items-center my-2 mx-auto'>
                <div className='animate-spin rounded-full h-8 w-8 sm:h-10 sm:w-10 border-t-2 border-b-2 border-red-500'></div>
              </div>
            )} */}

            {/* If Authenticated - User Icon for Desktop User */}
            {/* {token?.length > 0 && !loadingUser && (
              <div className='dropdown inline-block relative'>
                <div className='dropdown relative hidden sm:inline-block'>
                  <button
                    className='font-medium text-sm tracking-wider transition-colors duration-200 hover:text-light-blue-600 inline-flex items-center text-gray-800'
                    onClick={() => router.push('/dashboard')}
                  >
                    <span className='mr-2 font-semibold text-base tracking-wide transition-colors duration-200 hover:text-red-100 text-white nav_items'>
                      {user?.name}
                    </span>
                    <div className='inline-block border-2 border-red-500 mx-auto object-cover object-center w-12 h-12 rounded-full'>
                      <Image
                        src={`${
                          user?.image || 'https://i.ibb.co/S5bzHs0/R5o51PR.png'
                        }`}
                        alt=''
                        layout='responsive'
                        className='inline-flex items-center rounded-full'
                        width='100%'
                        height='100%'
                        objectFit='cover'
                        placeholder='blur'
                        objectPosition='center'
                        blurDataURL='https://i.ibb.co/S5bzHs0/R5o51PR.png'
                      />
                    </div>
                  </button>
                  <ul className='dropdown-menu absolute hidden text-gray-800 w-40 ml-2 py-1 bg-white rounded shadow-3xl z-10'>
                    <li>
                      <Link href='/dashboard'>
                        <a className='flex rounded-t hover:bg-red-accent-700 hover:text-red-500 py-2 px-2 text-sm whitespace-no-wrap'>
                          <CreditCardIcon
                            className='h-5 w-5 mr-1'
                            aria-hidden='true'
                          />
                          Dashboard
                        </a>
                      </Link>
                    </li>
                    {user?.member_info === null ||
                      (user?.member_info?.subscription_type === null &&
                        user?.user_type === '55' && (
                          <li>
                            <Link href='/dashboard/make-payment'>
                              <a className='flex rounded-t hover:bg-red-accent-700 hover:text-red-500 py-2 px-2 text-sm whitespace-no-wrap'>
                                <CurrencyPoundIcon
                                  className='h-5 w-5 mr-1'
                                  aria-hidden='true'
                                />
                                Make Payment
                              </a>
                            </Link>
                          </li>
                        ))}
                    <li>
                      <Link href='/dashboard/profile'>
                        <a className='flex rounded-t hover:bg-red-accent-700 hover:text-red-500 py-2 px-2 text-sm whitespace-no-wrap'>
                          <UserIcon
                            className='h-5 w-5 mr-1'
                            aria-hidden='true'
                          />
                          Profile
                        </a>
                      </Link>
                    </li>
                    <li>
                      <Link href='/dashboard/claim-history'>
                        <a className='flex rounded-t hover:bg-red-accent-700 hover:text-red-500 py-2 px-2 text-sm whitespace-no-wrap'>
                          <CalendarIcon
                            className='h-5 w-5 mr-1'
                            aria-hidden='true'
                          />
                          Claim History
                        </a>
                      </Link>
                    </li>
                    {user?.associated_restaurant_id && (
                      <li>
                        <Link href='/dashboard/edit-restaurant'>
                          <a className='flex rounded-t hover:bg-red-accent-700 hover:text-red-500 py-2 px-2 text-sm whitespace-no-wrap'>
                            <ClipboardListIcon
                              className='h-5 w-5 mr-1'
                              aria-hidden='true'
                            />
                            Edit Restaurant
                          </a>
                        </Link>
                      </li>
                    )}
                    <li>
                      <Link href='/dashboard/referrals'>
                        <a className='flex rounded-t hover:bg-red-accent-700 hover:text-red-500 py-2 px-2 text-sm whitespace-no-wrap'>
                          <ClipboardListIcon
                            className='h-5 w-5 mr-1'
                            aria-hidden='true'
                          />
                          Referrals
                        </a>
                      </Link>
                    </li>
                    <li>
                      <Link href={`/change-password`}>
                        <a className='flex rounded-t hover:bg-red-accent-700 hover:text-red-500 py-2 px-2 text-sm whitespace-no-wrap'>
                          <LockOpenIcon
                            className='h-5 w-5 mr-1'
                            aria-hidden='true'
                          />
                          Change Password
                        </a>
                      </Link>
                    </li>
                    <li>
                      <span
                        className='flex rounded-t hover:bg-red-accent-700 hover:text-red-500 py-2 px-2 text-sm whitespace-no-wrap cursor-pointer'
                        onClick={handleLogout}
                      >
                        <LogoutIcon
                          className='h-5 w-5 mr-1'
                          aria-hidden='true'
                        />
                        Log out
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            )} */}
          </ul>

          {/* Mobile Nav Bar */}
          <div className='flex lg:hidden items-center space-x-8'>
            {/* If user loading */}
            {/* {loadingUser && (
              <div className='flex justify-center items-center my-2 mx-auto'>
                <div className='animate-spin rounded-full h-8 w-8 sm:h-10 sm:w-10 border-t-2 border-b-2 border-red-500'></div>
              </div>
            )} */}
            {/* If Authenticated - User Profile Card */}
            {/* {token?.length > 0 && !loadingUser && (
              <div className='lg:hidden'>
                <button
                  aria-label='Open Profile'
                  title='Open Profile'
                  className='border-2 border-red-500 rounded-full flex items-center text-sm focus:outline-none'
                  onClick={() => dispatch(setIsProfileOpen(true))}
                >
                  <div className='w-12 h-12 rounded-full'>
                    <Image
                      src={`${
                        user?.image || 'https://i.ibb.co/S5bzHs0/R5o51PR.png'
                      }`}
                      alt=''
                      layout='responsive'
                      className='inline-flex items-center rounded-full'
                      width='100%'
                      height='100%'
                      objectFit='cover'
                      placeholder='blur'
                      objectPosition='center'
                      blurDataURL='https://i.ibb.co/FmcJYgX/avatar.jpg'
                    />
                  </div>
                </button>
                {isProfileOpen && (
                  <div className='absolute top-0 left-0 w-full backdrop-filter saturate-150 backdrop-blur-sm'>
                    <div className='p-5 bg-white border border-red-300'>
                      <div className='flex items-center justify-between mb-4'>
                        <div className='w-40 h-full'>
                          <Link href='/'>
                            <a>
                              <Image
                                src='https://i.ibb.co/Lv0Pj2p/logo.png'
                                alt='FoodClub'
                                layout='responsive'
                                width='100%'
                                height='35%'
                                className='inline-flex items-center rounded-xl shadow-3xl'
                                placeholder='blur'
                                blurDataURL='https://i.ibb.co/Lv0Pj2p/logo.png'
                              />
                            </a>
                          </Link>
                        </div>
                        <div>
                          <button
                            aria-label='Close Menu'
                            title='Close Menu'
                            className='p-2 -mt-2 -mr-2 transition duration-200 rounded bg-red-200 text-red-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline'
                            onClick={() => dispatch(setIsProfileOpen(false))}
                          >
                            <svg className='w-5 text-white' viewBox='0 0 24 24'>
                              <path
                                fill='currentColor'
                                d='M19.7,4.3c-0.4-0.4-1-0.4-1.4,0L12,10.6L5.7,4.3c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4l6.3,6.3l-6.3,6.3 c-0.4,0.4-0.4,1,0,1.4C4.5,19.9,4.7,20,5,20s0.5-0.1,0.7-0.3l6.3-6.3l6.3,6.3c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3 c0.4-0.4,0.4-1,0-1.4L13.4,12l6.3-6.3C20.1,5.3,20.1,4.7,19.7,4.3z'
                              />
                            </svg>
                          </button>
                        </div>
                      </div>

                      Open mobile user navigation
                      <NavigationSidebar mobileHeader={true} />
                    </div>
                  </div>
                )}
              </div>
            )} */}

            {/* Mobile Nav Menu */}
            <div className='lg:hidden block'>
              <button
                aria-label='Open Menu'
                title='Open Menu'
                className='p-2 -mr-1 transition duration-200 rounded focus:outline-none bg-gray-100 text-red-500 hover:bg-gray-100 focus:bg-gray-50'
                onClick={() => setIsMenuOpen(true)}
              >
                <svg className='w-5 text-red-500' viewBox='0 0 24 24'>
                  <path
                    fill='currentColor'
                    d='M23,13H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,13,23,13z'
                  />
                  <path
                    fill='currentColor'
                    d='M23,6H1C0.4,6,0,5.6,0,5s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,6,23,6z'
                  />
                  <path
                    fill='currentColor'
                    d='M23,20H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,20,23,20z'
                  />
                </svg>
              </button>
              {isMenuOpen && (
                <div className='absolute top-0 left-0 w-full z-10'>
                  <div className='p-5 bg-brand-1000 border border-red-300 rounded shadow-sm'>
                    <div className='flex items-center justify-between mb-4'>
                      <div className='w-40 h-full'>
                        <Link href='/'>
                          <Image
                            src='https://i.ibb.co/Lv0Pj2p/logo.png'
                            alt='FoodClub'
                            layout='responsive'
                            width={200}
                            height={100}
                            className='inline-flex items-center rounded-xl shadow-3xl'
                            placeholder='blur'
                            blurDataURL='https://i.ibb.co/Lv0Pj2p/logo.png'
                          />
                        </Link>
                      </div>
                      <div>
                        <button
                          aria-label='Close Menu'
                          title='Close Menu'
                          className='p-2 -mr-1 transition duration-200 rounded focus:outline-none bg-gray-100 text-red-500 hover:bg-gray-100 focus:bg-gray-50'
                          onClick={() => setIsMenuOpen(false)}
                        >
                          <svg className='w-5 text-red-500' viewBox='0 0 24 24'>
                            <path
                              fill='currentColor'
                              d='M19.7,4.3c-0.4-0.4-1-0.4-1.4,0L12,10.6L5.7,4.3c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4l6.3,6.3l-6.3,6.3 c-0.4,0.4-0.4,1,0,1.4C4.5,19.9,4.7,20,5,20s0.5-0.1,0.7-0.3l6.3-6.3l6.3,6.3c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3 c0.4-0.4,0.4-1,0-1.4L13.4,12l6.3-6.3C20.1,5.3,20.1,4.7,19.7,4.3z'
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                    <nav>
                      <ul className='space-y-4'>
                        {/* Nav Links Items */}
                        <NavItems setIsMenuOpen={setIsMenuOpen} />
                        {/* If  user not authenticated */}
                        {/* {!token && !user?.email && (
                          <li>
                            <li>
                              <Link legacyBehavior href='/login'>
                                <a
                                  className={`font-semibold text-base tracking-wider text-white transition-colors duration-200 hover:text-red-100 nav_items ${router.pathname === '/login'
                                    ? 'nav_active'
                                    : ''
                                    } `}
                                  onClick={() => setIsMenuOpen(false)}
                                >
                                  Login
                                </a>
                              </Link>
                            </li>
                            <Link legacyBehavior href='/signup'>
                              <a
                                className='mt-4 inline-flex items-center justify-center h-12 px-6 font-semibold tracking-wide text-white transition duration-200 rounded shadow-3xl bg-red-600 hover:bg-red-700 focus:outline-none'
                                onClick={() => setIsMenuOpen(false)}
                              >
                                Register now
                              </a>
                            </Link>
                          </li>
                        )} */}
                      </ul>
                    </nav>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
