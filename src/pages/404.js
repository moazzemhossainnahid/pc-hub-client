import Image from 'next/image';
import Link from 'next/link';

const ErrorPage = () => {
  return (
    <section
      className="w-full min-h-full bg-center bg-cover bg-no-repeat"
      style={{
        backgroundImage: `url(https://i.ibb.co/HdZv4mG/signup-bg.png)`,
      }}
    >
      <div className="px-4 py-16 lg:py-20 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl">
        <div className="container px-6 pt-24 pb-16 mx-auto text-center">
          <div className="flex justify-center">
            <div className="w-1/2 lg:w-1/3 h-full">
              <Image
                src="https://i.ibb.co/M6v3kC0/error-removebg-preview.png"
                alt="404"
                width={400}
                height={300}
                layout="responsive"
                className="mx-auto"
                placeholder="blur"
                blurDataURL="https://i.ibb.co/M6v3kC0/error-removebg-preview.png"
              />
            </div>
          </div>
          <div className="max-w-lg mx-auto">
            <h1 className="text-2xl lg:text-3xl font-semibold text-red-500 mt-4">
              Opps, Something went wrong
            </h1>
            <p className="mt-4 text-gray-600">
              Sorry, we are not able to find what you are looking for.
            </p>
            <div className="mx-auto mt-8">
              <Link href="/">
                <a className="w-52 text-center bg-transparent hover:bg-red-600 text-red-500 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent transition duration-200 rounded shadow-3xl tracking-wider">
                  TAKE ME HOME
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ErrorPage;
