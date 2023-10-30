"use client";
import React, { useState } from "react";
import { BsFillTrashFill } from "react-icons/bs";
import SelectAndAddModuleName from "../../common/SelectAndAddModuleName";

const LiveClassAddContent = ({ handleAddClassSubmit, classInfoAddPending }) => {
  const [lessons, setLessons] = useState([]);
  const [allModulesName, setAllModulesName] = useState([]);
  const [addNewModuleOpen, setAddNewModuleOpen] = useState(false);
  // handle form submit
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const data = Object.fromEntries(form.entries());
    const { lesson: topic, title, video } = data;
    const checkLessonExists = lessons.find((item) => item?.topic === topic);
    if (!checkLessonExists) {
      setAddNewModuleOpen(false);
      setAllModulesName([...allModulesName, topic]);
    }
    if (checkLessonExists) {
      const newLessons = lessons.map((item) => {
        if (item.topic === topic) {
          return {
            ...item,
            details: [
              ...item.details,
              {
                title: title,
                vurl: video,
              },
            ],
          };
        }
        return item;
      });
      setLessons(newLessons);
      e.target.reset();
      return;
    } else {
      const singleLessons = {
        topic: topic,
        details: [
          {
            title: title,
            vurl: video,
          },
        ],
      };
      const files = [...lessons, singleLessons];
      setLessons(files);
      e.target.reset();
    }
  };
  // handle lesson delete
  const handleLessonDelete = (lesson, index) => {
    const newLessons = lessons.map((item) => {
      if (item?.title === lesson?.title) {
        const newDetails = item?.details?.filter((item, i) => i !== index);
        // if details is empty then delete lesson
        if (newDetails?.length === 0) {
          return null;
        }
        return {
          ...item,
          details: newDetails,
        };
      }
      return item;
    });
    const filteredLessons = newLessons?.filter((item) => item !== null);
    if (filteredLessons?.length > 0) {
      setLessons(filteredLessons);
      return;
    }
    setLessons(newLessons);
  };
  return (
    <div>
      <form
        onSubmit={handleFormSubmit}
        className="grid grid-cols-1 gap-4 mt-3 sm:grid-cols-2"
      >
        <SelectAndAddModuleName
          allModulesName={allModulesName}
          setAddNewModuleOpen={setAddNewModuleOpen}
          addNewModuleOpen={addNewModuleOpen}
        ></SelectAndAddModuleName>
        <div>
          <label className="text-dark font-medium" for="title">
            Video Title
          </label>
          <input
            id="title"
            type="text"
            name="title"
            className="block w-full px-3 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded  focus:border-secondary  focus:outline-none"
          />
        </div>
        <div>
          <label className="text-dark font-medium" for="video">
            Video Link
          </label>
          <div className="flex items-center gap-2">
            <input
              id="video"
              type="text"
              name="video"
              className="block w-full px-3 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded  focus:border-secondary  focus:outline-none"
            />
          </div>
        </div>
        <button
          type="submit"
          className="py-2  mt-auto  w-full h-[42px] text-sm  leading-5 text-white transition-colors duration-200 transform bg-secondary rounded hover:bg-accent font-medium focus:outline-none "
        >
          Add Video
        </button>
      </form>
      <div className="mt-5 w-full border h-fit">
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>Lesson</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              {/* row */}
              {lessons?.map((lesson, index) => (
                <tr key={index}>
                  <th className="flex items-start">{lesson?.topic}</th>
                  <td>
                    <div className="flex items-center justify-between mb-3 font-semibold">
                      <p>Title</p>
                      <p>Video</p>
                    </div>
                    {lesson?.details?.map((item, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center border-b py-1"
                      >
                        <p className="text-dark font-medium">{item?.title}</p>
                        <div className="text-dark font-medium flex items-center gap-2">
                          {item?.vurl}
                          <button
                            onClick={() => handleLessonDelete(lesson, index)}
                          >
                            <BsFillTrashFill className="text-base text-red-600" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex justify-end mt-12">
        <button
          onClick={() => handleAddClassSubmit(lessons)}
          type="submit"
          className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-secondary rounded hover:bg-accent font-medium focus:outline-none"
        >
          {classInfoAddPending ? "Pending..." : "Ready to publish"}
        </button>
      </div>
    </div>
  );
};

export default LiveClassAddContent;
