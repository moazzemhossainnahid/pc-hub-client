"use client";
import Spinner from "@/components/global/spinner/Spinner";
import { useGetSingleUserQuery } from "@/redux/api/apiSlice";
import { getUserInfo } from "@/ults/getUserInfo";
import React from "react";
import Swal from "sweetalert2";

const PasswordPanel = () => {
  const { email, token } = getUserInfo();
  const { data, isLoading, refetch } = useGetSingleUserQuery({ email, token });
  if (isLoading) return <Spinner />;
  const user = data?.data;
  const handleSubmit = async (e) => {
    e.preventDefault();
    const currentPassword = e.target.currentPassword.value;
    const newPassword = e.target.newPassword.value;
    const reTypePass = e.target.reTypePass.value;
    if (newPassword !== reTypePass) {
      Swal.fire({
        icon: "error",
        title: "Password does not match",
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }
    // password validation min 8 char, 1 uppercase, 1 lowercase, 1 number, 1 special char
    const passwordRegex =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;
    if (!passwordRegex.test(newPassword)) {
      Swal.fire({
        icon: "error",
        title:
          "Password must contain min 8 char, 1 uppercase, 1 lowercase, 1 number, 1 special char",
        showConfirmButton: true,
      });
      return;
    }
    const res = await fetch(
      `https://lms-server-sigma.vercel.app/api/v1/users/password-change/${user?._id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        body: JSON.stringify({ oldPassword: currentPassword, newPassword }),
      }
    );
    const data = await res.json();
    if (data.success) {
      Swal.fire({
        icon: "success",
        title: "Password changed successfully",
        showConfirmButton: false,
        timer: 1500,
      });
      e.target.reset();
      refetch();
      return;
    }
    if (data.message === "Password does not match.") {
      Swal.fire({
        icon: "error",
        title: "Current password does not match",
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }
    Swal.fire({
      icon: "error",
      title: "Password change failed",
      showConfirmButton: false,
      timer: 1500,
    });
  };
  return (
    <form className="mt-5 md:mt-7 lg:mt-10" onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 gap-6 mt-3">
        <div>
          <label className="text-dark font-medium" htmlFor="currentPassword">
            Current Password
          </label>
          <input
            id="currentPassword"
            type="password"
            name="currentPassword"
            placeholder="Current Password"
            className="block w-full px-3 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded  focus:border-secondary  focus:outline-none"
          />
        </div>
        <div>
          <label className="text-dark font-medium" htmlFor="newPassword">
            New Password
          </label>
          <input
            id="newPassword"
            type="password"
            name="newPassword"
            className="block w-full px-3 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded  focus:border-secondary  focus:outline-none"
            placeholder="New Password"
          />
        </div>
        <div>
          <label className="text-dark font-medium" htmlFor="reTypePass">
            Re-type Password
          </label>
          <input
            id="reTypePass"
            type="password"
            name="reTypePass"
            placeholder="Re-type Password"
            className="block w-full px-3 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded  focus:border-secondary  focus:outline-none"
          />
        </div>
      </div>

      <div className="flex justify-end mt-12">
        <button
          type="submit"
          className="px-6 py-3 leading-5 text-white transition-colors duration-200 transform bg-secondary rounded hover:bg-accent font-medium focus:outline-none"
        >
          Update Password
        </button>
      </div>
    </form>
  );
};

export default PasswordPanel;
