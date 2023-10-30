"use client";
import { useGetQuizResultByStudentIdQuery, useGetSingleUserQuery } from "@/redux/api/apiSlice";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

const QuizzesContainer = ({ quizzes = [], email, token, id }) => {
  const [storeAns, setStoreAns] = useState([]);
  const [correctAns, setCorrectAns] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const { data, isLoading } = useGetSingleUserQuery({ email, token });
  const {data: quizResult, isLoading: quizResultLoading} = useGetQuizResultByStudentIdQuery({ courseId: id, studentId: data?.data?._id, token });
  useEffect(() => {
    if (quizResult?.data) {
      setShowResult(true);
      setCorrectAns(quizResult.data.result);
    }
  }, [quizResult?.data, quizResultLoading]);
  if (isLoading || quizResultLoading) {
    return <p>Loading...</p>;
  }
  const user = data?.data;
  // handle quiz submit
  const handleQuizSubmit = async (e) => {
    e.preventDefault();
    if (storeAns.length !== quizzes.length) {
      Swal.fire({
        icon: "info",
        title: "Please answer all questions!",
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }
    // check correct ans
    let correctAns = 0;
    storeAns.forEach((item) => {
      const quiz = quizzes.find((quiz) => quiz._id === item.id);
      if (quiz.correctAns === item.selectedAns) {
        correctAns++;
      }
    });
    const quizResult = {
      studentId: user._id,
      courseId: id,
      result: parseInt(correctAns),
      totalQuiz: quizzes.length,
    };
    // store result in database
    const res = await fetch(
      "https://lms-server-sigma.vercel.app/api/v1/quiz-results/addQuizResult",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(quizResult),
      }
    );
    const data = await res.json();
    if (data?.success) {
      Swal.fire({
        icon: "success",
        title: "Submit successfully!",
        toast: true,
        timer: 1500,
        timerProgressBar: false,
        showConfirmButton: false,
      });
      setCorrectAns(correctAns);
      setShowResult(true);
    }
    else{
      Swal.fire({
        icon: "error",
        title: "Submit failed!",
        timer: 1500,
        showConfirmButton: false,
      });
    }
  };
  // handle select quiz
  const handleSelectQuiz = (id, selectedAns) => {
    const quiz = {
      id,
      selectedAns,
    };
    const newStoreAns = [...storeAns];
    const index = newStoreAns.findIndex((item) => item.id === id);
    if (index === -1) {
      newStoreAns.push(quiz);
    } else {
      newStoreAns[index] = quiz;
    }
    setStoreAns(newStoreAns);
  };
  // checked={storeAns.find(item => item.id === quiz._id && item.selectedAns === quiz.options.option1)}
  return (
    <div className="w-full h-full  py-2 md:p-5 order-1 md:order-2">
      <div className="w-full h-full bg-secondary bg-opacity-70 rounded p-3 md:px-5 text-white flex items-center justify-between">
        <p>Total Quiz ({quizzes?.length})</p>
        <p>
          Answers {storeAns?.length}/{quizzes?.length}
        </p>
      </div>
      {showResult ? (
        <div className="w-full h-full mt-8 md:mt-14">
          <div className="w-[80%] md:w-[350px] md:h-[200px] mx-auto bg-gray-50 rounded-md flex flex-col items-center justify-center ">
            <h1 className="text-xl lg:text-2xl font-semibold text-primary">
              Your Result
            </h1>
            <p className="text-2xl lg:text-3xl font-bold mt-2 text-secondary mb-5">
              {correctAns}/{quizzes?.length}
            </p>
          </div>
          <Link href={"/user/dashboard"}>
            <div className="text-base font-semibold text-white bg-secondary px-4 py-1 rounded-md mt-8 mx-auto w-fit">
              Go to Dashboard
            </div>
          </Link>
        </div>
      ) : (
        <form
          className="pt-3 md:max-h-[80vh] overflow-y-auto"
          onSubmit={handleQuizSubmit}
        >
          {quizzes.map((quiz, index) => (
            <div
              className="w-full h-full mt-3 bg-opacity-70 rounded p-3 "
              key={quiz._id}
            >
              <div className="flex items-center gap-3">
                <div className="px-2 bg-secondary bg-opacity-80 rounded-full text-white flex justify-center items-center">
                  {index + 1}
                </div>
                <h1 className=" font-medium text-base lg:text-lg text-gray-700">
                  {quiz.question}
                </h1>
              </div>
              <div className="mt-4 ml-5 md:ml-8">
                <div className="flex items-center gap-1">
                  <input
                    type="radio"
                    className="accent-secondary opacity-80 cursor-pointer"
                    name={quiz._id}
                    onChange={() =>
                      handleSelectQuiz(quiz._id, quiz.options.option1)
                    }
                  ></input>
                  <label className="ml-2 text-gray-700 pb-0.5">
                    {quiz.options.option1}
                  </label>
                </div>
                <div className="flex items-center gap-1">
                  <input
                    type="radio"
                    name={quiz._id}
                    className="accent-secondary opacity-80 cursor-pointer"
                    onChange={() =>
                      handleSelectQuiz(quiz._id, quiz.options.option2)
                    }
                  ></input>
                  <label className="ml-2 text-gray-700 pb-0.5">
                    {quiz.options.option2}
                  </label>
                </div>
                <div className="flex items-center gap-1">
                  <input
                    type="radio"
                    className="accent-secondary opacity-80 cursor-pointer"
                    name={quiz._id}
                    onChange={() =>
                      handleSelectQuiz(quiz._id, quiz.options.option3)
                    }
                  ></input>
                  <label className="ml-2 text-gray-700 pb-0.5">
                    {quiz.options.option3}
                  </label>
                </div>
                <div className="flex items-center gap-1">
                  <input
                    type="radio"
                    className="accent-secondary opacity-80 cursor-pointer"
                    name={quiz._id}
                    onChange={() =>
                      handleSelectQuiz(quiz._id, quiz.options.option4)
                    }
                  ></input>
                  <label className="ml-2 text-gray-700 pb-0.5">
                    {quiz.options.option4}
                  </label>
                </div>
              </div>
            </div>
          ))}
          <div className={quizzes.length === 0 && "opacity-25 "}>
            <button
              className="bg-secondary bg-opacity-80 text-white px-3 py-1 rounded mt-7"
              disabled={quizzes.length === 0}
            >
              Submit
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default QuizzesContainer;
