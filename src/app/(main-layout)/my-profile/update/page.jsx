"use client";
import SettingsTabs from "@/components/dashboard/settingsTabs/SettingsTabs";
import { getUserInfo } from "@/ults/getUserInfo";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";
import { BsArrowLeftCircle } from "react-icons/bs";
import Swal from "sweetalert2";

const ProfileUpdatePage = () => {
  const { email, token } = getUserInfo();
  if (!email || !token) {
    Swal.fire({
      icon: "info",
      title: "You are not authorized!",
      showConfirmButton: false,
      timer: 1500,
    });
    return redirect("/login");
  }
  return (
    <div className="h-full rounded-md  max-width my-14 ">
      <div className="px-5 py-4 md:px-6 md:py-5 bg-gray-50 p-5 rounded-md">
        <div className="w-full border-b pt-1 pb-2 text-xl lg:text-2xl font-semibold text-primary justify-between flex items-center">
          <Link href={"/my-profile"}>
            <div className="flex items-center w-fit h-fit gap-2 text-base">
              <BsArrowLeftCircle /> Back
            </div>
          </Link>
          <h1>Update Profile</h1>
          <div className=""></div>
        </div>
        <SettingsTabs></SettingsTabs>
      </div>
    </div>
  );
};

export default ProfileUpdatePage;
