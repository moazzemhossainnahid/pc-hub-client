"use client";
import React from "react";

const SelectCourseOptions = ({ setSelectedCourse, title, courses }) => {
  return (
    <div className="mt-4">
      <label className="text-dark font-medium" htmlFor="select-course">
        {title}
      </label>
      <select
        name="selectedCourse"
        onChange={(e) => setSelectedCourse(e.target.value)}
        className="block w-full px-3 py-2 mt-1 text-gray-700 bg-white border border-gray-300 rounded  focus:border-secondary  focus:outline-none"
      >
        <option selected disabled>
          Select Course
        </option>
        {courses.map((course) => (
          <option key={course._id} value={course._id}>
            {course.title}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectCourseOptions;
