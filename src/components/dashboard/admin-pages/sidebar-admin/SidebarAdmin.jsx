"use client";
import NavLink from "@/components/navLinks/NavLink";
import Cookies from "js-cookie";
import { signOut } from "next-auth/react";
import Link from "next/link";
import React from "react";
import { BsHouseDoor, BsPower } from "react-icons/bs";

const SidebarAdmin = ({ user, routes }) => {
  return (
    <div className="md:max-w-[240px] lg:max-w-[250px] xl:min-w-[300px] xl:max-w-[300px] w-full h-auto rounded-md border-2 border-opacity-70 border-secondary p-5">
      <h1 className="text-sm font-semibold text-gray-500">
        Welcome, {user?.name}
      </h1>
      <div className="mt-3 w-full h-full space-y-2.5">
        {routes.map(({ path, title, icon }) => (
          <div
            key={path}
            className=" cursor-pointer rounded overflow-hidden border-b"
          >
            <NavLink
              exact={path === "/admin/dashboard"}
              activeClassName="text-primary bg-secondary  bg-opacity-10"
              href={path}
              className="flex items-center gap-2 px-3 py-2 font-medium text-gray-600"
            >
              {icon} {title}
            </NavLink>
          </div>
        ))}
        {(user?.role === "instructor" || user?.role === "super_admin") && (
            <Link href={"/"}>
            <button className="w-full cursor-pointer rounded overflow-hidden border-b mt-1.5">
              <div className="flex items-center gap-2 px-3 py-2 font-medium text-gray-600">
                <BsHouseDoor /> Home
              </div>
            </button>
            </Link>
          )}
        {(user?.role === "instructor" || user?.role === "super_admin") && (
            <button onClick={() => signOut(Cookies.remove("accessToken"))} className="w-full cursor-pointer rounded overflow-hidden border-b">
              <div className="flex items-center gap-2 px-3 py-2 font-medium text-gray-600">
                <BsPower /> Logout
              </div>
            </button>
          )}
      </div>
    </div>
  );
};

export default SidebarAdmin;
