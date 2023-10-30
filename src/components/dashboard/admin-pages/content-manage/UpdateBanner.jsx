"use client";
import { useGetBannerDataQuery } from "@/redux/api/apiSlice";
import React from "react";
import Swal from "sweetalert2";

const UpdateBanner = ({token}) => {
  const { data, isLoading, refetch } = useGetBannerDataQuery({ token });
  if (isLoading) return <div>Loading...</div>;
  const { bannerTitle, bannerVideo, description, _id } = data?.data[0];
  const handleUpdateBanner = async (e) => {
    e.preventDefault();
    const bannerTitle = e.target.bannerTitle.value;
    const bannerVideo = e.target.bannerVideo.value;
    const description = e.target.description.value;
    const homeBanner = {
      bannerTitle,
      bannerVideo,
      description,
    };
    const res = await fetch(
      `https://lms-server-sigma.vercel.app/api/v1/home-banners/${_id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        body: JSON.stringify(homeBanner),
      }
    );
    const data = await res.json();
    if (data.success) {
      Swal.fire({
        icon: "success",
        title: "Banner Updated Successfully",
        showConfirmButton: false,
        timer: 1500,
      })
      refetch();
      e.target.reset();
    }
    else{
      Swal.fire({
        icon: "error",
        title: "Banner Update Failed",
        showConfirmButton: false,
        timer: 1500,
      })
    }
  };
  return (
    <form onSubmit={handleUpdateBanner}>
      <h1 className="text-base md:text-lg font-semibold border-b pb-1 text-primary">
        Update Banner
      </h1>
      <p className="mt-3">
        <span className=" font-semibold">Current Title: </span>
        {bannerTitle}
      </p>
      <div className="mt-2">
        <label className="text-dark font-medium" htmlFor="bannerTitle">
          Update Title
        </label>
        <input
          id="bannerTitle"
          type="text"
          name="bannerTitle"
          placeholder="Enter New Title"
          defaultValue={bannerTitle}
          className="block w-full px-3 py-2 mt-1 text-gray-700 bg-white border border-gray-300 rounded  focus:border-secondary  focus:outline-none"
        />
      </div>
      <p className="mt-5">
        <span className=" font-semibold">Current Description: </span>
        {description}
      </p>
      <div className="mt-2">
        <label className="text-dark font-medium" htmlFor="description">
          Update Description
        </label>
        <input
          id="description"
          type="text"
          name="description"
          placeholder="Type New Description"
          defaultValue={description}
          className="block w-full px-3 py-2 mt-1 text-gray-700 bg-white border border-gray-300 rounded  focus:border-secondary  focus:outline-none"
        />
      </div>
      <p className="mt-5">
        <span className=" font-semibold">Current Banner Video Link: </span>
        {bannerVideo}
      </p>
      <div className="mt-2">
        <label className="text-dark font-medium" htmlFor="bannerVideo">
          Update Video Link (Embed)
        </label>
        <input
          id="bannerVideo"
          type="text"
          name="bannerVideo"
          placeholder="Enter New Video Link"
          defaultValue={bannerVideo}
          className="block w-full px-3 py-2 mt-1 text-gray-700 bg-white border border-gray-300 rounded  focus:border-secondary  focus:outline-none"
        />
      </div>
      <div className="w-full flex items-center justify-end mt-5">
        <button className="px-6 py-3 leading-5 text-white transition-colors duration-200 transform bg-secondary rounded hover:bg-accent font-medium focus:outline-none">
          Update Banner
        </button>
      </div>
    </form>
  );
};

export default UpdateBanner;
