"use client";
import Image from "next/image";
import React from "react";
import { FaMedapps } from "react-icons/fa";
import { BsBook } from "react-icons/bs";
import Link from "next/link";

const SoftwaresCard = ({ software }) => {
  return (
    <Link href={`/softwares/${software?._id}`}>
      <div className="shadow bg-white hover:shadow-md hover:-translate-y-1 hover:scale-[1.01] duration-500 transition-all w-full h-full rounded cursor-pointer flex flex-col justify-between">
        <div className="">
          <div>
            <Image
              src={software?.image_url}
              alt="course1"
              width={500}
              height={400}
              className="rounded w-full h-auto"
            />
          </div>
          {/* card body */}
          <div className="px-3 py-2 pt-3 h-fit">
            <div className="flex items-center gap-2">

            </div>
            <h1 className="text-sm sm:text-base font-semibold text-gray-600 mt-1">
              {software?.name}
            </h1>
          </div>
        </div>
        <div className="mt-4 lg:mt-6 pb-3.5 px-3 ">
          <div className="flex items-center justify-between gap-1.5 md:gap-3 pb-2.5 border-b">
            <div className="flex items-center gap-1 sm:gap-1.5">
              <BsBook className="text-secondary w-3.5 h-3.5"></BsBook>
              <p className="text-xs text-gray-500 font-medium">
                {software?.category}
              </p>
            </div>
            <div className="flex items-center gap-1 sm:gap-1.5">
              <FaMedapps className="text-secondary w-3.5 h-3.5"></FaMedapps>
              <p className="text-xs text-gray-500 font-medium">
                {software?.version}
              </p>
            </div>
          </div>
          {/* publisher profile */}
          <div className="mt-2 flex items-center justify-between">
            <div className="flex items-center gap-1 md:gap-2">
              <div className="w-[35px] h-[35px] rounded-full overflow-hidden border border-secondary">
                <Image
                  src={
                    software?.publisher?.profileImg ||
                    "https://i.ibb.co/VJ0rnsr/default-avatar-profile-icon-of-social-media-user-vector.jpg"
                  }
                  alt="profile"
                  width={100}
                  height={100}
                  className=""
                ></Image>
              </div>
              <div className="flex flex-col">
                <h4 className="text-gray-600 text-sm font-semibold">
                  {software?.publisher}
                </h4>
                <span className="text-[12px] text-gray-500">Publisher</span>
              </div>
            </div>
            {/* price here */}
            <div className="w-fit flex items-center gap-1">
              {software?.discountPrice > 0 && (
                <p className="font-medium text-sm text-gray-600">
                  <del>&#2547; {software?.price}</del>
                </p>
              )}
              {/* <p className="font-semibold text-base text-secondary">
                &#2547; {software?.price - software?.discountPrice}
              </p> */}
              <p className="font-semibold text-base text-secondary">
                &#2547; {`0.00`}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SoftwaresCard;
