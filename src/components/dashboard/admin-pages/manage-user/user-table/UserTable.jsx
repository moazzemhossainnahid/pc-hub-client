"use client";
import React from "react";
import UserRow from "../user-row/UserRow";
import {
  useGetAllUsersQuery,
  useGetSingleUserQuery,
} from "@/redux/api/apiSlice";
import Swal from "sweetalert2";
import { getUserInfo } from "@/ults/getUserInfo";

const UserTable = () => {

  const { email, token } = getUserInfo();
  const { data, error, refetch } = useGetAllUsersQuery({token});
  const { data: singleUser, isLoading } = useGetSingleUserQuery({
    email,
    token,
  });
  const loggedUser = singleUser?.data;
  if (isLoading) {
    return <div>Loading...</div>;
  }
  let users = data?.data;
  if(loggedUser?.role === "instructor"){
    users = users?.filter((user) => user.role === "student");
  }
  const Instructor = users?.filter((user) => user.role === "instructor");
  const superAdmin = users?.filter((user) => user.role === "super_admin");
  const student = users?.filter((user) => user.role === "student");
  const user = users?.filter((user) => user.role === "user");
  // handle delete user
  const handleDeleteUser = (id) => {
    Swal.fire({
      title: "Do you want to delete this User?",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it",
      denyButtonText: `Cancel`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await fetch(
          `https://lms-server-sigma.vercel.app/api/v1/users/${id}`,
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
            title: "User Deleted Successfully",
            showConfirmButton: false,
            timer: 1500,
          });
          refetch();
        } else {
          Swal.fire({
            icon: "error",
            title: "Something Went Wrong!",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      }
    });
  };
  // update user role
  const updateUserRole = async (id, role) => {
    Swal.fire({
      title: "Do you want to update role?",
      showCancelButton: true,
      confirmButtonText: "Yes, update it",
      denyButtonText: `Cancel`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await fetch(
          `https://lms-server-sigma.vercel.app/api/v1/users/change-role/${id}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `${token}`,
            },
            body: JSON.stringify({
              role: role,
            }),
          }
        );
        const data = await res.json();
        if (data.success) {
          Swal.fire({
            icon: "success",
            title: "User Role Updated Successfully",
            showConfirmButton: false,
            timer: 1500,
          });
          refetch();
        } else {
          Swal.fire({
            icon: "error",
            title: "Something Went Wrong!",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      }
    });
  };
  return (
    <div className="w-full">
      <div className="flex justify-between items-center">
        <h4 className="text-lg font-medium text-secondary">All Users</h4>
        {loggedUser?.role === "super_admin" && (
          <p className="text-sm text-secondary font-medium">
            Total {users?.length} ({user?.length} users,{student?.length}{" "}
            Student, {Instructor?.length} Instructor, {superAdmin?.length} Super
            Admin )
          </p>
        )}
        {loggedUser?.role === "instructor" && (
          <p className="text-sm text-secondary font-medium">
            {student?.length} Student
          </p>
        )}
      </div>
      <div>
        <div className="overflow-x-auto ">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>No.</th>
                <th>User Name</th>
                <th>Email</th>
                <th>Role</th>
                {loggedUser?.role == "super_admin" && <th>Action</th>}
              </tr>
            </thead>
            <tbody>
              {users?.map((user, index) => (
                <UserRow
                  key={index}
                  index={index}
                  user={user}
                  loggedUser={loggedUser}
                  handleDeleteUser={handleDeleteUser}
                  updateUserRole={updateUserRole}
                ></UserRow>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserTable;
