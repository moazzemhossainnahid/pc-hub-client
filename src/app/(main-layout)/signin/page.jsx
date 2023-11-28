"use client";

import InputField from "@/components/Forms/InputField";
import jwtTokenDecoder from "@/hooks/jwtTokenDecoder";
import setCookies from "@/hooks/setCookies";
// import userSingInSignUpSuccess from "@/hooks/userSingInSignUpSuccess";
import { useUserLoginMutation } from "@/redux/api/apiSlice";
import { t } from "i18next";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import Swal from "sweetalert2";

const Signin = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  if (token) {
    setCookies(token);
    router.push("/");
  }

  const [userLogin, { error }] = useUserLoginMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    try {
      const result = await userLogin({ data }).unwrap();
      // console.log(result);

      if (result.success) {
        const token = result?.data?.accessToken;
        if (token) {
          const decode = await jwtTokenDecoder(token);

          const credentials = {
            email: decode?.email,
            password: data.password,
            role: decode?.role,
            token,
            redirect: false,
          };

          const signInResult = await signIn("credentials", credentials);

          await setCookies(token);

          if (signInResult.error) {
            router.push('/signin')
          } else {
            Swal.fire({
              icon: "success",
              title: "",
              text: "You are successfully logged in",
              showConfirmButton: false,
              timer: 1500,
            })
            router.push("/");
          }
        }
      }
    } catch (error) {
      // console.log(error);

      Swal.fire({
        icon: "error",
        title: "Error",
        text: `${error.data.message}`,
      });
    }
  };

  return (
    // <div className="bg-white flex lg:flex-row flex-col gap-10 items-center justify-evenly py-20">
    //   <div>
    //     <Image
    //       src="/auth/Signin.png"
    //       width={600}
    //       height={600}
    //       alt="Sign Up Image"
    //     />
    //   </div>

    //   <div className="bg-gray-50 w-96 lg:w-[500px] shadow-xl border border-gray-100 rounded-xl p-5">
    //     <h1 className="text-3xl font-medium">{t("signInPage.signin")}</h1>

    //     <div className="pt-3">
    //       <button
    //         onClick={() =>
    //           signIn("google", {
    //             callbackUrl: "https://pc-hub.vercel.app/",
    //           })
    //         }
    //         className="flex items-center mb-2 justify-center transition ease-in-out delay-50 px-3 py-2.5 space-x-2 bg-white border border-slate-600 rounded-md hover:bg-primary/70 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-600 focus:ring-opacity-50 w-full hover:text-gray-100 text-gray-700"
    //       >
    //         <FcGoogle className="text-2xl" />
    //         <span className="font-medium">{t("signInPage.gLogin")}</span>
    //       </button>
    //       <p className="py-3 text-center">{t("signInPage.or")}</p>
    //     </div>

    //     <h3 className="py-3">{t("signInPage.eAuth")}</h3>
    //     <form className="space-y-5 mt-5" onSubmit={handleSubmit(onSubmit)}>
    //       {/* -------- Company Email  -------------*/}
    //       <InputField
    //         label={t("signInPage.yEmail")}
    //         id="email"
    //         placeholder={t("signInPage.typeYEmail")}
    //         type="email"
    //         register={register}
    //         errors={errors}
    //       />
    //       <p className="text-red-500 italic text-sm">
    //         {error?.data?.message.includes("User does not exist")
    //           ? t("signInPage.errEmail")
    //           : ""}
    //       </p>
    //       {/* -------------  password ---------- */}
    //       <InputField
    //         label={t("signInPage.yPass")}
    //         id="password"
    //         placeholder={t("signInPage.typeYPass")}
    //         type="password"
    //         register={register}
    //         errors={errors}
    //       />
    //       <p className="text-red-500 italic text-sm">
    //         {error?.data?.message.includes("Password does not match")
    //           ? t("signInPage.errPass")
    //           : ""}
    //       </p>
    //       <div className="">
    //         <Link
    //           href=""
    //           className="font-medium text-blue-900 hover:bg-blue-300 rounded-md p-2"
    //         >
    //           {t("signInPage.fPass")}
    //         </Link>
    //       </div>

    //       <button className="text-center w-full bg-primary hover:bg-secondary rounded-md text-white py-3 font-medium">
    //       {t("signInPage.signin")}
    //       </button>
    //       <Link
    //         href="/signup"
    //         className="text-sm text-blue-900 hover:text-accent rounded-md block mt-4"
    //       >
    //         {t("signInPage.createNew")}
    //       </Link>
    //     </form>
    //   </div>
    // </div>
    <></>
  );
};

export default Signin;
