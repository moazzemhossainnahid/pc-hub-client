"use client";
import {
  useGetAllLiveClassesQuery,
  useGetSingleUserQuery,
} from "@/redux/api/apiSlice";
import { getUserInfo } from "@/ults/getUserInfo";
import React, { useState } from "react";
import Swal from "sweetalert2";
import LiveClassAddContent from "./LiveClassContentAdd";
import { set } from "react-hook-form";

const imgUploadToken = process.env.NEXT_PUBLIC_IMG_HOSTING_KEY;

const LiveClassAddForm = () => {
  const [classInfo, setClassInfo] = useState({});
  const [addClassInfoOpen, setAddClassInfoOpen] = useState(true);
  const [classInfoAddPending, setClassInfoAddPending] = useState(false);
  const { email, token } = getUserInfo();
  const { data, isLoading } = useGetSingleUserQuery({ email, token });
  const { refetch } = useGetAllLiveClassesQuery({ token });
  if (isLoading) return <div>Loading...</div>;
  const user = data?.data;
  //  handle submit
  const handleAddClassInfo = async (e) => {
    e.preventDefault();
    setClassInfoAddPending(true);
    const form = new FormData(e.target);
    const data = Object.fromEntries(form);
    data.instructor = user?._id;
    const { price, discountPrice, whatWillYouLearnField, thumbnail } = data;
    const whatWillYouLearn = whatWillYouLearnField.split(",");
    data.price = parseFloat(price);
    data.discountPrice = parseFloat(discountPrice) || 0;
    data.whatWillYouLearn = whatWillYouLearn;
    delete data.whatWillYouLearnField;
    const img_hosting_url = `https://api.imgbb.com/1/upload?key=${imgUploadToken}`;
    const formData = new FormData();
    formData.append("image", thumbnail);
    fetch(img_hosting_url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          data.thumbnail = res.data.display_url;
          setClassInfo(data);
          setAddClassInfoOpen(false);
          setClassInfoAddPending(false);
          e.target.reset();
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
          });
          setClassInfoAddPending(false);
        }
      });
    return;
  };
  // handle add class submit
  const handleAddClassSubmit = async (lessons) => {
    setClassInfoAddPending(true);
    const data = {
      ...classInfo,
      files: lessons,
    };
    const res = await fetch(
      "https://lms-server-sigma.vercel.app/api/v1/live-courses/addLiveCourse",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      }
    );
    const result = await res.json();
    if (result.success) {
      Swal.fire({
        icon: "success",
        title: "Class added successfully",
        showConfirmButton: false,
        timer: 1500,
      });
      setClassInfoAddPending(false);
      setAddClassInfoOpen(true);
      setClassInfo({});
      refetch();
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
      setClassInfoAddPending(false);
    }
  };
  return (
    <>
      {addClassInfoOpen && (
        <form onSubmit={handleAddClassInfo}>
          <div className="grid grid-cols-1 gap-6 mt-3 sm:grid-cols-2">
            <div>
              <label className="text-dark font-medium" htmlFor="title">
                Title <span className="text-red-500">*</span>
              </label>
              <input
                id="title"
                type="text"
                name="title"
                placeholder="Ex: Digital Marketing Course"
                className="block w-full px-3 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded  focus:border-secondary  focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="text-dark font-medium" htmlFor="month">
                Estimate Months <span className="text-red-500">*</span>
              </label>
              <input
                id="month"
                type="text"
                name="estimatedMonths"
                placeholder="6+"
                className="block w-full px-3 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded  focus:border-secondary  focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="text-dark font-medium" htmlFor="liveSupport">
                Live Support <span className="text-red-500">*</span>
              </label>
              <input
                id="liveSupport"
                type="text"
                name="liveSupport"
                placeholder="1 year"
                className="block w-full px-3 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded  focus:border-secondary  focus:outline-none"
                required
              />
            </div>
            <div>
              <label
                className="text-dark font-medium"
                htmlFor="estimateLiveClass"
              >
                Estimate Live Class <span className="text-red-500">*</span>
              </label>
              <input
                id="estimateLiveClass"
                type="text"
                name="estimateLiveClass"
                placeholder="48+"
                className="block w-full px-3 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded  focus:border-secondary  focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="text-dark font-medium" htmlFor="hours">
                Hours <span className="text-red-500">*</span>
              </label>
              <input
                id="hours"
                type="text"
                name="hours"
                placeholder="100+"
                className="block w-full px-3 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded  focus:border-secondary  focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="text-dark font-medium" htmlFor="classDays">
                Class Days <span className="text-red-500">*</span>
              </label>
              <input
                id="classDays"
                type="text"
                name="classDays"
                placeholder="Sunday, Tuesday, Thursday"
                className="block w-full px-3 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded  focus:border-secondary  focus:outline-none"
                required
              />
            </div>
            <div>
              <label
                className="text-dark font-medium"
                htmlFor="liveSupportTime"
              >
                Live Support Time <span className="text-red-500">*</span>
              </label>
              <input
                id="liveSupportTime"
                type="text"
                name="liveSupportTime"
                placeholder="সকাল ৯ টা থেকে সন্ধ্যা ৬ টা (শুক্রবার ও গভঃ ছুটিরদিন ব্যাতিত)"
                className="block w-full px-3 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded  focus:border-secondary  focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="text-dark font-medium" htmlFor="introVideo">
                Intro Video Url (embeded){" "}
                <span className="text-red-500">*</span>
              </label>
              <input
                id="introVideo"
                type="text"
                name="introVideoUrl"
                placeholder="Url here..."
                className="block w-full px-3 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded  focus:border-secondary  focus:outline-none"
                required
              />
            </div>
            <div className="flex items-center w-full justify-between gap-5">
              <div className="w-full">
                <label className="text-dark font-medium" htmlFor="price">
                  Price (BDT) <span className="text-red-500">*</span>
                </label>
                <input
                  id="price"
                  type="number"
                  name="price"
                  placeholder="Ex: 5500"
                  className="block w-full px-3 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded  focus:border-secondary  focus:outline-none"
                  required
                />
              </div>
              <div className="w-full">
                <label
                  className="text-dark font-medium"
                  htmlFor="discountPrice"
                >
                  Discount (Optional)
                </label>
                <input
                  id="discountPrice"
                  type="number"
                  name="discountPrice"
                  placeholder="Ex: 5500"
                  className="block w-full px-3 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded  focus:border-secondary  focus:outline-none"
                />
              </div>
            </div>
            <div>
              <label
                className="text-dark font-medium"
                htmlFor="paymentConditions"
              >
                Payment Conditions <span className="text-red-500">*</span>
              </label>
              <textarea
                id="paymentConditions"
                type="text"
                name="paymentConditions"
                placeholder="খরচ ১৫,০০০ টাকা যদি একবারে পেমেন্ট করে অথবা চাইলে মাসিকভাবে পেমেন্ট দিতে পারবে। সেই ক্ষেত্রে মাসিক ৩০০০ টাকা এবং ৬ মাসে দিতে হবে ১৮,০০০ টাকা
              "
                className="block w-full px-3 h-full mt-2  py-2  text-gray-700 bg-white border border-gray-300 rounded  focus:border-secondary  focus:outline-none"
                required
              />
            </div>
            <div className="mt-4">
              <label
                className="text-dark font-medium"
                htmlFor="whatWillYouLearnField"
              >
                What They&apos;ll Learn (Write points with comma (,)){" "}
                <span className="text-red-500">*</span>
              </label>
              <textarea
                id="whatWillYouLearn"
                type="textarea"
                name="whatWillYouLearnField"
                placeholder="Ex. লাইভ ক্লাস করতে এবং রেকর্ডেড ভিডিও পেতে চান?, অনেক দিন ধরে ডিজিটাল মার্কেটিং শিখে যাচ্ছেন কিন্তু কোন কূল কিনারা খুজে পাচ্ছেন না?"
                className="block w-full px-3 h-full  py-2  text-gray-700 bg-white border border-gray-300 rounded  focus:border-secondary  focus:outline-none"
              ></textarea>
            </div>
            <div className="mt-4">
              <label className="text-dark font-medium" htmlFor="title">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                id="textarea"
                type="textarea"
                name="description"
                placeholder="Ex: This is a live class about digital marketing."
                className="block w-full px-3 h-full  py-2  text-gray-700 bg-white border border-gray-300 rounded  focus:border-secondary  focus:outline-none"
              ></textarea>
            </div>
            <div className="mt-5 col-start-1 col-end-3 ">
              <label
                htmlFor="file-upload"
                className="block text-sm font-medium text-white"
              >
                Thumbnail
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md h-full ">
                <div className="space-y-1 text-center w-full">
                  <svg
                    className="mx-auto h-12 w-12 text-white"
                    stroke="#4D2DB7"
                    fill="none"
                    viewBox="0 0 48 48"
                    aria-hidden="true"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <div className="flex text-sm text-gray-600">
                    <label className="relative cursor-pointer underline font-medium text-secondary">
                      <input
                        id="file-upload"
                        name="thumbnail"
                        type="file"
                        required
                      />
                    </label>
                    <p className="pl-1 text-gray-500">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">
                    PNG, JPG, JPEG up to 10MB
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full flex items-center justify-end mt-12">
            <button
              type="submit"
              className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-secondary rounded hover:bg-accent font-medium focus:outline-none "
              disabled={classInfoAddPending}
            >
              {classInfoAddPending ? "Pending..." : "Add Class"}
            </button>
          </div>
        </form>
      )}
      {addClassInfoOpen || (
        <LiveClassAddContent
          handleAddClassSubmit={handleAddClassSubmit}
          classInfoAddPending={classInfoAddPending}
        ></LiveClassAddContent>
      )}
    </>
  );
};

export default LiveClassAddForm;
