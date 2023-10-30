"use client";
import React from "react";
import { BsPersonCircle } from "react-icons/bs";
import { FaRegStar, FaStar } from "react-icons/fa";
import Rating from "react-rating";

const ManageReviewCard = ({ review, handleDeleteReview }) => {
  const date = new Date(review?.createdAt).toLocaleString();
  return (
    <div className="px-3 lg:px-4 py-2 lg:py-3.5 rounded-md bg-white space-y-0.5 relative">
      <div className="text-base lg:text-lg font-medium text-secondary flex items-center gap-1.5">
        <BsPersonCircle className="w-7 h-7" />{" "}
        <div className="flex flex-col ">
          {review?.studentId?.name}
          <p className="text-[10px] text-gray-500 -mt-2.5">{date}</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Rating
          emptySymbol={<FaRegStar className="text-yellow-400" />}
          fullSymbol={<FaStar className="text-yellow-400" />}
          fractions={2}
          initialRating={review?.rating}
          className="space-x-1"
          readonly
        />
        <p className="text-yellow-500 mb-0.5">({review?.rating})</p>
      </div>
      <p className="text-sm text-gray-500">{review?.description}</p>
      {/* action btn */}
      <div className="absolute top-2 right-2 flex items-center gap-2 md:gap-3">
        <button onClick={()=> handleDeleteReview(review?._id)} className="text-xs text-red-500 hover:underline">Delete</button>
      </div>
    </div>
  );
};

export default ManageReviewCard;
