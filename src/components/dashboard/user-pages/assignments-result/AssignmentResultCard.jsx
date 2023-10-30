"use client";
import { useGetAssignmentResultByStudentIdQuery } from "@/redux/api/apiSlice";
import React from "react";

const AssignmentResultCard = ({ submittedAssignment, token }) => {
  const { data, isLoading } = useGetAssignmentResultByStudentIdQuery({
    studentId: submittedAssignment?.studentId?._id,
    courseId: submittedAssignment?.courseId?._id,
    token,
  });
  if (isLoading) return <div>Loading...</div>;
  const result = data?.data;
  return (
    <div className="px-3 lg:px-4 mt-5 py-2 lg:py-3.5 rounded-md bg-white relative">
      <h1 className="text-lg font-medium text-secondary">Course: {result?.courseId?.title}</h1>
      <div className="w-[200px] h-fit py-8 bg-gray-50 my-5 mx-auto rounded-md">
        <p className="text-center text-xl font-semibold text-primary">
          Your Result
        </p>
        <p className="text-center text-2xl font-bold text-primary mt-1">
          {result?.result}/{result?.totalNumb}
        </p>
      </div>
    </div>
  );
};

export default AssignmentResultCard;
