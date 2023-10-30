"use client";
import { useGetSingleCourseQuery } from "@/redux/api/apiSlice";
import React, { useRef, useState } from "react";
import Swal from "sweetalert2";

const AnnouncementDisplayCard = ({
  announcement,
  handleDeleteAnnouncement,
  token,
  refetch,
  student,
}) => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const descriptionRef = useRef(null);
  const { data, isLoading, error } = useGetSingleCourseQuery(
    announcement.courseId
  );
  if (isLoading) return <p>Loading...</p>;
  const course = data?.data;
  // handle update assignment
  const updateAnnouncement = async () => {
    const description = descriptionRef.current.value;
    const res = await fetch(
      `https://lms-server-sigma.vercel.app/api/v1/announcements/update-announcement/${announcement._id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        body: JSON.stringify({ description }),
      }
    );
    const result = await res.json();
    if (result.success) {
      Swal.fire({
        icon: "success",
        title: "Announcement updated successfully",
        showConfirmButton: false,
        timer: 1500,
      });
      refetch();
      setIsEditOpen(!isEditOpen);
    } else {
      Swal.fire({
        icon: "error",
        title: "Something went wrong!",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };
  return (
    <div className="px-3 lg:px-4 py-2 lg:py-3.5 rounded-md bg-white space-y-0.5 relative">
      <h1 className="text-lg font-medium text-secondary">
        Course: {course?.title}
      </h1>
      {isEditOpen || (
        <>
          <p className="text-sm text-gray-500">
            <span className="font-semibold">Announcement details: </span>
            {announcement.description}
          </p>
          <div className="text-sm text-gray-600 pt-2">
            <p>
              {" "}
              <span className="font-medium">Added on:</span> {(new Date(course.createdAt).toLocaleString())}
            </p>
            {/* <p> <span className="font-medium">Updated on:</span> {updatedDate}</p>   */}
          </div>
        </>
      )}
      {isEditOpen && (
        <textarea
          ref={descriptionRef}
          id="description"
          type="text"
          name="description"
          className="block w-full px-3 py-2 mt-1 text-gray-700 bg-white border border-gray-300 rounded  focus:border-secondary  focus:outline-none"
          rows="5"
          defaultValue={announcement.description}
          required
        />
      )}
      {/* action btn */}
      <div className="absolute top-2 right-2 flex items-center gap-2 md:gap-3">
        {isEditOpen || student || (
          <>
            <button
              onClick={() => setIsEditOpen(true)}
              className="text-xs text-secondary hover:underline"
            >
              Edit
            </button>
            <button
              onClick={() => handleDeleteAnnouncement(announcement._id)}
              className="text-xs text-red-500 hover:underline"
            >
              Delete
            </button>
          </>
        )}
        {isEditOpen && (
          <>
            <button
              onClick={() => setIsEditOpen(false)}
              className="text-xs font-medium px-2.5 py-0.5 bg-gray-400 rounded-md text-white"
            >
              Discard
            </button>
            <button
              onClick={updateAnnouncement}
              className="text-xs font-medium px-2.5 py-0.5 bg-secondary rounded-md text-white"
            >
              Update
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default AnnouncementDisplayCard;
