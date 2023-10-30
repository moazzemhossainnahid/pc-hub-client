import Link from 'next/link';
import React from 'react';
import { BsPencilSquare } from 'react-icons/bs';

const ProfileTemplate = ({user}) => {
    const date = new Date(user?.createdAt).toLocaleString();
    const role = user?.role;
    return (
        <div className='w-full h-full py-3 px-4 lg:pt-6 lg:px-7 bg-gray-50 rounded'>
            <div className='text-base md:text-lg font-semibold text-secondary pb-1.5 border-b flex items-center justify-between'>
            <h1>My Profile</h1>
            <Link href={role === "super_admin" || role === "instructor" ? "/admin/settings" : "/user/settings"}><BsPencilSquare className="text-lg text-gray-600 hover:text-secondary" /></Link>
            </div>
            <div className="py-5 w-full grid grid-cols-2">
                <div className="space-y-4">
                    <h1 className=' text-gray-500'>Registration Date </h1>
                    <h1 className=' text-gray-500'>Full Name </h1>
                    <h1 className=' text-gray-500'>UserId </h1>
                    <h1 className=' text-gray-500'>Role </h1>
                    <h1 className=' text-gray-500'>Email </h1>
                    <h1 className=' text-gray-500'>Phone Number </h1>
                    <h1 className=' text-gray-500'>Skill/Occupation </h1>
                    <h1 className=' text-gray-500'>Age Range </h1>
                    <h1 className=' text-gray-500'>Address </h1>
                    <h1 className=' text-gray-500'>Biography </h1>
                </div>
                <div className="space-y-4">
                    <h1 className=' text-gray-500'>{date || "N/A"}</h1>
                    <h1 className=' text-gray-500'>{user?.name || "N/A"} </h1>
                    <h1 className=' text-gray-500'>{user?._id || "N/A"} </h1>
                    <h1 className=' text-gray-500'>{user?.role || "N/A"} </h1>
                    <h1 className=' text-gray-500'>{user?.email || "N/A"} {user?.emailVerified && <span className='text-xs font-normal text-green-600 bg-green-200 px-1.5 rounded-full py-0.5'>Verified</span>}</h1>
                    <h1 className=' text-gray-500'>{user?.phoneNumber || "N/A"} </h1>
                    <h1 className=' text-gray-500'>{user?.skill || "N/A"} </h1>
                    <h1 className=' text-gray-500'>{user?.age || "N/A"} </h1>
                    <h1 className=' text-gray-500'>{user?.address || "N/A"} </h1>
                    <h1 className=' text-gray-500'>{user?.bio || "N/A"} </h1>
                </div>
            </div>
        </div>
    );
};

export default ProfileTemplate;