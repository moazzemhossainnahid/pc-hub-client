"use client";
import { getUserInfo } from "@/ults/getUserInfo";
import React, { useEffect, useState } from "react";
import SelectCourseOptions from "../../common/SelectCourseOptions";
import { useGetAllLiveClassesQuery } from "@/redux/api/apiSlice";
import Spinner from "@/components/common/loader/SmallSpinner";
import Link from "next/link";

const StudentContainer = () => {
  const [selectedLiveClass, setSelectedLiveClass] = useState(null);
  const [separateOrdersByStudent, setSeparateOrdersByStudent] = useState([]);
  const [refetchPayments, setRefetchPayments] = useState(false);
  const [allPayments, setAllPayments] = useState([]);
  const { email, token } = getUserInfo();
  const { data, isLoading } = useGetAllLiveClassesQuery({ token });
  useEffect(() => {
    // get payments by class id
    const getPayments = async () => {
      const res = await fetch(
        `https://lms-server-sigma.vercel.app/api/v1/live-class-payments/by-course-id/${selectedLiveClass}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.json();
      if (data.success) {
        setAllPayments(data?.data);
      }
    };
    if (selectedLiveClass) {
      getPayments();
    }
  }, [selectedLiveClass, token, refetchPayments]);
  useEffect(() => {
    const ordersByStudentId = {};
    // Loop through the data and group orders by student ID
    allPayments.forEach((order) => {
      const studentId = order?.studentId?._id;
      if (!ordersByStudentId[studentId]) {
        ordersByStudentId[studentId] = {
          student: order?.studentId,
          liveClassOrders: [],
        };
      }
      // Add the order to the liveClassOrders array
      ordersByStudentId[studentId].liveClassOrders.push(order);
    });
    // Convert the object into an array of orders grouped by student ID
    const separateOrdersByStudent = Object.values(ordersByStudentId);
    setSeparateOrdersByStudent(separateOrdersByStudent);
  }, [allPayments]);
  if (isLoading) return <Spinner />;
  // const LiveClass = liveClassData?.data;
  const liveClasses = data?.data;
  // console.log();

  // handle allow or delete topic to student
  const handleAllowedTopic = async (topicId, studentId) => {
    // check if the topic is already allowed or not

    const res = await fetch(
      `https://lms-server-sigma.vercel.app/api/v1/live-courses/addTopicToUser/${studentId}/${selectedLiveClass}/${topicId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await res.json();
    setRefetchPayments(!refetchPayments);
  };
  // handle delete allowed topic
  const handleDeleteAllowedTopic = async (topicId, studentId) => {
    const res = await fetch(
      `https://lms-server-sigma.vercel.app/api/v1/live-courses/deleteTopicFromUser/${studentId}/${selectedLiveClass}/${topicId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await res.json();
    setRefetchPayments(!refetchPayments);
  };
  console.log(separateOrdersByStudent);
  return (
    <div className="mt-5">
      <SelectCourseOptions
        setSelectedCourse={setSelectedLiveClass}
        title={"Select Class for see the students payment"}
        courses={liveClasses}
      ></SelectCourseOptions>
      {separateOrdersByStudent?.length > 0 && (
        <>
          <h1 className="text-lg text-secondary font-semibold mt-5">
            Total: {separateOrdersByStudent?.length}
          </h1>
          <div className="mt-3 w-full space-y-5">
            {separateOrdersByStudent?.map((order, index) => (
              <div
                key={index}
                className="w-full h-fit bg-white rounded-md p-4 lg:px-5 lg:py-3.5"
              >
                <Link href={`/admin/manage-users/${order?.student?._id}`}>
                  <h1 className="font-semibold text-secondary text-lg hover:underline hover:text-accent">
                    {order?.student?.name}
                  </h1>
                </Link>
                <p className="text-sm">{order?.student?.email}</p>
                <p className="mt-2 text-base font-semibold">Payment History:</p>
                <table className="w-full border-collapse mt-2">
                  <thead>
                    <tr className="border border-slate-600 text-start py-2 px-3 font-semibold">
                      <th className="text-sm border border-slate-600 text-start py-2 px-3 font-semibold">
                        Date
                      </th>
                      <th className="text-sm border border-slate-600 text-start py-2 px-3 font-semibold">
                        Transactions Id
                      </th>
                      <th className="text-sm border border-slate-600 text-start py-2 px-3">
                        Amount
                      </th>
                      <th className="text-sm border border-slate-600 text-start py-1 px-2 font-semibold">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {order?.liveClassOrders?.map((order, index) => (
                      <tr key={index}>
                        <td className="text-sm border border-slate-600 text-start py-1 px-2">
                          {new Date(order?.createdAt).toLocaleString()}
                        </td>
                        <td className="text-sm border border-slate-600 text-start py-1 px-2">
                          {order?.transectionId}
                        </td>
                        <td className="text-sm border border-slate-600 text-start py-1 px-2 font-medium">
                          &#2547; {order?.amount}
                        </td>
                        <td className="text-sm border border-slate-600 text-start py-1 px-2">
                          {order?.paid ? (
                            <div className="italic text-xs w-fit px-3 py-0.5 bg-green-200 text-green-600 rounded-full text-center ">
                              Verified
                            </div>
                          ) : (
                            <div className="italic text-xs w-fit px-3 py-0.5 bg-red-200 text-red-600 rounded-full text-center ">
                              Failed
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <h1 className="border-b pb-1 text-base font-semibold mt-3">
                  Available Topics (Select for the allow)
                </h1>
                <div className="w-full flex flex-wrap gap-3 mt-3">
                  {order?.liveClassOrders[0]?.liveClassId?.files?.map(
                    (topic, index) => (
                      <div
                        onClick={() => {
                          order?.student?.enrolledLiveClass.some(
                            (enrollment) =>
                              enrollment.liveCourseId ===
                                order?.liveClassOrders[0]?.liveClassId?._id &&
                              enrollment.topics.includes(topic._id)
                          )
                            ? handleDeleteAllowedTopic(
                                topic?._id,
                                order?.student?._id
                              )
                            : handleAllowedTopic(
                                topic?._id,
                                order?.student?._id
                              );
                        }}
                        key={index}
                        className={`px-3 py-1 rounded-md text-sm cursor-pointer ${
                          order?.student?.enrolledLiveClass.some(
                            (enrollment) =>
                              enrollment.liveCourseId ===
                                order?.liveClassOrders[0]?.liveClassId?._id &&
                              enrollment.topics.includes(topic._id)
                          )
                            ? "bg-secondary text-white"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {topic?.topic}
                      </div>
                    )
                  )}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default StudentContainer;
