"use client";
import React from "react";

const CourseInfoForm = ({ handleFormSubmit }) => {
  return (
    <form onSubmit={handleFormSubmit}>
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
          <label className="text-dark font-medium" htmlFor="level">
            Level
          </label>
          <select
            name="level"
            className="block w-full px-3 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded  focus:border-secondary  focus:outline-none"
          >
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Expert">Expert</option>
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
            <option value="Online">Online</option>
            <option value="Offline">Offline</option>
            <option value="Hybrid">Hybrid</option>
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
            <option value="Bengali">Bengali</option>
            <option value="English">English</option>
            <option value="Hindi">Hindi</option>
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
            <option value="Life Time">Life Time</option>
            <option value="Only During The Course">
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
            placeholder="Ex: https://www.youtube.com/embed/9No-FiEInLA"
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
            <label className="text-dark font-medium" htmlFor="discountPrice">
              Discount (Optional)
            </label>
            <input
              id="discountPrice"
              type="number"
              name="discountPrice"
              placeholder="Ex: 5500"
              defaultValue={0}
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
            placeholder="Ex: 50"
            className="block w-full px-3 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded  focus:border-secondary  focus:outline-none"
            required
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
            placeholder="Ex: 6 Months"
            required
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
            <option value="Digital Marketing">Digital Marketing</option>
            <option value="Lead Generation">Graphics Design</option>
            <option value="Facebook Marketing">Basic Computer Operating</option>
            <option value="Graphic Design">Freelancing</option>
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
            placeholder="Ex: This is a course about digital marketing."
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
            placeholder="Ex: Certificate will be provided after completing the course."
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
            placeholder="Ex: This is a course about digital marketing."
            className="block w-full px-3 h-full  py-2  text-gray-700 bg-white border border-gray-300 rounded  focus:border-secondary  focus:outline-none"
          ></textarea>
        </div>
        <div className="mt-5">
          <label className="block text-sm font-medium text-white">
            Thumbnail
          </label>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md h-full">
            <div className="space-y-1 text-center">
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
                    required
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
            <input type="radio" name="badge" id="normal" value="Normal" />
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
              defaultChecked
            />
            <label className="text-dark font-medium" htmlFor="popular">
              Popular
            </label>
          </div>
          <div className="flex items-center gap-2">
            <input type="radio" name="badge" id="top" value="Top" />
            <label className="text-dark font-medium" htmlFor="top">
              Top
            </label>
          </div>
        </div>
        <button
          type="submit"
          className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-secondary rounded hover:bg-accent font-medium focus:outline-none "
        >
          Next
        </button>
      </div>
    </form>
  );
};

export default CourseInfoForm;
