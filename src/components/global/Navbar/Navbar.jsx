"use client";

import { useGetSingleUserQuery } from "@/redux/api/apiSlice";
import routeData from "@/temp-data/route-data/routeData";
import { getUserInfo } from "@/ults/getUserInfo";
import Cookies from "js-cookie";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import i18next from "i18next";
import { useTranslation } from "react-i18next";
import NavLink from "../NavLink/NavLink";

const Navbar = ({ currentLanguageCode, languages }) => {
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const home = usePathname() === "/";
  const [scrollY, setScrollY] = useState(0);
  const { t } = useTranslation();

  const { email, token } = getUserInfo();

  const { data } = useGetSingleUserQuery({ email, token });
  const user = data?.data;

  const handleScroll = () => {
    setScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  // toggle menu
  const handleToggleMenu = () => {
    setMenuIsOpen(!menuIsOpen);
  };

  return (
    <div
      className={`py-1 sm:py-3.5  ${scrollY > 150 && "sticky top-0 backdrop-blur-2xl z-[100] "
        }   ${home
          ? scrollY < 150 &&
          "bg-transparent absolute top-1.5 sm:top-2.5 w-full z-[100] "
          : scrollY < 150 && "bg-gray-50  "
        }`}
    >
      <div className="max-width flex items-center justify-between">
        {/* menu bar */}
        <div className="md:hidden">
          <button onClick={handleToggleMenu}>
            {menuIsOpen ? (
              <FaTimes className="text-secondary text-xl" />
            ) : (
              <FaBars className="text-secondary text-xl" />
            )}
          </button>
        </div>
        {/* backdrop container */}
        <button
          onClick={handleToggleMenu}
          className={`${menuIsOpen
            ? "fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 md:hidden z-50"
            : "hidden"
            }`}
        ></button>
        {/* logo here */}
        <Link href={"/"}>
          <Image
            src={"https://i.ibb.co/D95SHdG/PC-HUB.png"}
            alt="logo"
            width={300}
            height={48}
            className="w-full h-full max-h-[48px] max-w-[300px]"
          ></Image>
        </Link>
        {/* nav */}
        <ul
          className={`${menuIsOpen
            ? "fixed z-[51] duration-300 py-5 md:py-0 transition-all md:relative top-0  md:bg-transparent h-screen md:h-auto w-[180px] md:w-fit left-0 bg-white "
            : "hidden"
            } md:flex text-primary  text-sm font-medium`}
        >
          {routeData?.map(({ path, title }) => (
            <li
              onClick={handleToggleMenu}
              key={path}
              className="px-3 py-2 mx-2 hover:text-accent cursor-pointer font-medium text-base"
            >
              <NavLink
                exact={path === "/"}
                activeClassName="text-accent "
                href={path}
              >
                {title}
              </NavLink>
            </li>
          ))}
          {user?.email && user?.role == "user" && (
            <li className="px-3 py-2 mx-2 hover:text-accent cursor-pointer font-medium text-base">
              <NavLink activeClassName="text-accent " href={"/my-profile"}>
                My Profile
              </NavLink>
            </li>
          )}
          {((user?.email && user?.role == "instructor") ||
            user?.role == "super_admin" ||
            user?.role == "student") && (
              <li
                onClick={handleToggleMenu}
                className="px-3 py-2 mx-2 hover:text-accent cursor-pointer font-medium text-base"
              >
                <NavLink
                  activeClassName="text-accent"
                  href={
                    user?.role == "instructor" || user?.role == "super_admin"
                      ? "/admin/dashboard"
                      : "/user/dashboard"
                  }
                >
                  Dashboard
                </NavLink>
              </li>
            )}
        </ul>

        {/* <div className="dropdown dropdown-end p-0 hidden md:block">
          <label tabIndex={0} className="btn bg-transparent outline-none border-none text-white focus:bg-transparent hover:bg-transparent btn-sm"><span className={`fi ${(currentLanguageCode === "bn" && "fi-bd") || (currentLanguageCode === "en" && "fi-us")}`}></span><span className="pl-1 text-black">{(currentLanguageCode === "bn" && "Bangla") || (currentLanguageCode === "en" && "English")}</span></label>
          <ul tabIndex={0} className="dropdown-content text-sm z-[1] menu p-1 shadow bg-base-100 rounded">
            {languages?.map(({ code, name, flag }) => (
              <li className='p-1' key={code} >
                <button className={`${code === currentLanguageCode && 'bg-primary text-white'} p-2 text-black`} onClick={() => { i18next.changeLanguage(code) }}
                  disabled={code === currentLanguageCode} > <span className={`fi fi-${flag}`}></span>{name}
                </button>
              </li>
            ))}
          </ul>
        </div> */}

        <div className="w-fit h-fit hidden md:inline-block">
          {user?.email ? (
            <div onClick={() => signOut(Cookies.remove("accessToken"))}>
              <div className="px-5 lg:px-8 py-1.5 font-semibold text-white rounded-md bg-gradient-to-r from-primary via-secondary to-accent  hover:from-accent hover:to-primary duration-300 transition-all cursor-pointer">
                Logout
              </div>
            </div>
          ) : (
            <Link href="/signin">
              <div className="px-5 lg:px-8 py-1.5 font-semibold text-white rounded-md bg-gradient-to-r from-primary via-secondary to-accent  hover:from-accent hover:to-primary duration-300 transition-all cursor-pointer">
                Login
              </div>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
