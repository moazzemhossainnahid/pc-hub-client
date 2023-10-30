"use client";
import { LuBookOpenCheck } from "react-icons/lu";
import RatingFour from "../common/UI/RatingFour";
import DashboardProfileButton from "./UI/DashboardProfileButton";
import ProfilePhoto from "./UI/ProfilePhoto";
const DashboardUserProfile = ({ user }) => {
  return (
    <div className="bg-[#371e7c] py-5 border border-slate-200 rounded-xl">
      <div className="px-6 md:px-7 2xl:px-8 text-white  mx-auto">
        {/* info side  */}
        <div className="space-y-2">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold  ">
            {user?.name}
          </h1>
          <p className="text-sm font-semibold italic">
            <span className=" px-1 py-0.5 bg-purple-500 bg-opacity-10">
              {" "}
              {user?.email}
            </span>
          </p>
          <h2 className="text-xl md:text-2xl  font-bold ">
            <span className=" py-1 px-2 bg-purple-800">
              {user?.role === "student" && "Student"}
              {user?.role === "instructor" && "Instructor"}
              {user?.role === "super_admin" && "Admin"}
            </span>
          </h2>

          <div className="lg:flex  item-center justify-between pt-5">
            <div className="flex items-center gap-x-5">
              <ProfilePhoto image={user?.profileImg || "/images/adminProfilePhoto.png"} />
              {(user?.role === "instructor" || user?.role === "super_admin") && (
                <div className="italic">
                  <h5 className="font-lg font-semibold mb-2">Total Rating</h5>
                  <div className="flex item-center  gap-x-1">
                    <RatingFour />
                    <p className="mt-[-2px] font-bold">(346)</p>
                  </div>
                </div>
              )}
              {user?.role === "student" && (
                <div className="italic flex items-center gap-x-5">
                  <div>
                    <h5 className="font-lg font-semibold ">Enroll Courses</h5>
                    <div className="flex items-center gap-x-2 font-bold">
                      <LuBookOpenCheck />
                      <p className=" ">{user?.enrolledCourses?.length}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="mt-4">
              {user?.role === "student" && (
                <DashboardProfileButton
                  text="Go to course"
                  url="/user/running-course"
                />
              )}
              {user?.role === "instructor" && (
                <DashboardProfileButton
                  text="Publish new course"
                  url="/admin/add-course"
                />
              )}
              {user?.role === "super_admin" && (
                <DashboardProfileButton
                  text="Manage courses"
                  url="/admin/manage-courses"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardUserProfile;
