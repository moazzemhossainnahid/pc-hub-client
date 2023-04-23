
import { MailIcon, PhoneIcon } from '@heroicons/react/outline';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

const ContactPage = () => {
  const {
    register: registerContact,
    handleSubmit: handleContact,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    const { name, email, phone, message } = data;
    const loading = toast.loading('Please wait a moment...');

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/enquiry`,
        { name, email, phone, message }
      );
      const { status } = res;

      if (status === 200) {
        toast.dismiss(loading);
        reset();
        toast.success('Enquiry sent successfully!');
      } else {
        toast.dismiss(loading);
        toast.error('Enquiry failed!');
      }
    } catch (error) {
      toast.dismiss(loading);
      toast.error('Enquiry failed!');
    }
  };

  return (
    <section
      className='w-full min-h-full bg-center bg-cover bg-no-repeat'
      style={{
        backgroundImage: `url(https://i.ibb.co/HdZv4mG/signup-bg.png)`,
      }}
    >
      <div className='px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl lg:px-8 lg:py-20'>
        <div className='relative max-w-7xl mx-auto lg:grid lg:grid-cols-5'>
          <div className='py-16 px-4 sm:px-6 lg:col-span-2 lg:px-8 lg:py-24 xl:pr-12'>
            <div className='max-w-lg mx-auto'>
              <h2 className='text-2xl font-semibold tracking-wide text-brand-700 sm:text-3xl'>
                Get in touch
              </h2>
              <dl className='mt-6 text-base text-gray-600'>
                <div className='mt-3'>
                  <dt className='sr-only'>Email</dt>
                  <dd className='flex'>
                    {/* <PhoneIcon
                      className='flex-shrink-0 h-6 w-6 text-gray-500'
                      aria-hidden='true'
                    /> */}
                    <span className='ml-3'>+44 20 3289 6820</span>
                  </dd>
                    <dd className='flex mt-4'>
                    {/* <MailIcon
                      className='flex-shrink-0 h-6 w-6 text-gray-500'
                      aria-hidden='true'
                    /> */}
                    <span className='ml-3'>info@foodclubuk.com</span>
                  </dd>
                </div>
              </dl>
              <div className='mt-3'>
                <div className='mt-6 mb-2 text-base text-gray-600 tracking-wide'>
                  Follow us
                </div>
                <div className='flex justify-start space-x-3'>
                  <a
                    rel='noopener noreferrer'
                    href='https://www.facebook.com/foodclubuk/'
                    target='_blank'
                    title='Facebook'
                    className='flex items-center p-1 text-gray-600 hover:text-red-500'
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='currentColor'
                      viewBox='0 0 32 32'
                      className='w-5 h-5 fill-current'
                    >
                      <path d='M32 16c0-8.839-7.167-16-16-16-8.839 0-16 7.161-16 16 0 7.984 5.849 14.604 13.5 15.803v-11.177h-4.063v-4.625h4.063v-3.527c0-4.009 2.385-6.223 6.041-6.223 1.751 0 3.584 0.312 3.584 0.312v3.937h-2.021c-1.984 0-2.604 1.235-2.604 2.5v3h4.437l-0.713 4.625h-3.724v11.177c7.645-1.199 13.5-7.819 13.5-15.803z'></path>
                    </svg>
                  </a>
                  <a
                    rel='noopener noreferrer'
                    href='https://twitter.com/foodclub_uk'
                    target='_blank'
                    title='Twitter'
                    className='flex items-center p-1 text-gray-600 hover:text-red-500'
                  >
                    <svg
                      viewBox='0 0 24 24'
                      xmlns='http://www.w3.org/2000/svg'
                      className='w-5 h-5 fill-current'
                    >
                      <path d='M23.954 4.569a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.691 8.094 4.066 6.13 1.64 3.161a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.061a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.937 4.937 0 004.604 3.417 9.868 9.868 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63a9.936 9.936 0 002.46-2.548l-.047-.02z'></path>
                    </svg>
                  </a>
                  <a
                    rel='noopener noreferrer'
                    href='https://www.instagram.com/foodclub_uk/'
                    target='_blank'
                    title='Instagram'
                    className='flex items-center p-1 text-gray-600 hover:text-red-500'
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 32 32'
                      fill='currentColor'
                      className='w-5 h-5 fill-current'
                    >
                      <path d='M16 0c-4.349 0-4.891 0.021-6.593 0.093-1.709 0.084-2.865 0.349-3.885 0.745-1.052 0.412-1.948 0.959-2.833 1.849-0.891 0.885-1.443 1.781-1.849 2.833-0.396 1.020-0.661 2.176-0.745 3.885-0.077 1.703-0.093 2.244-0.093 6.593s0.021 4.891 0.093 6.593c0.084 1.704 0.349 2.865 0.745 3.885 0.412 1.052 0.959 1.948 1.849 2.833 0.885 0.891 1.781 1.443 2.833 1.849 1.020 0.391 2.181 0.661 3.885 0.745 1.703 0.077 2.244 0.093 6.593 0.093s4.891-0.021 6.593-0.093c1.704-0.084 2.865-0.355 3.885-0.745 1.052-0.412 1.948-0.959 2.833-1.849 0.891-0.885 1.443-1.776 1.849-2.833 0.391-1.020 0.661-2.181 0.745-3.885 0.077-1.703 0.093-2.244 0.093-6.593s-0.021-4.891-0.093-6.593c-0.084-1.704-0.355-2.871-0.745-3.885-0.412-1.052-0.959-1.948-1.849-2.833-0.885-0.891-1.776-1.443-2.833-1.849-1.020-0.396-2.181-0.661-3.885-0.745-1.703-0.077-2.244-0.093-6.593-0.093zM16 2.88c4.271 0 4.781 0.021 6.469 0.093 1.557 0.073 2.405 0.333 2.968 0.553 0.751 0.291 1.276 0.635 1.844 1.197 0.557 0.557 0.901 1.088 1.192 1.839 0.22 0.563 0.48 1.411 0.553 2.968 0.072 1.688 0.093 2.199 0.093 6.469s-0.021 4.781-0.099 6.469c-0.084 1.557-0.344 2.405-0.563 2.968-0.303 0.751-0.641 1.276-1.199 1.844-0.563 0.557-1.099 0.901-1.844 1.192-0.556 0.22-1.416 0.48-2.979 0.553-1.697 0.072-2.197 0.093-6.479 0.093s-4.781-0.021-6.48-0.099c-1.557-0.084-2.416-0.344-2.979-0.563-0.76-0.303-1.281-0.641-1.839-1.199-0.563-0.563-0.921-1.099-1.197-1.844-0.224-0.556-0.48-1.416-0.563-2.979-0.057-1.677-0.084-2.197-0.084-6.459 0-4.26 0.027-4.781 0.084-6.479 0.083-1.563 0.339-2.421 0.563-2.979 0.276-0.761 0.635-1.281 1.197-1.844 0.557-0.557 1.079-0.917 1.839-1.199 0.563-0.219 1.401-0.479 2.964-0.557 1.697-0.061 2.197-0.083 6.473-0.083zM16 7.787c-4.541 0-8.213 3.677-8.213 8.213 0 4.541 3.677 8.213 8.213 8.213 4.541 0 8.213-3.677 8.213-8.213 0-4.541-3.677-8.213-8.213-8.213zM16 21.333c-2.948 0-5.333-2.385-5.333-5.333s2.385-5.333 5.333-5.333c2.948 0 5.333 2.385 5.333 5.333s-2.385 5.333-5.333 5.333zM26.464 7.459c0 1.063-0.865 1.921-1.923 1.921-1.063 0-1.921-0.859-1.921-1.921 0-1.057 0.864-1.917 1.921-1.917s1.923 0.86 1.923 1.917z'></path>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className='bg-white py-8 sm:py-16 px-4 sm:px-6 lg:col-span-3 lg:py-24 lg:px-8 xl:pl-12'>
            <div className='max-w-lg mx-auto lg:max-w-none'>
              <form
                className='grid grid-cols-1 gap-y-6'
                onSubmit={handleContact(onSubmit)}
              >
                <div>
                  <label htmlFor='name' className='sr-only'>
                    Full name
                  </label>
                  <input
                    type='text'
                    name='name'
                    id='name'
                    {...registerContact('name', {
                      required: 'Name is required',
                      minLength: {
                        value: 6,
                        message: 'Name minimum 2 words',
                      },
                    })}
                    autoComplete='name'
                    className={`block w-full shadow-sm py-3 px-4 placeholder-gray-600 border-gray-300 rounded-md ${
                      errors.name
                        ? 'focus:border-red-300 focus:ring-red-500'
                        : 'focus:border-orange-300 focus:ring-orange-500'
                    }`}
                    placeholder='Full name'
                  />
                  <span className='flex items-center font-medium tracking-wide text-red-500 text-sm mt-1 ml-1'>
                    {errors.name?.message}
                  </span>
                </div>
                <div>
                  <label htmlFor='email' className='sr-only'>
                    Email
                  </label>
                  <input
                    id='email'
                    name='email'
                    type='email'
                    autoComplete='email'
                    {...registerContact('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                        message: 'Invalid email address',
                      },
                    })}
                    className={`block w-full shadow-sm py-3 px-4 placeholder-gray-600 border-gray-300 rounded-md ${
                      errors.email
                        ? 'focus:border-red-300 focus:ring-red-500'
                        : 'focus:border-orange-300 focus:ring-orange-500'
                    }`}
                    placeholder='Email'
                  />
                  <span className='flex items-center font-medium tracking-wide text-red-500 text-sm mt-1 ml-1'>
                    {errors.email?.message}
                  </span>
                </div>
                <div>
                  <label htmlFor='phone' className='sr-only'>
                    Phone
                  </label>
                  <input
                    type='number'
                    name='phone'
                    id='phone'
                    {...registerContact('phone', {
                      minLength: {
                        value: 10,
                        message: 'Phone number must be a valid UK number',
                      },
                    })}
                    autoComplete='tel'
                    className={`block w-full shadow-sm py-3 px-4 placeholder-gray-600 border-gray-300 rounded-md ${
                      errors.phone
                        ? 'focus:border-red-300 focus:ring-red-500'
                        : 'focus:border-orange-300 focus:ring-orange-500'
                    }`}
                    placeholder='Phone'
                  />
                  <span className='flex items-center font-medium tracking-wide text-red-500 text-sm mt-1 ml-1'>
                    {errors.phone?.message}
                  </span>
                </div>
                <div>
                  <label htmlFor='message' className='sr-only'>
                    Message
                  </label>
                  <textarea
                    id='message'
                    name='message'
                    rows={4}
                    {...registerContact('message', {
                      required: 'Message is required',
                      minLength: {
                        value: 6,
                        message: 'Message minimum 2 words',
                      },
                    })}
                    className={`block w-full shadow-sm py-3 px-4 placeholder-gray-600 border-gray-300 rounded-md ${
                      errors.message
                        ? 'focus:border-red-300 focus:ring-red-500'
                        : 'focus:border-orange-300 focus:ring-orange-500'
                    }`}
                    placeholder='Message'
                    defaultValue={''}
                  />
                  <span className='flex items-center font-medium tracking-wide text-red-500 text-sm mt-1 ml-1'>
                    {errors.message?.message}
                  </span>
                </div>
                <div>
                  <button
                    type='submit'
                    className='inline-flex justify-center py-3 px-6 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500'
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactPage;
