"use client";
import React, { useRef, useState } from "react";
import SelectCourseOptions from "../../common/SelectCourseOptions";
import { useGetAllAssignmentResultByCourseIdQuery, useGetSingleUserQuery, useGetSubmittedAssignmentsByCourseIdQuery } from "@/redux/api/apiSlice";
import Swal from "sweetalert2";
import SubmittedAssignmentMarkingCard from "./SubmittedAssignmentMarkingCard";

const MarkingAssignment = ({ allAssignments, courses, token, email }) => {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const gotMarkRef = useRef(null);
  const totalMarkRef = useRef(null);
  const {
    data: submittedAssignmentsData,
    isLoading,
    refetch,
  } = useGetSubmittedAssignmentsByCourseIdQuery({
    courseId: selectedCourse,
    token,
  });
  const {data: allAssignmentResultData,refetch: assignmentResultsRefetch} = useGetAllAssignmentResultByCourseIdQuery({ courseId: selectedCourse, token })
  const {data: userData} = useGetSingleUserQuery({ email, token });
  if (isLoading) return <div>Loading...</div>;
  const submittedAssignments = submittedAssignmentsData?.data;
  const allAssignmentsResult = allAssignmentResultData?.data;
  // filter course by assignments is assignment is exists in this course
  const isAssignmentExists = courses?.filter((course) =>
    allAssignments?.find((assignment) => assignment?.courseId === course?._id)
  );
  // submit mark
  const submitMark = async () => {
    const assignment = submittedAssignments?.find(
      (submittedAssignment) =>
        submittedAssignment?.courseId?._id === selectedCourse
    );
    const gotMark = gotMarkRef.current.value;
    const totalMark = totalMarkRef.current.value;
    if(isNaN(gotMark) || isNaN(totalMark) || gotMark === "" || totalMark === "") {
      Swal.fire({
        icon: "error",
        title: "Got mark and total mark must be a number and can't be empty!",
        showConfirmButton: true,
      });
      return;
    }
    if (gotMark > totalMark) {
      Swal.fire({
        icon: "error",
        title: "Got mark can't be greater than total mark!",
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }
    const body = { assignmentId: assignment?._id, result: parseFloat(gotMark), totalNumb: parseFloat(totalMark), studentId: assignment?.studentId?._id, courseId: selectedCourse };
    const res = await fetch(
      "https://lms-server-sigma.vercel.app/api/v1/assignment-results/addAssignmentResult",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        body: JSON.stringify(body),
      }
    );
    const result = await res.json();
    if (result.success) {
      Swal.fire({
        icon: "success",
        title: "Mark submitted successfully",
        showConfirmButton: false,
        timer: 1500,
      });
      refetch();
      assignmentResultsRefetch();
      gotMarkRef.current.value = "";
      totalMarkRef.current.value = "";
      return;
    }
    else{
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  }
  return (
    <div className="w-full mt-5">
      <SelectCourseOptions
        setSelectedCourse={setSelectedCourse}
        title={"For which course you want to get submitted assignment?"}
        courses={isAssignmentExists}
      ></SelectCourseOptions>
      <div className="mt-5 w-full space-y-5">
        {submittedAssignments?.map((submittedAssignment) => (
          <SubmittedAssignmentMarkingCard key={submittedAssignment?._id} submitMark={submitMark} submittedAssignment={submittedAssignment} gotMarkRef={gotMarkRef} totalMarkRef={totalMarkRef} allAssignmentsResult={allAssignmentsResult}></SubmittedAssignmentMarkingCard>
        ))}
        {submittedAssignments?.length === 0 && (<div className="text-center mt-14 italic">No submitted assignment found!</div>)}
      </div>
    </div>
  );
};

export default MarkingAssignment;
