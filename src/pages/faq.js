import Loader from '@/Components/Others/Loader/Loader';
import { useState } from 'react';
import { useSelector } from 'react-redux';

const Item = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className='border border-red-200 rounded shadow-4xl'>
      <button
        type='button'
        aria-label='Open item'
        title='Open item'
        className='flex items-center justify-between w-full p-4 focus:outline-none'
        onClick={() => setIsOpen(!isOpen)}
      >
        <p className='text-lg font-semibold text-brand-700'>{title}</p>
        <div className='flex items-center justify-center w-8 h-8 border border-red-200 shadow-md rounded-full'>
          <svg
            viewBox='0 0 24 24'
            className={`w-4 text-red-500 transition-transform duration-200 ${
              isOpen ? 'transform rotate-180' : ''
            }`}
          >
            <polyline
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeMiterlimit='10'
              points='2,7 12,17 22,7'
              strokeLinejoin='round'
            />
          </svg>
        </div>
      </button>
      {isOpen && (
        <div className='p-4 pt-0'>
          <p className='text-gray-700 tracking-wide leading-normal'>
            {children}
          </p>
        </div>
      )}
    </div>
  );
};

const FAQPage = () => {
//   const { loadingFaq, faq } = useSelector((state) => state.globalContext);

  return (
    <section className='px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-24'>
      <div className='max-w-xl sm:mx-auto lg:max-w-2xl'>
        <div className='flex flex-col mb-12 mt-16 sm:text-center'>
          <div className='max-w-xl md:mx-auto sm:text-center lg:max-w-2xl'>
            <h2 className='max-w-lg mb-6 font-sans text-3xl font-semibold leading-none tracking-wide text-red-500 sm:text-4xl md:mx-auto'>
              <span className='relative inline-block'>
                <svg
                  viewBox='0 0 52 24'
                  fill='currentColor'
                  className='absolute top-0 left-0 z-0 hidden w-32 -mt-8 -ml-20 text-red-100 lg:w-32 lg:-ml-28 lg:-mt-10 sm:block'
                >
                  <defs>
                    <pattern
                      id='ec5d8ef5-b853-4714-b94f-df28ec98eeb7'
                      x='0'
                      y='0'
                      width='.135'
                      height='.30'
                    >
                      <circle cx='1' cy='1' r='.7' />
                    </pattern>
                  </defs>
                  <rect
                    fill='url(#ec5d8ef5-b853-4714-b94f-df28ec98eeb7)'
                    width='52'
                    height='24'
                  />
                </svg>
                <span className='relative'>Frequently </span>
              </span>{' '}
              Asked Question
            </h2>
            <p className='text-base text-gray-700 md:text-lg'>
              Got a question? Please check our FAQs below.
            </p>
          </div>
        </div>
        {/* <div className='space-y-6'>
          {loadingFaq ? (
            <div className='flex justify-center align-center mb-10 mt-16 mx-auto'>
              <Loader />
            </div>
          ) : faq?.length > 0 ? (
            faq?.map((item, index) => (
              <Item key={index} title={item?.question}>
                {item?.answer}
              </Item>
            ))
          ) : (
            <p className='text-base text-red-600 md:text-lg mt-6'>
              No FAQs found!
            </p>
          )}
        </div> */}
      </div>
    </section>
  );
};

export default FAQPage;