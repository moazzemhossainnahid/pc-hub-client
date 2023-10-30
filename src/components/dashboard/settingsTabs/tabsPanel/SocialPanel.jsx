"use client";
import Spinner from "@/components/common/loader/SmallSpinner";
import { useGetSingleUserQuery } from "@/redux/api/apiSlice";
import { getUserInfo } from "@/ults/getUserInfo";
import Cookies from "js-cookie";
import React from "react";
import Swal from "sweetalert2";

const SocialPanel = () => {
  const { email, token } = getUserInfo();
  const { data, isLoading, refetch } = useGetSingleUserQuery({ email, token });
  if (isLoading) return <Spinner />;
  const user = data?.data;

  // handle social update
  const handleSocialUpdate = async(e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    const res = await fetch(`https://lms-server-sigma.vercel.app/api/v1/users/${user?._id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
      body: JSON.stringify({socialAcc: data}),
    });
    const result = await res.json();
    if (result.success) {
      Swal.fire({
        icon: "success",
        title: "Profile Updated Successfully",
        showConfirmButton: false,
        timer: 1500,
      });
      refetch();
      e.target.reset();
    }
    else{
      Swal.fire({
        icon: "error",
        title: "Profile Update Failed",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  }
  return (
    <form className="mt-5 md:mt-7 lg:mt-10" onSubmit={handleSocialUpdate}>
      <div className="grid grid-cols-1 gap-6 mt-3">
        <div>
          <label className="text-dark font-medium" htmlFor="fb">
            Facebook
          </label>
          <input
            id="fb"
            type="text"
            name="facebook"
            defaultValue={user?.socialAcc?.facebook}
            placeholder="Facebook url"
            className="block w-full px-3 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded  focus:border-secondary  focus:outline-none"
          />
        </div>
        <div>
          <label className="text-dark font-medium" htmlFor="twitter">
            Twitter
          </label>
          <input
            id="twitter"
            type="text"
            name="twitter"
            defaultValue={user?.socialAcc?.twitter}
            className="block w-full px-3 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded  focus:border-secondary  focus:outline-none"
            placeholder="Twitter url"
          />
        </div>
        <div>
          <label className="text-dark font-medium" htmlFor="linkedIn">
            LinkedIn
          </label>
          <input
            id="linkedIn"
            type="text"
            name="linkedIn"
            defaultValue={user?.socialAcc?.linkedIn}
            placeholder="LinkedIn url"
            className="block w-full px-3 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded  focus:border-secondary  focus:outline-none"
          />
        </div>
        <div>
          <label className="text-dark font-medium" htmlFor="website">
            Website
          </label>
          <input
            id="website"
            type="text"
            name="website"
            defaultValue={user?.socialAcc?.website}
            placeholder="Website url"
            className="block w-full px-3 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded  focus:border-secondary  focus:outline-none"
          />
        </div>
      </div>

      <div className="flex justify-end mt-12">
        <button
          type="submit"
          className="px-6 py-3 leading-5 text-white transition-colors duration-200 transform bg-secondary rounded hover:bg-accent font-medium focus:outline-none "
        >
          Update Profile
        </button>
      </div>
    </form>
  );
};

export default SocialPanel;
