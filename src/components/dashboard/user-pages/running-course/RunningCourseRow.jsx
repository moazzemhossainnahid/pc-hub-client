"use client";
import { useGetSingleCourseQuery } from "@/redux/api/apiSlice";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const RunningCourseRow = ({ index, courseId }) => {
  const { data, isLoading } = useGetSingleCourseQuery(courseId);
  if (isLoading) return <div>Loading...</div>;
  const course = data?.data;
  return (
    <tr>
      <th>{index + 1}</th>
      <td>
        <Image
          src={course?.thumbnail}
          alt={course?.title}
          width={100}
          height={80}
        />
      </td>
      <td>
        <Link
          href={`/courses/${course?._id}`}
          className="hover:text-secondary hover:underline"
        >
          {course?.title}
        </Link>
      </td>
      <td className="text-center">0</td>
      <td className="text-center">{course?.totalLessons}</td>
      <td className="">
        <Link href={`/student/running-course/${course._id}/classes`}>
          <div className="text-sm font-semibold text-white flex justify-center items-center gap-2 py-2 px-3 md:px-5 rounded bg-gradient-to-r from-primary via-secondary to-accent hover:bg-gradient-to-l duration-500 transition-all">
            View
          </div>
        </Link>
      </td>
    </tr>
  );
};

export default RunningCourseRow;
