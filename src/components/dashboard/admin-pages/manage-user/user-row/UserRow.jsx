"use client";
import Link from "next/link";
import React from "react";
import { FaTrashAlt } from "react-icons/fa";

const UserRow = ({
  user,
  index,
  updateUserRole,
  handleDeleteUser,
  loggedUser,
}) => {
  const { name, email, role, _id } = user;

  return (
    <tr className="bg-base-200">
      <th>{index + 1}</th>
      <td><Link href={`/admin/manage-users/${_id}`} className="hover:underline hover:text-primary">{name}</Link></td>
      <td>{email}</td>
      <td>{role}</td>
      {loggedUser?.role === "super_admin" && (
        <td>
          <div className="flex justify-around">
            <button
              onClick={() => updateUserRole(_id, "user")}
              className={`text-sm px-2 py-1 text-white font-medium  ${
                role === "user" || role === "super_admin" || role === "student" || role === "instructor"
                  ? "bg-slate-400"
                  : "bg-secondary hover:text-blue-600"
              }`}
              disabled={role === "user" || role === "super_admin" || role === "student" || role === "instructor"}
            >
              User
            </button>
            <button
              onClick={() => updateUserRole(_id, "instructor")}
              className={`text-sm px-2 py-1 text-white font-medium  ${
                role === "instructor" || role === "super_admin"
                  ? "bg-slate-400"
                  : "bg-blue-600 hover:text-secondary"
              }`}
              disabled={role === "instructor" || role === "super_admin"}
            >
              Instructor
            </button>
            <button
              onClick={() => handleDeleteUser(_id)}
            >
              <FaTrashAlt
                className={`w-5 h-5 text-red-500
                  `}
              ></FaTrashAlt>
            </button>
          </div>
        </td>
      )}
    </tr>
  );
};

export default UserRow;
