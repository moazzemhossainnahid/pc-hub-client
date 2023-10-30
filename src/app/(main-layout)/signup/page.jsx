"use client";

import InputField from "@/components/Forms/InputField";
import { useUserSignUpMutation } from "@/redux/api/apiSlice";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import Swal from "sweetalert2";

const SignUp = () => {
  const [userSignUp, { error }] = useUserSignUpMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    const { name, email, password, confirmPassword } = data;

    if (data && password !== confirmPassword) {
      Swal.fire({
        title: "Error",
        text: "Confirm password doesn't match, check again",
        icon: "error",
        confirmButtonText: "OK",
      });
    } else {
      const userData = {
        name,
        email,
        password,
      };

      const response = await userSignUp({ data: userData }).unwrap();
      // console.log(response);

      if (response.success) {
        reset();

        Swal.fire({
          title: "Success!",
          text: response.message,
          icon: "success",
          confirmButtonText: "Open Gmail",
          showCancelButton: true,
          cancelButtonText: "Close",
        }).then((result) => {
          if (result.isConfirmed) {
            window.open(
              `https://mail.google.com/mail/u/0/#inbox?compose=new&to=${response?.data.email}`,
              "_blank"
            );
          }
        });
      } else {
        Swal.fire({
          title: "Error",
          text: "An error occurred during sign-up. Please try again later",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    }
  };

  return (
    <div className=" bg-white flex lg:flex-row flex-col gap-10 items-center justify-evenly py-20">
      <div>
        <Image
          src="auth/Signup.svg"
          width={600}
          height={600}
          alt="Sign Up Image"
        />
      </div>

      <div className="bg-gray-50 w-96 lg:w-[500px] shadow-xl border border-gray-100 rounded-xl p-5">
        <h1 className="text-3xl font-medium">স্বাগতম</h1>

        <div className="pt-3">
          <button
            onClick={() =>
              signIn("google", {
                callbackUrl: "https://dminstitutebd.vercel.app/",
              })
            }
            className="flex items-center mb-2 justify-center transition ease-in-out delay-50 px-3 py-2.5 space-x-2 bg-white border border-slate-600 rounded-md hover:bg-primary/70 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-600 focus:ring-opacity-50 w-full hover:text-gray-100 text-gray-700"
          >
            <FcGoogle className="text-2xl" />
            <span className=" font-medium ">গুগল দিয়ে সাইন আপ করুন </span>
          </button>
          <p className="py-3 text-center">অথবা</p>
        </div>

        <h3 className="py-3">আপনার সম্পর্কে প্রয়োজনীয় তথ্য দিন</h3>

        <form className="space-y-5 mt-5" onSubmit={handleSubmit(onSubmit)}>
          {/* -------- name ---------  */}
          <InputField
            label="আপনার নাম"
            id="name"
            placeholder="এখানে আপনার পুরো নাম লিখুন"
            type="text"
            register={register}
            errors={errors}
          />
          {/* -------- Company Email  -------------*/}
          <InputField
            label=" আপনার ইমেল"
            id="email"
            placeholder="এখানে আপনার ইমেল'টি লিখুন"
            type="email"
            register={register}
            errors={errors}
          />
          <p className="text-red-500">
            {error?.data?.message.includes(
              "E11000 duplicate key error collection"
            )
              ? "এই ইমেইল দিয়ে আগে একাউন্ট খোলা হয়েছে"
              : ""}
          </p>
          {/* -------------  password ---------- */}

          <div>
            <label className="mt-4 block text-base leading-relaxed text-zinc-900">
              আপনার পাসওয়ার্ড
            </label>
            <input
              className="w-full placeholder:italic placeholder:text-sm placeholder:text-zinc-400 px-4 py-3 rounded-md text-gray-800 border border-gray-700 bg-gray-50"
              placeholder="এখানে পাসওয়ার্ড লিখুন"
              type="password"
              {...register("password", {
                required: true,
                pattern: {
                  value:
                    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/,
                  message:
                    "Password must contain Minimum 6 characters, at least one letter, one number and one special character",
                },
              })}
            />
            {errors.password && (
              <p className="text-red-500">{errors.password.message}</p>
            )}
          </div>
          {/* -------------  confirm password ---------- */}
          <InputField
            label="পুনরায় পাসওয়ার্ড লিখুন"
            id="confirmPassword"
            placeholder="পাসওয়ার্ড কনফার্ম করুন"
            type="password"
            register={register}
            errors={errors}
          />

          <button className="text-center w-full bg-primary hover:bg-secondary rounded-md text-white py-3 font-medium">
            সাইন আপ
          </button>
          <Link
            href="/signin"
            className="text-sm text-primary hover:text-accent rounded-md block mt-4"
          >
            আগে থেকেই একাউন্ট আছে?
          </Link>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
