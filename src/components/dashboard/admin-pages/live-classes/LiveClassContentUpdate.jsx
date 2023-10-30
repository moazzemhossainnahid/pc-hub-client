"use client";
import React, { useEffect, useState } from "react";
import SelectAndAddModuleName from "../../common/SelectAndAddModuleName";
import { BsFillTrashFill } from "react-icons/bs";
import Swal from "sweetalert2";
import { useGetSingleLiveClassByIdQuery } from "@/redux/api/apiSlice";
import Spinner from "@/components/global/spinner/Spinner";

const LiveClassContentUpdate = ({ liveClassId, singleClassRefetch, token }) => {
  const [lessons, setLessons] = useState([]);
  const [allModulesName, setAllModulesName] = useState([]);
  const [addNewModuleOpen, setAddNewModuleOpen] = useState(false);
  const { data, isLoading, refetch } = useGetSingleLiveClassByIdQuery({
    token,
    id: liveClassId,
  });
  //   set modules name
  useEffect(() => {
    if (isLoading) return;
    setLessons(data?.data?.files);
    const modules = data?.data?.files?.map((item) => item.topic);
    setAllModulesName(modules);
  }, [data?.data, isLoading]);
  if (isLoading)
    return (
      <div className="w-full mt-14 flex items-center justify-center">
        <Spinner />
      </div>
    );
  const liveClass = data?.data;
  // handle form submit
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const data = Object.fromEntries(form.entries());
    const { lesson: topic, title, video } = data;
    // get topic id
    const topicId = liveClass?.files?.find((item) => item.topic === topic)?._id;
    if (!topicId) {
      const res = await fetch(
        `https://lms-server-sigma.vercel.app/api/v1/live-courses/addTopic/${liveClass?._id}/`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
          body: JSON.stringify({
            topic: topic,
            details: [
              {
                title: title,
                vurl: video,
              },
            ],
          }),
        }
      );
      const data = await res.json();
      if (data.success) {
        Swal.fire({
          icon: "success",
          title: "Topic Added Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        singleClassRefetch();
        refetch();
        setAddNewModuleOpen(false);
        e.target.reset();
      } else {
        Swal.fire({
          icon: "warning",
          title: "Something went wrong",
          showConfirmButton: false,
          timer: 1500,
        });
      }
      return;
    }
    // add video
    const res = await fetch(
      `https://lms-server-sigma.vercel.app/api/v1/live-courses/addVideo/${liveClass?._id}/${topicId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        body: JSON.stringify({
          title: title,
          vurl: video,
        }),
      }
    );
    const result = await res.json();
    console.log(result);
    if (result.success) {
      Swal.fire({
        icon: "success",
        title: "Video Added Successfully",
        showConfirmButton: false,
        timer: 1500,
      });
      singleClassRefetch();
      refetch();
      setAddNewModuleOpen(false);
      e.target.reset();
    } else {
      Swal.fire({
        icon: "warning",
        title: "Something went wrong",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };
  //   handle delete video
  const handleDeleteVideo = async (video) => {
    console.log(video);
    // get topic id by video id
    const topicId = liveClass?.files?.find((item) =>
      item.details.find((item) => item._id === video._id)
    )?._id;
    console.log(topicId);
    const res = await fetch(
      `https://lms-server-sigma.vercel.app/api/v1/live-courses/deleteVideo/${liveClass?._id}/${topicId}/${video._id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      }
    );
    const data = await res.json();
    console.log(data);
    if (data.success) {
      Swal.fire({
        icon: "success",
        title: "Video Deleted Successfully",
        showConfirmButton: false,
        timer: 1500,
      });
      singleClassRefetch();
      refetch();
    } else {
      Swal.fire({
        icon: "warning",
        title: "Something went wrong",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };
  //   handle delete topic
  const handleDeleteTopic = async (topicId) => {
    Swal.fire({
      title: "Do you want to delete this topic?",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it",
      denyButtonText: `Cancel`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await fetch(
          `https://lms-server-sigma.vercel.app/api/v1/live-courses/deleteTopic/${liveClass?._id}/${topicId}`,
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
            title: "Topic Deleted Successfully",
            showConfirmButton: false,
            timer: 1500,
          });
          singleClassRefetch();
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
    <div>
      <form
        onSubmit={handleFormSubmit}
        className="grid grid-cols-1 gap-4 mt-3 sm:grid-cols-2"
      >
        <SelectAndAddModuleName
          allModulesName={allModulesName}
          setAddNewModuleOpen={setAddNewModuleOpen}
          addNewModuleOpen={addNewModuleOpen}
        ></SelectAndAddModuleName>
        <div>
          <label className="text-dark font-medium" for="title">
            Video Title
          </label>
          <input
            id="title"
            type="text"
            name="title"
            className="block w-full px-3 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded  focus:border-secondary  focus:outline-none"
          />
        </div>
        <div>
          <label className="text-dark font-medium" for="video">
            Video Link
          </label>
          <div className="flex items-center gap-2">
            <input
              id="video"
              type="text"
              name="video"
              className="block w-full px-3 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded  focus:border-secondary  focus:outline-none"
            />
          </div>
        </div>
        <button
          type="submit"
          className="py-2  mt-auto  w-full h-[42px] text-sm  leading-5 text-white transition-colors duration-200 transform bg-secondary rounded hover:bg-accent font-medium focus:outline-none "
        >
          Add Video
        </button>
      </form>
      <div className="mt-5 w-full border h-fit">
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>Topic</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              {/* row */}
              {lessons?.map((lesson, index) => (
                <tr key={index}>
                  <th className="flex items-start">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p>{lesson?.topic}</p>
                      <button onClick={() => handleDeleteTopic(lesson?._id)}>
                        <BsFillTrashFill className="text-base text-red-600" />
                      </button>
                    </div>
                  </th>
                  <td>
                    <div className="flex items-center justify-between mb-3 font-semibold">
                      <p>Title</p>
                      <p>Video</p>
                    </div>
                    {lesson?.details?.map((item, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center border-b py-1"
                      >
                        <p className="text-dark font-medium">{item?.title}</p>
                        <div className="text-dark font-medium flex items-center gap-2">
                          {item?.vurl}
                          <button onClick={() => handleDeleteVideo(item)}>
                            <BsFillTrashFill className="text-base text-red-600" />
                          </button>
                        </div>
                      </div>
                    ))}
                    {lesson?.details?.length === 0 && (
                      <p className="text-dark font-medium text-center italic">
                        No Video Added
                      </p>
                    )}
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

export default LiveClassContentUpdate;
