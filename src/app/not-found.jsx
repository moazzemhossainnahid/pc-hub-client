"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";

const NotFoundPage = () => {
  return (
    <div className="w-full py-20 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-center gap-5 mx-auto text-center">
        <div className="w-full md:w-3/6 mx-auto">
          <Image
            src={
              "https://i.pinimg.com/originals/86/41/80/86418032b715698a4dfa6684b50c12af.gif"
            }
            alt="sideimg"
            width={800}
            height={600}
            className="w-full h-full max-h-[530px] max-w-[624px]"
          ></Image>{" "}
        </div>
        <div className="w-full md:w-3/6 mx-auto">
          <p className="mb-4 text-3xl md:text-4xl font-bold text-gray-600">{`Oops! Looks like you're lost.`}</p>
          <div className="animate-pulse py-5">
            <svg
              className="mx-auto h-16 w-16 text-red-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              ></path>
            </svg>
          </div>
          <p className="mt-4 text-2xl flex flex-col md:flex-row justify-center items-center gap-3 text-gray-600">
            {`Let's get you`}{" "}
            <Link href="/" className="text-blue-500">
              <button className="w-[150px] h-[40px] border-2 border-primary rounded text-sm font-medium relative overflow-hidden group">
                <div className="flex items-center text-primary justify-center w-full gap-1 z-20 absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] group-hover:text-white duration-500">
                  Back to Homepage
                </div>
                <div className="bg-primary z-[10] absolute top-0 left-0 h-0 w-0 rounded group-hover:h-full group-hover:w-full duration-500"></div>
                <div className="bg-secondary z-[9] absolute bottom-0 right-0 h-0 w-0 rounded group-hover:h-full group-hover:w-full duration-500"></div>
              </button>
            </Link>
            
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
