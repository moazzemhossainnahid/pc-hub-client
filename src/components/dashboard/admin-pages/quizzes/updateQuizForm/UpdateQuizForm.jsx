"use client";
import Cookies from "js-cookie";
import React, { useState } from "react";
import Swal from "sweetalert2";

const UpdateQuizForm = ({updateQuizOpen, setUpdateQuizOpen, selectedCourse, quizRefetch}) => {
  const [checkedCorrectAnswer, setCheckedCorrectAnswer] = useState(updateQuizOpen?.correctAns);
  const token = Cookies.get("accessToken");
  // handle update quiz form submit
  const handleFromSubmit = async(e) => {
    e.preventDefault();
    const question = e.target.question.value;
    const option1 = e.target.option1.value;
    const option2 = e.target.option2.value;
    const option3 = e.target.option3.value;
    const option4 = e.target.option4.value;
    const correctAns = checkedCorrectAnswer;
    const updatedQuiz = {
        _id: updateQuizOpen._id,
        question,
        options: {
            option1,
            option2,
            option3,
            option4
        },
        correctAns
    }
    // update quiz api
    const res = await fetch(`https://lms-server-sigma.vercel.app/api/v1/quizzes/${selectedCourse}/${updateQuizOpen._id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
        },
        body: JSON.stringify(updatedQuiz),
    });
    const data = await res.json();
    if (data.success) {
        Swal.fire({
            icon: "success",
            title: "Quiz updated successfully",
            showConfirmButton: false,
            timer: 1500,
        })
        quizRefetch();
        setUpdateQuizOpen(null);
    } else {
        Swal.fire({
            icon: "error",
            title: "Something went wrong",
            showConfirmButton: false,
            timer: 1500,
        })
    }
  };
  return (
    <form
      className="mt-5 space-y-4 shadow p-2 lg:p-5 rounded-md border"
      onSubmit={handleFromSubmit}
    >
      <h1 className="text-lg text-secondary text-center font-semibold">
        Update Quiz
      </h1>
      <div>
        <label className="text-dark font-medium" htmlFor="question">
          Previous Question
        </label>
        <input
          id="question"
          type="text"
          name="question"
          className="block w-full px-3 py-2 mt-1 text-gray-700 bg-white border border-gray-300 rounded  focus:border-secondary  focus:outline-none"
          defaultValue={updateQuizOpen?.question}
          required
        />
      </div>
      <div className="">
        <h1 className="text-dark font-semibold pt-2">Previous Options-</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 w-full mt-1">
          <div>
            <label className="text-dark font-medium" htmlFor="option1">
              A
            </label>
            <input
              id="option1"
              type="text"
              name="option1"
              className="block w-full px-3 py-2 mt-1 text-gray-700 bg-white border border-gray-300 rounded  focus:border-secondary  focus:outline-none"
                defaultValue={updateQuizOpen?.options.option1}
              required
            />
          </div>
          <div>
            <label className="text-dark font-medium" htmlFor="option2">
              B
            </label>
            <input
              id="option2"
              type="text"
              name="option2"
              className="block w-full px-3 py-2 mt-1 text-gray-700 bg-white border border-gray-300 rounded  focus:border-secondary  focus:outline-none"
                defaultValue={updateQuizOpen?.options.option2}
              required
            />
          </div>
          <div>
            <label className="text-dark font-medium" htmlFor="option3">
              C
            </label>
            <input
              id="option3"
              type="text"
              name="option3"
              className="block w-full px-3 py-2 mt-1 text-gray-700 bg-white border border-gray-300 rounded  focus:border-secondary  focus:outline-none"
                defaultValue={updateQuizOpen?.options.option3}
              required
            />
          </div>
          <div>
            <label className="text-dark font-medium" htmlFor="option4">
              D
            </label>
            <input
              id="option4"
              type="text"
              name="option4"
              className="block w-full px-3 py-2 mt-1 text-gray-700 bg-white border border-gray-300 rounded  focus:border-secondary  focus:outline-none"
                defaultValue={updateQuizOpen?.options.option4}
              required
            />
          </div>
        </div>
      </div>
      <div>
        <p className="text-dark font-medium">
          Which one is the correct answer?
        </p>
        <div className="flex items-center gap-4 mt-1">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              onClick={() => setCheckedCorrectAnswer("option1")}
              checked={"option1" === checkedCorrectAnswer}
            />
            <p className="text-dark font-medium" htmlFor="option1">
              A
            </p>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              onClick={() => setCheckedCorrectAnswer("option2")}
              checked={"option2" === checkedCorrectAnswer}
            />
            <p className="text-dark font-medium" htmlFor="option1">
              B
            </p>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              onClick={() => setCheckedCorrectAnswer("option3")}
              checked={"option3" === checkedCorrectAnswer}
            />
            <p className="text-dark font-medium" htmlFor="option1">
              C
            </p>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              onClick={() => setCheckedCorrectAnswer("option4")}
              checked={"option4" === checkedCorrectAnswer}
            />
            <p className="text-dark font-medium" htmlFor="option1">
              D
            </p>
          </div>
        </div>
      </div>
      <div className="flex justify-end pt-2  gap-3">
        <button
        onClick={()=> setUpdateQuizOpen(null)}
          type="submit"
          className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-gray-400 rounded hover:bg-accent font-medium focus:outline-none"
        >
          Discard Changes
        </button>
        <button
          type="submit"
          className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-secondary rounded hover:bg-accent font-medium focus:outline-none"
        >
          Update Quiz
        </button>
      </div>
    </form>
  );
};

export default UpdateQuizForm;
