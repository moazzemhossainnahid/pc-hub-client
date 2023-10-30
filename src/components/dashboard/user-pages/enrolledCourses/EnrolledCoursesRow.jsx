"use client";
import {
  useGetOrdersByStudentIdQuery,
  useGetSingleCourseQuery,
} from "@/redux/api/apiSlice";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const EnrolledCoursesRow = ({ courseId, token, studentId }) => {
  const { data, isLoading } = useGetSingleCourseQuery(courseId);
  const { data: studentOrders } = useGetOrdersByStudentIdQuery({
    studentId,
    token,
  });
  if (isLoading) return <div>Loading...</div>;
  const course = data?.data;
  const getOrder = studentOrders?.data?.find(
    (order) => order.courseId?._id === courseId
  );
  return (
    <tr>
      <th>1.</th>
      <td>
        <Image src={course?.thumbnail} alt={"banner"} width={100} height={80} />
      </td>
      <td>
        <Link
          href={`/courses/${course?._id}`}
          className="hover:text-secondary hover:underline"
        >
          {course?.title}
        </Link>
      </td>
      <td className="text-center">
        <div className="font-medium text-gray-500 italic text-xs">Enrolled</div>
      </td>
      <td className="text-center text-xs">
        {new Date(getOrder?.createdAt).toLocaleDateString()}
      </td>
      <td className="text-center">
        &#2547; {getOrder?.amount}
        <div className="px-2 rounded-full text-[10px] h-fit text-green-700 bg-green-200">
          Verified
        </div>
      </td>
      <td className="text-center text-xs">{course?.totalLessons}</td>
      <td className="">
        <Link href={`/student/running-course/${course._id}/classes`}>
          <div className="text-sm font-semibold text-white flex justify-center items-center gap-2 py-2 px-3 md:px-5 rounded bg-gradient-to-r from-primary via-secondary to-accent hover:bg-gradient-to-l duration-500 transition-all">
            Start
          </div>
        </Link>
      </td>
    </tr>
  );
};

export default EnrolledCoursesRow;
