"use client";
import { useGetAllCoursesQuery } from "@/redux/api/apiSlice";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import Swal from "sweetalert2";

const imgUploadToken = process.env.NEXT_PUBLIC_IMG_HOSTING_KEY;

const InfoUpdate = ({ selectedCourse, contentRefetch }) => {
  const { refetch } = useGetAllCoursesQuery({});
  const token = Cookies.get("accessToken");
  const router = useRouter();
  // handle update course submit
  const handleUpdateCourseSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const data = Object.fromEntries(form.entries());
    const {
      totalLessons,
      thumbnail,
      price,
      certificate_details,
      for_whom,
      description,
      introvdo,
      discountPrice,
      ...all
    } = data;
    const course = {
      ...all,
      details: {
        description,
        for_whom,
        certificate_details,
      },
      price: parseFloat(price),
      totalLessons: parseInt(totalLessons),
      discountPrice: parseFloat(discountPrice),
      thumbnail: selectedCourse?.thumbnail,
      introvdo: selectedCourse?.introvdo,
      createdAt: selectedCourse?.createdAt,
      files: selectedCourse.files,
      _id: selectedCourse._id,
      instructor: selectedCourse.instructor?._id,
      rating: selectedCourse?.rating,
      totalLessons: selectedCourse?.totalLessons,
      totalEnrolled: selectedCourse?.totalEnrolled,
      __v: selectedCourse?.__v,
      id: selectedCourse?.id,
    };
    if (thumbnail.name !== "") {
      const img_hosting_url = `https://api.imgbb.com/1/upload?key=${imgUploadToken}`;
      const formData = new FormData();
      formData.append("image", thumbnail);
      await fetch(img_hosting_url, {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((res) => {
          course.thumbnail = res?.data.display_url;
        });
    }
    if (introvdo !== "") {
      course.introvdo = introvdo;
    }
    const res = await fetch(
      `https://lms-server-sigma.vercel.app/api/v1/courses/${selectedCourse._id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        body: JSON.stringify(course),
      }
    );
    const res2 = await res.json();
    if (res2.success) {
      Swal.fire({
        icon: "success",
        title: "Course Info Updated Successfully",
        showConfirmButton: false,
        timer: 1500,
      });
      refetch();
      contentRefetch();
      router.push("/admin/manage-courses");
    } else {
      Swal.fire({
        icon: "error",
        title: "Something went wrong!",
        showConfirmButton: false,
        timer: 1500,
      });
    }

    e.target.reset();
  };
  return (
    <form onSubmit={handleUpdateCourseSubmit} className="mt-5 md:mt-7">
      <div className="grid grid-cols-1 gap-6 mt-3 sm:grid-cols-2">
        <div>
          <label className="text-dark font-medium" htmlFor="title">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            id="title"
            type="text"
            name="title"
            defaultValue={selectedCourse?.title}
            className="block w-full px-3 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded  focus:border-secondary  focus:outline-none"
          />
        </div>
        <div>
          <label className="text-dark font-medium" htmlFor="level">
            Level
          </label>
          <select
            name="level"
            className="block w-full px-3 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded  focus:border-secondary  focus:outline-none"
          >
            <option
              value="Beginner"
              selected={selectedCourse?.level === "Beginner"}
            >
              Beginner
            </option>
            <option
              value="Intermediate"
              selected={selectedCourse?.level === "Intermediate"}
            >
              Intermediate
            </option>
            <option value="Expert" selected={selectedCourse?.level === "Expert"}>
              Expert
            </option>
          </select>
        </div>
        <div>
          <label className="text-dark font-medium" htmlFor="type">
            Type
          </label>
          <select
            name="type"
            className="block w-full px-3 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded  focus:border-secondary  focus:outline-none"
          >
            <option value="Online" selected={selectedCourse?.type === "Online"}>
              Online
            </option>
            <option
              value="Offline"
              selected={selectedCourse?.type === "Offline"}
            >
              Offline
            </option>
            <option value="Hybrid" selected={selectedCourse?.type === "Hybrid"}>
              Hybrid
            </option>
          </select>
        </div>
        <div>
          <label className="text-dark font-medium" htmlFor="language">
            Language
          </label>
          <select
            name="language"
            className="block w-full px-3 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded  focus:border-secondary  focus:outline-none"
          >
            <option
              value="Bengali"
              selected={selectedCourse?.language === "Bengali"}
            >
              Bengali
            </option>
            <option
              value="English"
              selected={selectedCourse?.language === "English"}
            >
              English
            </option>
            <option
              value="Hindi"
              selected={selectedCourse?.language === "Hindi"}
            >
              Hindi
            </option>
          </select>
        </div>
        <div>
          <label className="text-dark font-medium" htmlFor="accessibility">
            Accessibility
          </label>
          <select
            name="accessibility"
            className="block w-full px-3 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded  focus:border-secondary  focus:outline-none"
          >
            <option
              value="Life Time"
              selected={selectedCourse?.accessibility === "Life Time"}
            >
              Life Time
            </option>
            <option
              value="Only During The Course"
              selected={
                selectedCourse?.accessibility === "Only During The Course"
              }
            >
              Only During The Course
            </option>
          </select>
        </div>

        <div>
          <label className="text-dark font-medium" htmlFor="introvdo">
            Intro Video Url <span className="text-red-500">*</span>
          </label>
          <input
            id="introvdo"
            type="text"
            name="introvdo"
            defaultValue={selectedCourse?.introVideoUrl}
            className="block w-full px-3 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded  focus:border-secondary  focus:outline-none"
          />
        </div>
        <div className="flex items-center w-full justify-between gap-5">
          <div className="w-full">
            <label className="text-dark font-medium" htmlFor="price">
              Price(BDT) <span className="text-red-500">*</span>
            </label>
            <input
              id="price"
              type="number"
              name="price"
              defaultValue={selectedCourse?.price}
              className="block w-full px-3 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded  focus:border-secondary  focus:outline-none"
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
              defaultValue={selectedCourse?.discountPrice}
              placeholder="Ex: 5500"
              className="block w-full px-3 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded  focus:border-secondary  focus:outline-none"
              required
            />
          </div>
        </div>

        <div>
          <label className="text-dark font-medium" htmlFor="lessons">
            Total Lessons <span className="text-red-500">*</span>
          </label>
          <input
            id="lessons"
            type="number"
            name="totalLessons"
            defaultValue={selectedCourse?.totalLessons}
            className="block w-full px-3 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded  focus:border-secondary  focus:outline-none"
          />
        </div>
        <div>
          <label className="text-dark font-medium" htmlFor="title">
            Duration (Full course) <span className="text-red-500">*</span>
          </label>
          <input
            id="duration"
            type="text"
            name="duration"
            className="block w-full px-3 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded  focus:border-secondary  focus:outline-none"
            defaultValue={selectedCourse?.duration}
          />
        </div>
        <div>
          <label className="text-dark font-medium" htmlFor="category">
            Category
          </label>
          <select
            name="category"
            className="block w-full px-3 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded  focus:border-secondary  focus:outline-none"
          >
            <option
              value="Digital Marketing"
              selected={selectedCourse?.category === "Digital Marketing"}
            >
              Digital Marketing
            </option>
            <option
              value="Lead Generation"
              selected={selectedCourse?.category === "Lead Generation"}
            >
              Lead Generation
            </option>
            <option
              value="Facebook Marketing"
              selected={selectedCourse?.category === "Facebook Marketing"}
            >
              Facebook Marketing
            </option>
            <option
              value="Graphic Design"
              selected={selectedCourse?.category === "Graphic Design"}
            >
              Graphic Design
            </option>
            <option value="SEO" selected={selectedCourse?.category === "SEO"}>
              SEO
            </option>
          </select>
        </div>
        <div>
          <label className="text-dark font-medium" htmlFor="title">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            id="textarea"
            type="textarea"
            name="description"
            defaultValue={selectedCourse?.details?.description}
            className="block w-full px-3 h-full  py-2  text-gray-700 bg-white border border-gray-300 rounded  focus:border-secondary  focus:outline-none"
          ></textarea>
        </div>
        <div>
          <label
            className="text-dark font-medium"
            htmlFor="certificate_details"
          >
            Certificate Details
          </label>
          <textarea
            id="certificate_details"
            type="textarea"
            name="certificate_details"
            defaultValue={selectedCourse?.details?.certificate_details}
            className="block w-full px-3 h-full  py-2  text-gray-700 bg-white border border-gray-300 rounded  focus:border-secondary  focus:outline-none"
          ></textarea>
        </div>
        <div className="mt-5">
          <label className="text-dark font-medium" htmlFor="for_whom">
            For Whom? (Explain)
          </label>
          <textarea
            id="for_whom"
            type="textarea"
            name="for_whom"
            defaultValue={selectedCourse?.details?.for_whom}
            className="block w-full px-3 h-full  py-2  text-gray-700 bg-white border border-gray-300 rounded  focus:border-secondary  focus:outline-none"
          ></textarea>
        </div>
        <div className="mt-5">
          <label className="block text-sm font-medium text-white">
            Thumbnail
          </label>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md h-full ">
            <div className="space-y-0 text-center ">
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
                <label
                  htmlFor="file-upload"
                  className="relative cursor-pointer underline font-medium text-secondary"
                >
                  <input
                    id="file-upload"
                    name="thumbnail"
                    type="file"
                    className="w-[95%] mb-1 mx-auto"
                  />
                </label>
                <p className="pl-1 text-gray-500">or drag and drop</p>
              </div>
              <p className="text-xs text-gray-500">PNG, JPG, JPEG up to 10MB</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-y-5 justify-between mt-12">
        <div className="flex items-center gap-3">
          <h1 className="text-dark font-medium">
            Badge: <span className="text-red-500">*</span>
          </h1>
          <div className="flex items-center gap-2">
            <input
              type="radio"
              name="badge"
              id="normal"
              value="Normal"
              defaultChecked={selectedCourse.badge === "Normal"}
            />
            <label className="text-dark font-medium" htmlFor="normal">
              Normal
            </label>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="radio"
              name="badge"
              id="popular"
              value="Popular"
              defaultChecked={selectedCourse.badge === "Popular"}
            />
            <label className="text-dark font-medium" htmlFor="popular">
              Popular
            </label>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="radio"
              name="badge"
              id="top"
              value="Top"
              defaultChecked={selectedCourse.badge === "Top"}
            />
            <label className="text-dark font-medium" htmlFor="top">
              Top
            </label>
          </div>
        </div>
        <button
          type="submit"
          className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-secondary rounded hover:bg-accent font-medium focus:outline-none "
        >
          Update
        </button>
      </div>
    </form>
  );
};

export default InfoUpdate;
