"use client";
import {
  useGetAllLiveClassesQuery,
  useGetSingleLiveClassByIdQuery,
} from "@/redux/api/apiSlice";
import { getUserInfo } from "@/ults/getUserInfo";
import React, { useRef, useState } from "react";
import SelectCourseOptions from "../../common/SelectCourseOptions";
import Swal from "sweetalert2";
import Spinner from "@/components/global/spinner/Spinner";

const AllTopicsContainer = () => {
  const [selectedLiveClass, setSelectedLiveClass] = useState(null);
  const [addTopicOpen, setAddTopicOpen] = useState(false);
  const [addVideoOpen, setAddVideoOpen] = useState(null);
  const { email, token } = getUserInfo();
  const topicName = useRef(null);
  const topicFacilities = useRef(null);
  const { data, isLoading } = useGetAllLiveClassesQuery({ token });
  const { data: liveClassData, refetch } = useGetSingleLiveClassByIdQuery({
    token,
    id: selectedLiveClass,
  });
  const { refetch: allLiveClassesRefetch } = useGetAllLiveClassesQuery({
    token,
  });
  if (isLoading) return <Spinner />;
  const liveClasses = data?.data;
  const LiveClass = liveClassData?.data;
  //   handleAddTopic
  const handleAddTopic = async () => {
    const name = topicName.current.value;
    const facilitiesValue = topicFacilities.current.value;
    if (!name || !facilitiesValue) return;
    const facilities = facilitiesValue.split(",");
    const res = await fetch(
      `https://lms-server-sigma.vercel.app/api/v1/live-courses/addTopic/${selectedLiveClass}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name, facilities }),
      }
    );
    const data = await res.json();
    if (data.success) {
      Swal.fire({
        icon: "success",
        title: "Topic Added Successfully",
        toast: true,
        timer: 1500,
        timerProgressBar: false,
        showConfirmButton: false,
      });
      topicName.current.value = "";
      topicFacilities.current.value = "";
      setAddTopicOpen(false);
      refetch();
      allLiveClassesRefetch();
    } else {
      Swal.fire({
        icon: "error",
        title: "Something went wrong",
        timer: 1500,
        showConfirmButton: false,
      });
    }
  };
  //   handle delete topic
  const handleDeleteTopic = async (topicId) => {
    Swal.fire({
      title: "Do you want to delete this course?",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it",
      denyButtonText: `Cancel`,
    }).then(async (result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        const res = await fetch(
          `https://lms-server-sigma.vercel.app/api/v1/live-courses/deleteTopic/${selectedLiveClass}/${topicId}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await res.json();
        if (data.success) {
          Swal.fire({
            icon: "success",
            title: "Topic Deleted Successfully",
            toast: true,
            timer: 1500,
            timerProgressBar: false,
            showConfirmButton: false,
          });
          refetch();
          allLiveClassesRefetch();
        } else {
          Swal.fire({
            icon: "error",
            title: "Something went wrong",
            timer: 1500,
            showConfirmButton: false,
          });
        }
      }
    });
  };
  //   handle delete live class
  const handleLiveClassDelete = async () => {
    Swal.fire({
      title: "Do you want to delete this course?",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it",
      denyButtonText: `Cancel`,
    }).then(async (result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        const res = await fetch(
          `https://lms-server-sigma.vercel.app/api/v1/live-courses/${selectedLiveClass}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await res.json();
        if (data.success) {
          Swal.fire({
            icon: "success",
            title: "Live Class Deleted Successfully",
            toast: true,
            timer: 1500,
            timerProgressBar: false,
            showConfirmButton: false,
          });
          refetch();
          allLiveClassesRefetch();
        } else {
          Swal.fire({
            icon: "error",
            title: "Something went wrong",
            timer: 1500,
            showConfirmButton: false,
          });
        }
      }
    });
  };
  // handle add video
  const handleSubmitAddVideo = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const title = formData.get("title");
    const url = formData.get("url");
    console.log(title, url);
    const video = { title, url };
    console.log(video);
    const res = await fetch(
      `https://lms-server-sigma.vercel.app/api/v1/live-courses/addVideo/${selectedLiveClass}/${addVideoOpen}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(video),
      }
    );
    const data = await res.json();
    if (data.success) {
      Swal.fire({
        icon: "success",
        title: "Video Added Successfully",
        toast: true,
        timer: 1500,
        timerProgressBar: false,
        showConfirmButton: false,
      });
      refetch();
      allLiveClassesRefetch();
      setAddVideoOpen(null);
    } else {
      Swal.fire({
        icon: "error",
        title: "Something went wrong",
        timer: 1500,
        showConfirmButton: false,
      });
    }
  };
  // handle delete video
  const handleDeleteVideo = async (topicId, videoId) => {
    Swal.fire({
      title: "Do you want to delete this video?",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it",
      denyButtonText: `Cancel`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await fetch(
          `https://lms-server-sigma.vercel.app/api/v1/live-courses/deleteVideo/${selectedLiveClass}/${topicId}/${videoId}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await res.json();
        if (data.success) {
          Swal.fire({
            icon: "success",
            title: "Video Deleted Successfully",
            toast: true,
            timer: 1500,
            timerProgressBar: false,
            showConfirmButton: false,
          });
          refetch();
          allLiveClassesRefetch();
        } else {
          Swal.fire({
            icon: "error",
            title: "Something went wrong",
            timer: 1500,
            showConfirmButton: false,
          });
        }
      }
    });
  };
  return (
    <div className="w-full mt-5">
      <SelectCourseOptions
        setSelectedCourse={setSelectedLiveClass}
        title={"Select Class for see the topics"}
        courses={liveClasses}
      ></SelectCourseOptions>
      {LiveClass && (
        <div className="w-full h-fit mt-5">
          <div className="flex items-center justify-between font-medium">
            <h1 className="text-xl font-semibold  text-primary">
              Total: {LiveClass?.topics?.length}
            </h1>{" "}
            <div className="w-fit h-fit text-xs flex items-center gap-3">
              <button
                onClick={() => setAddTopicOpen(!addTopicOpen)}
                className="text-primary hover:underline"
              >
                {addTopicOpen ? "Cancel" : "Add Topic"}
              </button>
              <button
                onClick={handleLiveClassDelete}
                className="text-red-500 hover:underline"
              >
                Delete Class
              </button>
            </div>
          </div>
          {addTopicOpen && (
            <div className="w-full mt-4">
              <div className="w-full flex gap-5">
                <div className="grow">
                  <label
                    className="text-dark font-medium"
                    htmlFor="paymentCondition"
                  >
                    Add Topics <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="topicsName"
                    type="text"
                    placeholder="Topic Name"
                    ref={topicName}
                    className="block w-full px-3 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded  focus:border-secondary  focus:outline-none"
                  />
                  <input
                    id="topicFacilities"
                    type="text"
                    ref={topicFacilities}
                    placeholder="Write each point with a comma (,)"
                    className="block w-full px-3 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded  focus:border-secondary  focus:outline-none"
                  />
                </div>
                <button
                  onClick={handleAddTopic}
                  className="px-3 py-2 rounded mt-[82px] bg-primary text-white h-fit w-fit cursor-pointer"
                >
                  Add
                </button>
              </div>
            </div>
          )}
        </div>
      )}
      <div className="mt-4 w-full space-y-5">
        {LiveClass?.topics?.map((topic, index) => (
          <div
            key={index}
            className="w-full h-fit bg-white rounded-md p-4 relative group"
          >
            <h1 className="text-lg font-semibold text-secondary">
              {topic?.name}
            </h1>
            <div className="w-full mt-2 text-sm font-medium space-y-2">
              {topic?.videos?.map((video) => (
                <div
                  key={video?._id}
                  className="w-full relative group border-b pb-0.5"
                >
                  <p>Title: {video?.title}</p>
                  <p>Link: <a href={video?.url} target="_blank" className="hover:underline hover:text-accent">{video?.url}</a></p>
                  <button
                    onClick={() => handleDeleteVideo(topic?._id, video?._id)}
                    className="text-red-500 hover:underline absolute right-3 text-xs top-3"
                  >
                    Delete video
                  </button>
                </div>
              ))}
              {topic?.videos?.length == 0 && <div className="italic text-xs">No video added!</div>}
            </div>
            {/* add video form */}
            {addVideoOpen == topic?._id && (
              <form onSubmit={handleSubmitAddVideo} className="w-full mt-4 ">
                <div>
                  <label className="text-dark font-medium" htmlFor="title">
                    Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="title"
                    type="text"
                    name="title"
                    placeholder="Type here..."
                    className="block w-full px-3 py-2 mt-1 text-gray-700 bg-white border border-gray-300 rounded  focus:border-secondary  focus:outline-none"
                    required
                  />
                </div>
                <div className="mt-3">
                  <label className="text-dark font-medium" htmlFor="videoUrl">
                    Video Link <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="videoUrl"
                    type="text"
                    name="url"
                    placeholder="Embabed link..."
                    className="block w-full px-3 py-2 mt-1 text-gray-700 bg-white border border-gray-300 rounded  focus:border-secondary  focus:outline-none"
                    required
                  />
                </div>
                <div className="mt-3 w-full flex items-center justify-end">
                  <button
                    type="submit"
                    className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-secondary rounded hover:bg-accent font-medium focus:outline-none "
                  >
                    Add video
                  </button>
                </div>
              </form>
            )}
            <div className="absolute top-3 right-3 group-hover:flex duration-200 transition-all items-center gap-3 text-xs font-medium hidden">
              <button
                onClick={() => {
                  addVideoOpen === topic?._id
                    ? setAddVideoOpen(null)
                    : setAddVideoOpen(topic?._id);
                }}
                className="text-primary hover:underline"
              >
                {addVideoOpen == topic?._id ? "Cancel" : "Add Video"}
              </button>
              <button
                onClick={() => handleDeleteTopic(topic?._id)}
                className="text-red-500 hover:underline"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllTopicsContainer;
