"use client";
import { Disclosure } from "@headlessui/react";
import React from "react";
import {
  BsCircle,
  BsFillPlayFill,
  BsPauseCircle,
  BsReverseLayoutTextSidebarReverse,
} from "react-icons/bs";
import { FaChevronUp } from "react-icons/fa";

const ContentContainerClasses = ({ content, setSelectVideo, selectVideo, setQuizOpen}) => {
  return (
    <div className="mt-5 md:mt-6 space-y-5">
      {content?.map((lesson, index) => (
        <Disclosure
          as="div"
          className=" rounded shadow bg-secondary bg-opacity-50"
          key={index}
          defaultOpen={index === 0}
        >
          {({ open }) => (
            <>
              <Disclosure.Button className="flex w-full justify-between rounded  px-4 md:px-5 py-3 md:py-4 lg:py-5 text-left text-sm md:text-base font-medium text-gray-600 focus:outline-none ">
                <div>
                  <span className="flex items-center text-white">
                    <BsCircle className="inline-block mr-2 text-white" />
                    {lesson.title}
                  </span>
                </div>
                <FaChevronUp
                  className={`${
                    open ? "rotate-180 transform" : ""
                  } h-5 w-5 text-secondary`}
                />
              </Disclosure.Button>
              <Disclosure.Panel className=" pb-2 text-sm text-gray-500">
                {/* content head */}
                <div className="py-2.5 bg-secondary text-white px-4 md:px-5 flex items-center justify-between">
                  <div className="text-base font-semibold flex items-center gap-2">
                    <BsReverseLayoutTextSidebarReverse></BsReverseLayoutTextSidebarReverse>
                    Lesson Content ({lesson?.details?.length})
                  </div>
                </div>
                {/* content */}
                <div className="px-1 md:px-2 py-2.5 ">
                  {lesson?.details?.map((detail, index) => (
                    <button
                      onClick={() => (setSelectVideo(detail), setQuizOpen(false))}
                      className={`w-full py-3 md:py-5 px-2 rounded cursor-pointer ${
                        detail?.title === selectVideo?.title
                          ? "bg-secondary bg-opacity-70 "
                          : " "
                      }`}
                      key={index}
                    >
                      <span
                        className={`flex text-start items-center group  text-sm md:text-base text-white`}
                      >
                        {detail?.title === selectVideo?.title ? (
                          <BsPauseCircle className="inline-block mr-2 w-5 h-5 " />
                        ) : (
                          <BsFillPlayFill className="inline-block mr-2 w-6 h-6 " />
                        )}
                        {detail?.title}
                      </span>
                    </button>
                  ))}
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      ))}
        <div onClick={()=> setQuizOpen(true)} className="flex w-full justify-between px-4 md:px-5 py-3 md:py-4 lg:py-5 text-left text-sm md:text-base font-medium text-gray-600 focus:outline-none rounded shadow bg-secondary bg-opacity-50 cursor-pointer">
          <span className="flex items-center text-white">
            <BsCircle className="inline-block mr-2 text-white" />
            Quizzes
          </span>
        </div>
    </div>
  );
};

export default ContentContainerClasses;
