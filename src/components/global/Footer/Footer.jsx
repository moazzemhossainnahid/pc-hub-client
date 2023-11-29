import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
  FaYoutube,
  FaAngleRight,
  FaPhoneVolume,
  FaEnvelope,
  FaDribbble,
} from "react-icons/fa";

const Footer = () => {
  return (
    <div className="min-h-[300px]  w-full bg-gray-600 py-4 md:py-7 lg:py-10">
      <div className="max-width h-full grid gap-y-8 sm:gap-y-0 sm:grid-cols-2 lg:grid-cols-4 text-white gap-5 lg:gap-8 lg:justify-items-center">
        <div className="h-full flex flex-col justify-between">
          {/* <h1 className="text-xl md:text-2xl font-bold gradient-text">
            LMS Courses
          </h1> */}
          <Image
            src={"https://i.ibb.co/D95SHdG/PC-HUB.png"}
            alt="logo"
            width={250}
            height={52}
            className="w-full h-full max-h-[52px] max-w-[250px]"
          ></Image>
          <p className="text-sm">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi
            maxime eos ducimus fuga, voluptatum laudantium.
          </p>
          {/* social link */}
          <div className="flex items-center gap-2 cursor-pointer">
            <div className="p-2 border-2 border-secondary duration-300 rounded-full w-fit h-fit group bg-secondary hover:bg-transparent">
              <FaFacebookF className="md:text-lg "></FaFacebookF>
            </div>
            <div className="p-2 border-2 border-secondary duration-300 rounded-full w-fit h-fit group bg-secondary hover:bg-transparent">
              <FaYoutube className="md:text-lg "></FaYoutube>
            </div>
            <div className="p-2 border-2 border-secondary duration-300 rounded-full w-fit h-fit group bg-secondary hover:bg-transparent">
              <FaInstagram className="md:text-lg "></FaInstagram>
            </div>
            <div className="p-2 border-2 border-secondary duration-300 rounded-full w-fit h-fit group bg-secondary hover:bg-transparent">
              <FaTwitter className="md:text-lg "></FaTwitter>
            </div>
            <div className="p-2 border-2 border-secondary duration-300 rounded-full w-fit h-fit group bg-secondary hover:bg-transparent">
              <FaLinkedinIn className="md:text-lg "></FaLinkedinIn>
            </div>
          </div>
        </div>
        {/* features links */}
        <div className="">
          <h1 className="text-lg font-semibold">Feature Links</h1>
          <div className="mt-5 space-y-2">
            <div className="flex items-center gap-0.5 cursor-pointer group ">
              <FaAngleRight className="text-base duration-300 group-hover:text-secondary"></FaAngleRight>
              <Link href={"/aboutus"}>
                <p className="text-sm md:text-base group-hover:translate-x-1 group-hover:scale-95 duration-300 group-hover:text-secondary">
                  About Us
                </p>
              </Link>
            </div>
            <div className="flex items-center gap-0.5 cursor-pointer group ">
              <FaAngleRight className="text-base duration-300 group-hover:text-secondary"></FaAngleRight>
              <Link href={"/contactus"}>
                <p className="text-sm md:text-base group-hover:translate-x-1 group-hover:scale-95 duration-300 group-hover:text-secondary">
                  Contact Us
                </p>
              </Link>
            </div>
            <div className="flex items-center gap-0.5 cursor-pointer group ">
              <FaAngleRight className="text-base duration-300 group-hover:text-secondary"></FaAngleRight>
              <Link href={"/courses"}>
                <p className="text-sm md:text-base group-hover:translate-x-1 group-hover:scale-95 duration-300 group-hover:text-secondary">
                  Courses
                </p>
              </Link>
            </div>
            <div className="flex items-center gap-0.5 cursor-pointer group ">
              <FaAngleRight className="text-base duration-300 group-hover:text-secondary"></FaAngleRight>
              <Link href={"/feedbacks"}>
                <p className="text-sm md:text-base group-hover:translate-x-1 group-hover:scale-95 duration-300 group-hover:text-secondary">
                  Feedbacks
                </p>
              </Link>
            </div>
            <div className="flex items-center gap-0.5 cursor-pointer group ">
              <FaAngleRight className="text-base duration-300 group-hover:text-secondary"></FaAngleRight>
              <Link href={"/success-stories"}>
                <p className="text-sm md:text-base group-hover:translate-x-1 group-hover:scale-95 duration-300 group-hover:text-secondary">
                  Success Stories
                </p>
              </Link>
            </div>
          </div>
        </div>
        {/* Support  */}
        <div className="">
          <h1 className="text-lg font-semibold">Support</h1>
          <div className="mt-5 space-y-2">
            <div className="flex items-center gap-0.5 cursor-pointer group ">
              <FaAngleRight className="text-base duration-300 group-hover:text-secondary"></FaAngleRight>
              <Link href={"/verify-certificate"}>
                <p className="text-sm md:text-base group-hover:translate-x-1 group-hover:scale-95 duration-300 group-hover:text-secondary">
                  Verify Certificate
                </p>
              </Link>
            </div>
            <div className="flex items-center gap-0.5 cursor-pointer group ">
              <FaAngleRight className="text-base duration-300 group-hover:text-secondary"></FaAngleRight>
              <Link href={"/faq"}>
                <p className="text-sm md:text-base group-hover:translate-x-1 group-hover:scale-95 duration-300 group-hover:text-secondary">
                  FAQ&apos;s
                </p>
              </Link>
            </div>
            <div className="flex items-center gap-0.5 cursor-pointer group ">
              <FaAngleRight className="text-base duration-300 group-hover:text-secondary"></FaAngleRight>
              <Link href={"/privacy-policy"}>
                <p className="text-sm md:text-base group-hover:translate-x-1 group-hover:scale-95 duration-300 group-hover:text-secondary">
                  Privacy Policy
                </p>
              </Link>
            </div>
            <div className="flex items-center gap-0.5 cursor-pointer group ">
              <FaAngleRight className="text-base duration-300 group-hover:text-secondary"></FaAngleRight>
              <Link href={"/refund-policy"}>
                <p className="text-sm md:text-base group-hover:translate-x-1 group-hover:scale-95 duration-300 group-hover:text-secondary">
                  Refund Policy
                </p>
              </Link>
            </div>
            <div className="flex items-center gap-0.5 cursor-pointer group ">
              <FaAngleRight className="text-base duration-300 group-hover:text-secondary"></FaAngleRight>
              <Link href={"/terms-conditions"}>
                <p className="text-sm md:text-base group-hover:translate-x-1 group-hover:scale-95 duration-300 group-hover:text-secondary">
                  Terms & Conditions
                </p>
              </Link>
            </div>
          </div>
        </div>
        {/* contact us  */}
        <div className="">
          <h1 className="text-lg font-semibold">Contact Us</h1>
          <div className="mt-5 space-y-2 ">
            <p>
              203, Envato Labs, Behind Alis Steet, <br /> Melbourne, Australia.
            </p>
            <div className="space-y-1 pt-5">
              <div className="text-sm flex items-center gap-2 font-medium">
                <FaPhoneVolume className="text-base"></FaPhoneVolume>
                +01312397286
              </div>
              <div className="text-sm flex items-center gap-2 font-medium">
                <FaEnvelope className="text-base"></FaEnvelope>
                lmscourses@gamil.com
              </div>
              <div className="text-sm flex items-center gap-2 font-medium">
                <FaDribbble className="text-base"></FaDribbble>
                www.lmscourses.com
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full pt-2 mt-5 lg:mt-8 max-width flex justify-center sm:justify-between">
        <div className="">
          <p className="text-sm text-white ">
            &copy; Digital Marketing Institute BD - 2023, ALL RIGHTS RESERVED.
          </p>
          <p className="text-sm text-white ">DEVELOPED BY <a target="_blank" href="/" className="hover:underline">IMERNTECH</a> </p>
        </div>
        <div className="text-white sm:flex gap-2 text-sm hidden">
          <Link href={"/verify-certificate"}>
            <p className="text-sm text-white inline-block hover:underline hover:text-secondary duration-200 ">
              Verify Certificate
            </p>
          </Link>
          |
          <Link href={"/faq"}>
            <p className="text-sm text-white inline-block hover:underline hover:text-secondary duration-300">
              FAQ&apos;s
            </p>
          </Link>
          |
          <Link href={"/privacy-policy"}>
            <p className="text-sm text-white inline-block hover:underline hover:text-secondary duration-300">
              Privacy Policy
            </p>
          </Link>
          |
          <Link href={"/success-stories"}>
            <p className="text-sm text-white inline-block hover:underline hover:text-secondary duration-300">
              Success Stories
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
