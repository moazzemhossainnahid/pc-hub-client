"use client";
import { useRouter } from "next/navigation";
import React from "react";
import Swal from "sweetalert2";

const LiveClassInfoUpdate = ({ liveClass, refetch, token }) => {
  const router = useRouter();
  console.log(liveClass);
  const handleUpdateClass = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    const { price, discountPrice, whatWillYouLearnField, ...all } = data;
    const whatWillYouLearn = whatWillYouLearnField.split(",");
    const updatedData = {
      ...all,
      price: parseFloat(price),
      discountPrice: parseFloat(discountPrice),
      whatWillYouLearn,
      _id: liveClass?._id,
      __v: liveClass?.__v,
      files: liveClass?.files,
      instructor: liveClass?.instructor,
      createdAt: liveClass?.createdAt,
      updatedAt: liveClass?.updatedAt,
      id: liveClass?.id,
    };
    console.log(updatedData);
    const res = await fetch(
      `https://lms-server-sigma.vercel.app/api/v1/live-courses/${liveClass?._id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        body: JSON.stringify(updatedData),
      }
    );
    const result = await res.json();
    console.log(result);
    if (result.success) {
      Swal.fire({
        title: "Success!",
        text: "Class Updated Successfully",
        icon: "success",
        showConfirmButton: false,
        timer: 1500,
      });
      refetch();
      router.push("/admin/live-classes");
    } else {
      Swal.fire({
        title: "Error!",
        text: "Something went wrong",
        icon: "error",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };
  return (
    <div className="w-full mt-8">
      <form onSubmit={handleUpdateClass}>
        <div className="grid grid-cols-1 gap-6 mt-3 sm:grid-cols-2">
          <div>
            <label className="text-dark font-medium" htmlFor="title">
              Title
            </label>
            <input
              id="title"
              type="text"
              name="title"
              className="block w-full px-3 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded  focus:border-secondary  focus:outline-none"
              defaultValue={liveClass?.title}
            />
          </div>
          <div>
            <label className="text-dark font-medium" htmlFor="month">
              Estimate Months
            </label>
            <input
              id="month"
              type="text"
              name="estimatedMonths"
              className="block w-full px-3 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded  focus:border-secondary  focus:outline-none"
              defaultValue={liveClass?.estimatedMonths}
            />
          </div>
          <div>
            <label className="text-dark font-medium" htmlFor="liveSupport">
              Live Support
            </label>
            <input
              id="liveSupport"
              type="text"
              name="liveSupport"
              className="block w-full px-3 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded  focus:border-secondary  focus:outline-none"
              defaultValue={liveClass?.liveSupport}
            />
          </div>
          <div>
            <label
              className="text-dark font-medium"
              htmlFor="estimateLiveClass"
            >
              Estimate Live Class
            </label>
            <input
              id="estimateLiveClass"
              type="text"
              name="estimateLiveClass"
              className="block w-full px-3 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded  focus:border-secondary  focus:outline-none"
              defaultValue={liveClass?.estimateLiveClass}
            />
          </div>
          <div>
            <label className="text-dark font-medium" htmlFor="hours">
              Hours
            </label>
            <input
              id="hours"
              type="text"
              name="hours"
              className="block w-full px-3 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded  focus:border-secondary  focus:outline-none"
              defaultValue={liveClass?.hours}
            />
          </div>
          <div>
            <label className="text-dark font-medium" htmlFor="classDays">
              Class Days
            </label>
            <input
              id="classDays"
              type="text"
              name="classDays"
              className="block w-full px-3 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded  focus:border-secondary  focus:outline-none"
              defaultValue={liveClass?.classDays}
            />
          </div>
          <div>
            <label className="text-dark font-medium" htmlFor="liveSupportTime">
              Live Support Time
            </label>
            <input
              id="liveSupportTime"
              type="text"
              name="liveSupportTime"
              className="block w-full px-3 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded  focus:border-secondary  focus:outline-none"
              defaultValue={liveClass?.liveSupportTime}
            />
          </div>
          <div>
            <label className="text-dark font-medium" htmlFor="introVideo">
              Intro Video Url (embeded)
            </label>
            <input
              id="introVideo"
              type="text"
              name="introVideoUrl"
              className="block w-full px-3 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded  focus:border-secondary  focus:outline-none"
              defaultValue={liveClass?.introVideoUrl}
            />
          </div>
          <div className="flex items-center w-full justify-between gap-5">
            <div className="w-full">
              <label className="text-dark font-medium" htmlFor="price">
                Price (BDT)
              </label>
              <input
                id="price"
                type="number"
                name="price"
                className="block w-full px-3 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded  focus:border-secondary  focus:outline-none"
                defaultValue={liveClass?.price}
              />
            </div>
            <div className="w-full">
              <label className="text-dark font-medium" htmlFor="discountPrice">
                Discount (Optional)
              </label>
              <input
                id="discountPrice"
                type="number"
                name="discountPrice"
                className="block w-full px-3 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded  focus:border-secondary  focus:outline-none"
                defaultValue={liveClass?.discountPrice}
              />
            </div>
          </div>
          <div>
            <label
              className="text-dark font-medium"
              htmlFor="paymentConditions"
            >
              Payment Conditions
            </label>
            <textarea
              id="paymentConditions"
              type="text"
              name="paymentConditions"
              className="block w-full px-3 h-full mt-2  py-2  text-gray-700 bg-white border border-gray-300 rounded  focus:border-secondary  focus:outline-none"
              defaultValue={liveClass?.paymentConditions}
            />
          </div>
          <div className="mt-4">
            <label
              className="text-dark font-medium"
              htmlFor="whatWillYouLearnField"
            >
              What They&apos;ll Learn (Write points with comma (,)){" "}
            </label>
            <textarea
              id="whatWillYouLearn"
              type="textarea"
              name="whatWillYouLearnField"
              className="block w-full px-3 h-full  py-2  text-gray-700 bg-white border border-gray-300 rounded  focus:border-secondary  focus:outline-none"
              defaultValue={liveClass?.whatWillYouLearn?.join(",")}
            ></textarea>
          </div>
          <div className="mt-4">
            <label className="text-dark font-medium" htmlFor="title">
              Description
            </label>
            <textarea
              id="textarea"
              type="textarea"
              name="description"
              className="block w-full px-3 h-full  py-2  text-gray-700 bg-white border border-gray-300 rounded  focus:border-secondary  focus:outline-none"
              defaultValue={liveClass?.description}
            ></textarea>
          </div>
        </div>
        <div className="w-full flex items-center justify-end mt-12">
          <button
            type="submit"
            className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-secondary rounded hover:bg-accent font-medium focus:outline-none "
          >
            Update Class
          </button>
        </div>
      </form>
    </div>
  );
};

export default LiveClassInfoUpdate;
