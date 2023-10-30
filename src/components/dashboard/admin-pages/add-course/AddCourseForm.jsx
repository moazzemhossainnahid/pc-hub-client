"use client";
import React, { useState } from "react";
import CourseInfoForm from "./CourseInfoForm";
import CourseContentForm from "./CourseContentForm";
import { useGetSingleUserQuery } from "@/redux/api/apiSlice";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import Spinner from "@/components/common/loader/SmallSpinner";
import { getUserInfo } from "@/ults/getUserInfo";

const imgUploadToken = process.env.NEXT_PUBLIC_IMG_HOSTING_KEY;

const AddCourseForm = () => {
  const [addCourseContent, setAddCourseContent] = useState(false);
  const [courseInfo, setCourseInfo] = useState({});

  const { email, token } = getUserInfo();
  const { data, isLoading, error } = useGetSingleUserQuery({ email, token });
  if (isLoading) {
    return <Spinner />;
  }
  const user = data?.data;
  // handle form submit
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const data = Object.fromEntries(form.entries());
    const {
      totalLessons,
      thumbnail,
      price,
      certificate_details,
      for_whom,
      description,
      discountPrice,
      ...all
    } = data;
    const img_hosting_url = `https://api.imgbb.com/1/upload?key=${imgUploadToken}`;
    const formData = new FormData();
    formData.append("image", thumbnail);
    fetch(img_hosting_url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((res) => {
        const course = {
          ...all,
          details: {
            description,
            for_whom,
            certificate_details,
          },
          price: parseFloat(price),
          totalLessons: parseInt(totalLessons),
          discountPrice: parseFloat(discountPrice),
          thumbnail: res.data.display_url,
        };
        setCourseInfo(course);
        setAddCourseContent(true);
      });
  };
  // handle course content submit
  const handleCourseLessonsSubmit = async (lessons) => {
    const course = {
      ...courseInfo,
      instructor: user?._id,
      files: lessons,
    };
    const addCourse = await fetch(
      "https://lms-server-sigma.vercel.app/api/v1/courses/add-course",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        body: JSON.stringify(course),
      }
    );
    const data = await addCourse.json();
    if (data.success) {
      Swal.fire({
        icon: "success",
        title: "Course Added Successfully",
        showConfirmButton: false,
        timer: 1500,
      });
      setAddCourseContent(false);
    } else {
      toast.error(data.message);
    }
  };
  return (
    <section className="w-full p-6 mx-auto bg-gray-50 rounded-md shadow-md  h-full">
      <h1 className="text-xl font-bold text-secondary capitalize">
        {addCourseContent ? "Add Course Lessons" : "Add Course Info"}
      </h1>
      {addCourseContent ? (
        <CourseContentForm
          handleCourseLessonsSubmit={handleCourseLessonsSubmit}
        ></CourseContentForm>
      ) : (
        <CourseInfoForm handleFormSubmit={handleFormSubmit} />
      )}
    </section>
  );
};

export default AddCourseForm;
