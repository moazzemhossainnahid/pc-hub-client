"use client";
import { useGetAllCoursesQuery, useGetAllPromoCodesQuery } from "@/redux/api/apiSlice";
import Image from "next/image";
import React, { useState } from "react";
import { BsTrashFill } from "react-icons/bs";
import SelectCourseOptions from "../../common/SelectCourseOptions";
import Swal from "sweetalert2";

const imgUploadToken = process.env.NEXT_PUBLIC_IMG_HOSTING_KEY;

const UpdateOffersCard = ({token}) => {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const { data, isLoading, error } = useGetAllCoursesQuery({});
  const {data: promoCodesData, refetch} = useGetAllPromoCodesQuery({token});
  if (isLoading) return <p>Loading...</p>;
  const courses = data?.data;
  const promoCodes = promoCodesData?.data;
  //   handle add new offer card
  const handleAddNewOfferCard = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const data = Object.fromEntries(form);
    if(!selectedCourse){
      return Swal.fire({
        icon: "error",
        title: "Please Select Course",
        showConfirmButton: false,
        timer: 1500,
      })
    }
    if(isNaN(data.discount)){
      return Swal.fire({
        icon: "error",
        title: "Please Enter Valid Discount Price",
        showConfirmButton: false,
        timer: 1500,
      })
    }
    const img_hosting_url = `https://api.imgbb.com/1/upload?key=${imgUploadToken}`;
    const formData = new FormData();
    formData.append("image", data.image);
    fetch(img_hosting_url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then(async(res) => {
        const card = {
          courseId: selectedCourse,
          promoCode: data.promoCode,
          discount: parseFloat(data.discount),
          image: res.data.display_url,
        };
        const resData = await fetch("https://lms-server-sigma.vercel.app/api/v1/promocodes/add-promocode", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
          body: JSON.stringify(card),
        });
        const resJson = await resData.json();
        if (resJson.success) {
          Swal.fire({
            icon: "success",
            title: "Offer Card Added Successfully",
            showConfirmButton: false,
            timer: 1500,
          })
          refetch();
          e.target.reset();
        }
        else{
          Swal.fire({
            icon: "error",
            title: "Offer Card Added Failed",
            showConfirmButton: false,
            timer: 1500,
          })
        }
      })
  };
  // delete offers card
  const handleDeleteCard = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this Offer Card!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, keep it",
    }).then(async(result) => {
      if (result.isConfirmed) {
        const resData = await fetch(`https://lms-server-sigma.vercel.app/api/v1/promocodes/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
        });
        const resJson = await resData.json();
        if (resJson.success) {
          Swal.fire({
            icon: "success",
            title: "Deleted Successfully",
            showConfirmButton: false,
            timer: 1500,
          })
          refetch();
        }
        else{
          Swal.fire({
            icon: "error",
            title: "Deleted Failed",
            showConfirmButton: false,
            timer: 1500,
          })
        }
      }
    })
  }
  return (
    <div className="mt-4">
      <h1 className="text-base md:text-lg font-semibold border-b pb-1 text-primary">
        Update Offers Card
      </h1>
      <form className="mt-3" onSubmit={handleAddNewOfferCard}>
        <p className=" font-semibold">All offers background images: </p>
        <div className="mt-2 flex items-center gap-x-3 flex-wrap gap-y-0">
          {
            promoCodes?.map((item, index) => (
              <div
                key={index}
                className="w-[100px] h-[150px] relative group transition-all duration-200 border"
              >
                <Image
                  src={item?.image}
                  alt="offers image"
                  width={100}
                  height={150}
                  className="h-full w-full"
                ></Image>
                {/* action here show when hover */}
                <div className="absolute top-0.5 right-0.5 hidden group-hover:inline-block transition-all duration-200">
                  <button onClick={()=> handleDeleteCard(item?._id)} className="px-1.5 py-1.5 bg-danger rounded text-red-400 bg-black bg-opacity-25 transition-all duration-200">
                    <BsTrashFill />
                  </button>
                </div>
              </div>
            ))
          }
        </div>
        <div className="w-full grid grid-cols-2 gap-x-5 h-fit mt-5">
          <div className=" h-full mt-4">
            <label className="text-dark font-medium" htmlFor="image">
              Add New BackGround
            </label>
            <input
              id="image"
              type="file"
              name="image"
              className="block w-full px-3 py-1.5 mt-1  text-gray-700 bg-white border border-gray-300 rounded  focus:border-secondary  focus:outline-none"
              required
            />
          </div>
          <SelectCourseOptions
            courses={courses}
            setSelectedCourse={setSelectedCourse}
            title={"Select Course"}
          ></SelectCourseOptions>
          <div className="h-full mt-4">
            <label className="text-dark font-medium" htmlFor="promoCode">
              Promo Code
            </label>
            <input
              id="promoCode"
              type="text"
              name="promoCode"
              placeholder="Enter Promo Code"
              className="block w-full px-3 py-2 mt-1 text-gray-700 bg-white border border-gray-300 rounded  focus:border-secondary  focus:outline-none"
              required
            />
          </div>
          <div className="h-full mt-4">
            <label className="text-dark font-medium" htmlFor="discount">
              Discount Price (BDT)
            </label>
            <input
              id="discount"
              type="text"
              name="discount"
              placeholder="Enter Discount Price"
              className="block w-full px-3 py-2 mt-1 text-gray-700 bg-white border border-gray-300 rounded  focus:border-secondary  focus:outline-none"
              required
            />
          </div>
        </div>
        <div className="w-full flex items-center justify-end mt-5">
          <button
            className="px-6 py-3 leading-5 text-white transition-colors duration-200 transform bg-secondary rounded hover:bg-accent font-medium focus:outline-none"
          >
            Add Offer Card
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateOffersCard;
