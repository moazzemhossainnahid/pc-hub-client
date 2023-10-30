"use client";
import React from "react";

const SubmittedAssignmentMarkingCard = ({
  submitMark,
  submittedAssignment,
  gotMarkRef,
  totalMarkRef,
  allAssignmentsResult,
}) => {
    console.log(submittedAssignment?._id)
  console.log(allAssignmentsResult);
  //   check if assignment is marked
  const isMarked = allAssignmentsResult?.find(
    (assignmentResult) =>
      assignmentResult?.assignmentId === submittedAssignment?._id
  );
  console.log(isMarked);
  return (
    <div className="px-3 lg:px-4 py-2 lg:py-3.5 rounded-md bg-white  relative">
      <h1 className="text-lg font-medium text-secondary">
        Course: {submittedAssignment?.courseId?.title}
      </h1>
      <p className=" text-gray-500 mt-1">
        <span className="font-semibold">Assignment details: </span>
        {submittedAssignment?.assignmentId?.description}
      </p>
      <p className=" text-gray-500 mt-2">
        <span className="font-semibold ">Submission: </span>
        {submittedAssignment?.description}
      </p>
      {!!isMarked || (
        <>
          <div className="flex items-center gap-5 mt-5">
            <div>
              <label className="text-dark font-medium" htmlFor="mark">
                Got Mark <span className="text-red-500">*</span>
              </label>
              <input
                id="mark"
                type="text"
                ref={gotMarkRef}
                name="mark"
                placeholder="60"
                className="block w-full px-3 py-2 mt-1 text-gray-700 bg-white border border-gray-300 rounded  focus:border-secondary  focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="text-dark font-medium" htmlFor="totalMark">
                Total Mark <span className="text-red-500">*</span>
              </label>
              <input
                id="totalMark"
                type="text"
                ref={totalMarkRef}
                name="totalMark"
                placeholder="60"
                className="block w-full px-3 py-2 mt-1 text-gray-700 bg-white border border-gray-300 rounded  focus:border-secondary  focus:outline-none"
                required
              />
            </div>
          </div>
          <div className="flex justify-between pt-5 gap-3">
            <div className="w-fit h-fit">
              <p className="font-semibold">
                {submittedAssignment?.studentId?.name}
              </p>
              <p className="text-sm">{submittedAssignment?.studentId?.email}</p>
            </div>
            <button
              onClick={submitMark}
              className="px-6 py-3 leading-5 text-white transition-colors duration-200 transform bg-secondary rounded hover:bg-accent font-medium focus:outline-none"
            >
              Submit Mark
            </button>
          </div>
        </>
      )}
      {!!isMarked && (
        <>
          <div className="flex justify-between pt-5 gap-3 items-center">
            <div className="w-fit h-fit">
              <p className="font-semibold">
                {submittedAssignment?.studentId?.name}
              </p>
              <p className="text-sm">{submittedAssignment?.studentId?.email}</p>
            </div>
            <div className="w-fit h-fit">
                <p className="font-bold text-secondary">
                    Got Mark: {isMarked?.result} / {isMarked?.totalNumb}
                </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default SubmittedAssignmentMarkingCard;
