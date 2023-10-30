"use client";
import Spinner from "@/components/global/spinner/Spinner";
import { useGetSingleUserQuery } from "@/redux/api/apiSlice";
import { getUserInfo } from "@/ults/getUserInfo";
import React from "react";
import Swal from "sweetalert2";

const imgUploadToken = process.env.NEXT_PUBLIC_IMG_HOSTING_KEY;

const ProfilePanel = () => {

  const { email, token } = getUserInfo();
  const { data, isLoading, refetch } = useGetSingleUserQuery({email, token});
  if (isLoading) return <div className="mt-14 flex w-full items-center justify-center"><Spinner /></div>;
  const user = data?.data;

  // handle update profile
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    let { image , ...all} = data;
    if (image.name !== "") {
      const img_hosting_url = `https://api.imgbb.com/1/upload?key=${imgUploadToken}`;
      const formData = new FormData();
      formData.append("image", image);
      await fetch(img_hosting_url, {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.status === 200) {
            image = res.data.display_url;
          }
        });
    }
    const updatedData = {
      ...all,
      profileImg: image.name === "" ? user?.profileImg : image,
    }
    const res = await fetch(`https://lms-server-sigma.vercel.app/api/v1/users/${user?._id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
      body: JSON.stringify(updatedData),
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
  };
  return (
    <form className="mt-5 md:mt-7 lg:mt-10" onSubmit={handleUpdateProfile}>
      <div className="grid grid-cols-1 gap-6 mt-3 sm:grid-cols-2">
        <div>
          <label className="text-dark font-medium" htmlFor="name">
            Name
          </label>
          <input
            id="name"
            type="text"
            name="name"
            defaultValue={user?.name}
            className="block w-full px-3 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded  focus:border-secondary  focus:outline-none"
          />
        </div>
        <div>
          <label className="text-dark font-medium" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            name="email"
            value={user?.email}
            className="block w-full px-3 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded  focus:border-secondary  focus:outline-none"
            readOnly
          />
        </div>
        <div>
          <label className="text-dark font-medium" htmlFor="phone">
            Phone
          </label>
          <input
            id="phone"
            type="text"
            name="phoneNumber"
            defaultValue={user?.phoneNumber}
            className="block w-full px-3 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded  focus:border-secondary  focus:outline-none"
          />
        </div>
        <div>
          <label className="text-dark font-medium" htmlFor="image">
            Photo
          </label>
          <input
            id="image"
            type="file"
            name="image"
            className="block w-full px-3 py-1.5 mt-2 text-gray-700 bg-white border border-gray-300 rounded  focus:border-secondary  focus:outline-none"
          />
        </div>
        <div>
          <label className="text-dark font-medium" htmlFor="address">
            Address
          </label>
          <input
            id="address"
            type="text"
            name="address"
            defaultValue={user?.address}
            className="block w-full px-3 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded  focus:border-secondary  focus:outline-none"
          />
        </div>
        <div>
          <label className="text-dark font-medium" htmlFor="skills">
            Skills/Occupation
          </label>
          <input
            id="skills"
            type="text"
            name="skill"
            defaultValue={user?.skill}
            className="block w-full px-3 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded  focus:border-secondary  focus:outline-none"
          />
        </div>
        <div>
          <label className="text-dark font-medium" htmlFor="gender">
            Gender
          </label>
          <select
            name="gender"
            id="gender"
            className="block w-full px-3 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded  focus:border-secondary  focus:outline-none"
          >
            <option selected disabled>
              Select
            </option>
            <option value="Male" selected={user?.gender === "Male"}>Male</option>
            <option value="Female" selected={user?.gender === "Female"}>Female</option>
            <option value="Others" selected={user?.gender === "Others"}>Others</option>
          </select>
        </div>
        <div>
          <label className="text-dark font-medium" htmlFor="age-range">
            Age Range
          </label>
          <select
            name="age"
            id="age-range"
            className="block w-full px-3 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded  focus:border-secondary  focus:outline-none"
          >
            <option selected disabled>
              Select
            </option>
            <option value="10-15" selected={user?.age === "10-15"}>10-15</option>
            <option value="15-20" selected={user?.age === "15-20"}>15-20</option>
            <option value="20-25" selected={user?.age === "20-25"}>20-25</option>
            <option value="25-30" selected={user?.age === "25-30"}>25-30</option>
            <option value="30+" selected={user?.age === "30+"}>30+</option>
          </select>
        </div>
        <div className="sm:col-start-1 sm:col-end-3">
          <label className="text-dark font-medium" htmlFor="bio">
            Bio
          </label>
          <textarea
            id="bio"
            type="text"
            name="bio"
            defaultValue={user?.bio}
            rows={7}
            className="block w-full px-3 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded  focus:border-secondary  focus:outline-none"
          />
        </div>
      </div>

      <div className="flex justify-end mt-12">
        <button
          type="submit"
          className="px-6 py-3 leading-5 text-white transition-colors duration-200 transform bg-secondary rounded hover:bg-accent font-medium focus:outline-none "
        >
          Update Info
        </button>
      </div>
    </form>
  );
};

export default ProfilePanel;
