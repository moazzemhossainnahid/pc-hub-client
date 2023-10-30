"use client";
import { useGetAllCoursesQuery } from "@/redux/api/apiSlice";
import Cookies from "js-cookie";
import Image from "next/image";
import React from "react";
import { BsFillTrashFill, BsPencilSquare } from "react-icons/bs";
import Swal from "sweetalert2";
import Link from "next/link";

const CoursesTable = () => {
  const { data, isLoading, error, refetch } = useGetAllCoursesQuery({});
  if (isLoading) {
    return <p>........</p>;
  }
  const courses = data?.data;
  const token = Cookies.get("accessToken");
  //   handle course delete
  const handleCourseDelete = (_id) => {
    Swal.fire({
      title: "Do you want to delete this course?",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it",
      denyButtonText: `Cancel`,
    }).then(async (result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        const res = await fetch(
          `https://lms-server-sigma.vercel.app/api/v1/courses/${_id}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `${token}`,
            },
          }
        );
        const data = await res.json();
        if (data.success) {
          Swal.fire({
            icon: "success",
            title: "Course Deleted Successfully",
            showConfirmButton: false,
            timer: 1500,
          });
          refetch();
        } else {
          Swal.fire({
            icon: "warning",
            title: "Something went wrong",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      }
    });
  };
  return (
    <div className="w-full h-full">
      <h1 className="text-lg  font-semibold text-secondary">
        Total Courses ({courses.length})
      </h1>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>No.</th>
              <th>Image</th>
              <th>Title</th>
              <th>Category</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {courses?.map((course, index) => (
              <tr key={course._id}>
                <th>{index + 1}</th>
                <td>
                  <Image
                    src={course.thumbnail}
                    alt={course.title}
                    width={100}
                    height={80}
                  />
                </td>
                <td>{course.title}</td>
                <td>{course.category}</td>
                <td>&#2547; {course.price}</td>
                <td className="">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleCourseDelete(course._id)}
                      className=""
                    >
                      <BsFillTrashFill className="text-lg text-red-600" />
                    </button>
                    <div className="">
                      <Link href={`/admin/manage-courses/update/${course._id}`}>
                        <BsPencilSquare className="text-lg text-gray-600" />
                      </Link>
                    </div>
                    <Link href={`/courses/${course._id}`}>
                      <button className="text-base font-semibold text-secondary hover:underline hover:text-accent">
                        Details
                      </button>
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CoursesTable;
