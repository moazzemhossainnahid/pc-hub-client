"use client";
import React, { useState } from "react";
import { BsFillTrashFill, BsPencilSquare } from "react-icons/bs";
import UpdateQuizForm from "../updateQuizForm/UpdateQuizForm";

const DisplayQuizzes = ({
  handleQuizDelete,
  quizzes,
  courses,
  selectedCourse,
  handlePublishedQuizDelete,
  quizRefetch
}) => {
  const [updateQuizOpen, setUpdateQuizOpen] = useState(null);
  return (
    <div className="pt-3">
      <h1 className="text-lg font-semibold text-secondary">
        Display Quizzes ({quizzes?.length || 0})
      </h1>
      <p className="font-medium text-gray-500">
        Course Name:{" "}
        {courses.find((course) => course?._id === selectedCourse)?.title}
      </p>
      {/* update quiz container */}
      {updateQuizOpen && (
        <>
          <UpdateQuizForm
            updateQuizOpen={updateQuizOpen}
            setUpdateQuizOpen={setUpdateQuizOpen}
            selectedCourse={selectedCourse}
            quizRefetch={quizRefetch}
          />
        </>
      )}
      {/* display quiz container */}
      <div className="mt-3 space-y-3">
        {quizzes?.map((quiz, index) => (
          <div
            className="w-full  h-fit p-2.5 lg:p-3 shadow rounded-md flex justify-between"
            key={index}
          >
            <div className="">
              <p className="font-medium">
                Quiz {index + 1}: {quiz.question}
              </p>
              <div className="space-y-0.5 mt-1.5">
                <p className="font-medium text-sm">
                  Option 01: {quiz.options.option1}
                </p>
                <p className="font-medium text-sm">
                  Option 02: {quiz.options.option2}
                </p>
                <p className="font-medium text-sm">
                  Option 03: {quiz.options.option3}
                </p>
                <p className="font-medium text-sm">
                  Option 04: {quiz.options.option4}
                </p>
              </div>
            </div>
            <div className="flex flex-col justify-between items-end">
              <div className="flex items-center gap-2.5">
                {handlePublishedQuizDelete && (
                  <button onClick={() => setUpdateQuizOpen(quiz)} className="">
                    <BsPencilSquare className="text-lg text-gray-600" />
                  </button>
                )}
                <button
                  onClick={() => {
                    handleQuizDelete && handleQuizDelete(index),
                      handlePublishedQuizDelete &&
                        handlePublishedQuizDelete(quiz?._id);
                  }}
                  className=""
                >
                  <BsFillTrashFill className="text-lg text-red-600" />
                </button>
              </div>
              <p className="font-medium text-sm text-secondary">
                Correct Ans: {quiz.correctAns}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DisplayQuizzes;
