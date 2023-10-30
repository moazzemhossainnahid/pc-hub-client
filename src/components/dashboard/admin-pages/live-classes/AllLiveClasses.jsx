"use client";
import { useGetAllLiveClassesQuery } from "@/redux/api/apiSlice";
import Link from "next/link";
import React from "react";
import { BsFillTrashFill, BsPencilSquare } from "react-icons/bs";
import Swal from "sweetalert2";

const AllLiveClasses = ({ token }) => {
  const { data, isLoading, refetch } = useGetAllLiveClassesQuery({ token });
  if (isLoading) return <div className="w-full mt-5">Loading...</div>;
  const liveClasses = data?.data;
  //   handle delete live class
  const handleDeleteLiveClass = (_id) => {
    Swal.fire({
      title: "Do you want to delete this live class?",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it",
      denyButtonText: `Cancel`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await fetch(
          `https://lms-server-sigma.vercel.app/api/v1/live-courses/${_id}`,
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
            title: "Live Class Deleted Successfully",
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
    <div className="w-full mt-5">
      <div className="w-full h-full">
        <h1 className="text-lg  font-semibold text-secondary">
          Total Courses ({liveClasses?.length})
        </h1>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>No.</th>
                <th>Title</th>
                <th>Price</th>
                <th>Discount</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {liveClasses?.map((liveClass, index) => (
                <tr key={liveClass?._id}>
                  <th>{index + 1}</th>
                  <td className="font-semibold">{liveClass?.title}</td>
                  <td className="text-accent font-medium">
                    &#2547; {liveClass?.price}
                  </td>
                  <td className="text-accent font-medium">
                    &#2547;{" "}
                    {liveClass?.discountPrice > 0
                      ? liveClass?.discountPrice
                      : "Not available"}
                  </td>
                  <td className="">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => handleDeleteLiveClass(liveClass?._id)}
                        className=""
                      >
                        <BsFillTrashFill className="text-lg text-red-600" />
                      </button>
                      <div className="">
                        <Link
                          href={`/admin/live-classes/update/${liveClass?._id}`}
                        >
                          <BsPencilSquare className="text-lg text-gray-600" />
                        </Link>
                      </div>
                      <Link href={`/live-classes/${liveClass?._id}`}>
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
    </div>
  );
};

export default AllLiveClasses;
