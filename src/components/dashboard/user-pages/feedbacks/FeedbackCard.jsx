"use client";
import { useGetSingleCourseQuery } from "@/redux/api/apiSlice";
import React, { useState } from "react";
import { FaRegStar, FaStar } from "react-icons/fa";
import Rating from "react-rating";

const FeedbackCard = ({ review, handleDeleteReview, handleEditReview }) => {
  const [updatedRating, setUpdatedRating] = useState(review?.rating);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const { data, isLoading } = useGetSingleCourseQuery(review?.courseId);
  if (isLoading) return <p>Loading...</p>;
  const course = data?.data;
  const date = new Date(review.createdAt).toLocaleString();
  // handle update review
  const updateReview = () => {
    setIsEditOpen(!isEditOpen);
  };
  // discard changes
  const discardChanges = () => {
    setIsEditOpen(!isEditOpen);
    setUpdatedRating(review.rating);
  };
  // update review confirm 
  const updateReviewConfirm = () => {
    const description = document.getElementById("description").value;
    const updatedReview = {
      ...review,
      description: description,
      rating: updatedRating,
    };
    handleEditReview(review._id, updatedReview);
    setIsEditOpen(!isEditOpen);
  }
  return (
    <div className="px-3 lg:px-4 py-2 lg:py-3.5 rounded-md bg-white space-y-0.5 relative">
      <h1 className="text-lg font-medium text-secondary">
        Course: {course?.title}
      </h1>
      <div className="flex items-center gap-2">
        {isEditOpen || (
          <>
            <Rating
              emptySymbol={<FaRegStar className="text-yellow-400" />}
              fullSymbol={<FaStar className="text-yellow-400" />}
              fractions={2}
              initialRating={review.rating}
              className="space-x-1"
              readonly
            />
            <p className="text-yellow-500 mb-0.5">({review.rating})</p>
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
        <p className="text-sm text-gray-500">{review.description}</p>
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
              onClick={() => handleDeleteReview(review._id)}
              className="text-xs text-red-500 hover:underline"
            >
              Delete
            </button>
          </>
        )}
        {
          isEditOpen && <>
          <button onClick={discardChanges} className="text-xs font-medium px-2.5 py-0.5 bg-gray-400 rounded-md text-white">Discard</button>
          <button onClick={updateReviewConfirm} className="text-xs font-medium px-2.5 py-0.5 bg-secondary rounded-md text-white">Update</button>
          </>
        }
      </div>
    </div>
  );
};

export default FeedbackCard;
