"use client";
import { useGetAllWebFeedbacksQuery } from "@/redux/api/apiSlice";
import React, { useState } from "react";
import { FaRegStar, FaStar } from "react-icons/fa";
import Rating from "react-rating";
import Swal from "sweetalert2";

const WebFeedbackCard = ({ review, token, webFeedbackRefetch, setInstituteFeedbackOpen }) => {
  const [updatedRating, setUpdatedRating] = useState(review?.rating);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const {refetch} = useGetAllWebFeedbacksQuery({ token })
  const date = new Date(review?.createdAt).toLocaleString();
  // handle update review
  const updateReview = () => {
    setIsEditOpen(!isEditOpen);
  };
  // discard changes
  const discardChanges = () => {
    setIsEditOpen(!isEditOpen);
    setUpdatedRating(review?.rating);
  };
  // update review confirm
  const updateReviewConfirm = async () => {
    const description = document.getElementById("description").value;
    const updatedReview = {
      ...review,
      description: description,
      rating: updatedRating,
    };
    const res = await fetch(
      `https://lms-server-sigma.vercel.app/api/v1/web-feedbacks/${review._id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        body: JSON.stringify(updatedReview),
      }
    );
    const data = await res.json();
    if (data.success) {
      Swal.fire({
        icon: "success",
        title: "Feedback updated!",
        timer: 1500,
        showConfirmButton: false,
      });
      refetch();
      webFeedbackRefetch();
      setIsEditOpen(!isEditOpen);
    } else {
      Swal.fire({
        icon: "error",
        title: "Something went wrong!",
        timer: 1500,
        showConfirmButton: false,
      });
    }
  };
  // delete review
  const handleDeleteReview = async () => {
    Swal.fire({
      title: "Do you want to delete this feedback?",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it",
      denyButtonText: `Cancel`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await fetch(
          `https://lms-server-sigma.vercel.app/api/v1/web-feedbacks/${review._id}`,
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
            title: "Feedback deleted!",
            timer: 1500,
            showConfirmButton: false,
          });
          webFeedbackRefetch();
        } else {
          Swal.fire({
            icon: "error",
            title: "Something went wrong!",
            timer: 1500,
            showConfirmButton: false,
          });
        }
      }
    });
  };
  return (
    <>
    {
        review ? <div className="px-3 lg:px-4 py-2 lg:py-3.5 rounded-md bg-white space-y-0.5 relative mt-4">
        <h1 className="text-lg font-medium text-secondary">
          Digital Marketing Institute BD
        </h1>
        <div className="flex items-center gap-2">
          {isEditOpen || (
            <>
              <Rating
                emptySymbol={<FaRegStar className="text-yellow-400" />}
                fullSymbol={<FaStar className="text-yellow-400" />}
                fractions={2}
                initialRating={review?.rating}
                className="space-x-1"
                readonly
              />
              <p className="text-yellow-500 mb-0.5">({review?.rating})</p>
            </>
          )}
          {isEditOpen && (
            <div className=" text-xl  flex items-center gap-2  mt-2">
              <h1 className="text-gray-600 font-medium text-base mb-1">
                Update Rating:
              </h1>
              <Rating
                emptySymbol={<FaRegStar className="text-yellow-400" />}
                fullSymbol={<FaStar className="text-yellow-400" />}
                fractions={2}
                value={updatedRating}
                initialRating={updatedRating}
                onChange={setUpdatedRating}
                className="space-x-1"
                isRequired
              />
              <p className="text-yellow-500 mb-0.5 text-base">
                ({updatedRating})
              </p>
            </div>
          )}
        </div>
        {isEditOpen || (
          <>
            <p className="text-sm text-gray-500">{review?.description}</p>
            <p className="text-sm text-gray-600 pt-2">{date}</p>
          </>
        )}
        {isEditOpen && (
          <textarea
            id="description"
            type="text"
            name="description"
            className="block w-full px-3 py-2 mt-1 text-gray-700 bg-white border border-gray-300 rounded  focus:border-secondary  focus:outline-none"
            rows="5"
            defaultValue={review.description}
            required
          />
        )}
        {/* action btn */}
        <div className="absolute top-2 right-2 flex items-center gap-2 md:gap-3">
          {isEditOpen || (
            <>
              <button
                onClick={updateReview}
                className="text-xs text-secondary hover:underline"
              >
                Edit
              </button>
              <button
                onClick={handleDeleteReview}
                className="text-xs text-red-500 hover:underline"
              >
                Delete
              </button>
            </>
          )}
          {isEditOpen && (
            <>
              <button
                onClick={discardChanges}
                className="text-xs font-medium px-2.5 py-0.5 bg-gray-400 rounded-md text-white"
              >
                Discard
              </button>
              <button
                onClick={updateReviewConfirm}
                className="text-xs font-medium px-2.5 py-0.5 bg-secondary rounded-md text-white"
              >
                Update
              </button>
            </>
          )}
        </div>
      </div> : <div className="mt-14 w-full text-center italic">
        No feedback given yet! <button onClick={()=> setInstituteFeedbackOpen(true)} className="text-blue-500 hover:underline italic">Give feedback</button>
      </div>
    }
    </>
  );
};

export default WebFeedbackCard;
