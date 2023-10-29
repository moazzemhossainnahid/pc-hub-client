"use client";
import Image from "next/image";
import React from "react";
import { FaArrowRight } from "react-icons/fa";
import Link from "next/link";
import { getUserInfo } from "@/ults/getUserInfo";
import { useGetBannerDataQuery } from "@/redux/api/apiSlice";
import Spinner from "@/components/global/spinner/Spinner";

const Banner = () => {
  const { email, token } = getUserInfo();
  const { data, isLoading } = useGetBannerDataQuery({ token });
  if (isLoading)
    return (
      <div className="h-screen w-full">
        <Spinner />
      </div>
    );
  const { bannerTitle, bannerVideo, description } = data?.data[0];
  return (
    <div
      className="h-[900px] xl:h-[850px] 2xl:h-[923px] w-full bg-cover bg-no-repeat bg-center relative overflow-hidden transition-all duration-500"
      style={{ backgroundImage: "url('/banner-images/bg-1.png')" }}
    >
      {/* background images start */}
      <div className="absolute top-0 left-0 lg:left-[10%]  ">
        <Image
          src={"/banner-images/shape-3.png"}
          alt="top shape"
          width={1993}
          height={800}
          className="w-auto h-full   "
        ></Image>
      </div>
      <div className="absolute bottom-0 left-0 w-fit h-fit -translate-x-[30%] translate-y-[20%] ">
        <Image
          src={"/banner-images/shape-1.png"}
          alt="top shape"
          width={900}
          height={900}
          className="w-auto h-full   "
        ></Image>
      </div>
      <div className="absolute bottom-[10%] right-0 ">
        <Image
          src={"/banner-images/shape-2.png"}
          alt="top shape"
          width={900}
          height={900}
          className="w-auto h-[60vh] md:h-full   "
        ></Image>
      </div>
      <div className="banner-bottom-shade pt-[20%] sm:pt-[8%] md:pt-0 h-[145px] top-[calc(900px-145px)] xl:top-[calc(850px-145px)]  2xl:top-[calc(923px-145px)]">
        <Image
          src={"/banner-images/bottom-shape.png"}
          alt="bottom shape"
          width={1995}
          height={300}
          className="w-full h-full"
        ></Image>
      </div>
      {/* background images end */}
      {/* banner content container */}
      <div className="absolute top-0 bottom-0 left-0 right-0">
        <div className="max-width flex items-center h-full ">
          <div className="w-full h-fit md:mb-8 lg:mb-12 grid md:grid-cols-2">
            <div className="space-y-5 md:space-y-0">
              {/* label container */}
              <div className="space-y-2 mb-3 md:mb-8 ">
                <div
                  className="px-3 py-2.5 md:px-5 md:py-4 bg-white rounded w-fit h-fit rbt-new-badge-one rbt-new-badge font-semibold"
                  style={{ boxShadow: "0 15px 40px #d2d3e2a1" }}
                >
                  <p>🏆 The Leader in Online Learning</p>
                </div>
              </div>
              {/* title content */}
              <div className="space-y-4 md:space-y-0">
                <div className="md:space-y-2.5 text-[#192335]">
                  <h1 className="text-4xl font-bold md:text-5xl lg:text-7xl ">
                    {bannerTitle}
                  </h1>
                </div>
                <p className="text-[#6b7385] text-sm sm:text-base font-semibold mt-2 md:mt-7 max-w-[800px] ">
                  {description}
                </p>
                <Link href={"/courses"}>
                  <button className="text-sm md:text-base font-semibold text-white flex justify-center items-center gap-2 py-3 px-3 md:py-4 md:px-5 rounded mt-3 sm:mt-5 md:mt-8 bg-gradient-to-r from-primary via-secondary to-accent hover:bg-gradient-to-l duration-500 transition-all">
                    Enroll Now <FaArrowRight></FaArrowRight>
                  </button>
                </Link>
              </div>
            </div>
            {/* images container */}
            <div className="w-full h-full flex justify-center mt-8 md:mt-0 md:justify-end sm:items-center">
              <div className="h-full w-[90%] 2xl:w-[78%] rounded pt-7">
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
