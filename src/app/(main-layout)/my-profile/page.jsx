"use client";
import Spinner from "@/components/global/spinner/Spinner";
import { useGetSingleUserQuery } from "@/redux/api/apiSlice";
import { getUserInfo } from "@/ults/getUserInfo";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";
import { BsPencilSquare } from "react-icons/bs";
import Swal from "sweetalert2";

const MyProfilePage = () => {
  const { email, token } = getUserInfo();
  const { data, isLoading } = useGetSingleUserQuery({ email, token });
  if (isLoading) {
    return (
      <div className="w-full h-[90vh] flex items-center justify-center">
        <Spinner />
      </div>
    );
  }
  if (!email || !token) {
    Swal.fire({
      icon: "info",
      title: "You are not authorized!",
      showConfirmButton: false,
      timer: 1500,
    });
    return redirect("/login");
  }
  const user = data?.data;

  return (
    <div className="max-width mt-14 lg:mt-20">
      <div className="w-full h-full bg-gray-50 rounded-md px-5 py-4 md:px-6 md:py-5">
        <div className="w-fit h-fit flex items-center gap-3 mx-auto">
          <h1 className="text-xl lg:text-2xl font-semibold text-center text-secondary capitalize">
            My Profile
          </h1>
          <Link href={"/my-profile/update"}>
            <BsPencilSquare className="text-xl text-gray-600 hover:text-secondary" />
          </Link>
        </div>
        <div className="mt-5 w-full relative ">
          <div className="flex w-full justify-center my-2">
            <Image
              src={
                user?.profileImg ||
                "https://i.ibb.co/VJ0rnsr/default-avatar-profile-icon-of-social-media-user-vector.jpg"
              }
              alt="profileImg"
              width={150}
              height={150}
              className="w-[150px] h-[150px] border"
            ></Image>
          </div>
          <div className="py-5 w-full grid grid-cols-2 justify-items-center">
            <div className="space-y-4">
              <h1 className=" text-gray-600 font-semibold">Full Name </h1>
              <h1 className=" text-gray-500">Email </h1>
              <h1 className=" text-gray-500">Registration Date </h1>
              <h1 className=" text-gray-500">UserId </h1>
              <h1 className=" text-gray-500">Role </h1>
              <h1 className=" text-gray-500">Phone Number </h1>
              <h1 className=" text-gray-500">Skill/Occupation </h1>
              <h1 className=" text-gray-500">Age Range </h1>
              <h1 className=" text-gray-500">Address </h1>
              <h1 className=" text-gray-500">Biography </h1>
            </div>
            <div className="space-y-4">
              <h1 className=" text-gray-600 font-semibold">
                {user?.name || "N/A"}{" "}
              </h1>
              <h1 className=" text-gray-500">
                {user?.email || "N/A"}{" "}
                {user?.emailVerified && (
                  <span className="text-xs font-normal text-green-600 bg-green-200 px-1.5 rounded-full py-0.5">
                    Verified
                  </span>
                )}
              </h1>
              <h1 className=" text-gray-500">
                {new Date(user?.createdAt).toLocaleString() || "N/A"}
              </h1>
              <h1 className=" text-gray-500">{user?._id || "N/A"} </h1>
              <h1 className=" text-gray-500">{user?.role || "N/A"} </h1>

              <h1 className=" text-gray-500">{user?.phoneNumber || "N/A"} </h1>
              <h1 className=" text-gray-500">{user?.skill || "N/A"} </h1>
              <h1 className=" text-gray-500">{user?.age || "N/A"} </h1>
              <h1 className=" text-gray-500">{user?.address || "N/A"} </h1>
              <h1 className=" text-gray-500">{user?.bio || "N/A"} </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfilePage;
