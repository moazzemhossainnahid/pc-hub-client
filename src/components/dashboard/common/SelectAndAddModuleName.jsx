"use client"
import React from 'react';
import { BsPlusCircleDotted } from 'react-icons/bs';

const SelectAndAddModuleName = ({addNewModuleOpen, allModulesName, setAddNewModuleOpen}) => {
    return (
        <>
            {addNewModuleOpen && (
          <div className="">
            <label className="text-dark font-medium" htmlFor="lessons">
              Module Name <span className="text-red-500">*</span>
            </label>
            <input
              id="lesson"
              type="text"
              name="lesson"
              placeholder="Ex: SEO Basics"
              className="block w-full px-3 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded  focus:border-secondary  focus:outline-none"
              required
            />
          </div>
        )}
        {addNewModuleOpen || (
          <div className="">
            <label className="text-dark font-medium" htmlFor="lessons">
              Select Module <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center w-full">
              <select
                name="lesson"
                className="block w-full px-3 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded  focus:border-secondary  focus:outline-none"
              >
                <option value="" disabled selected>
                  Select
                </option>
                {allModulesName?.map((item, index) => (
                  <option key={index} value={item}>
                    {item}
                  </option>
                ))}
              </select>
              <div
                className="w-fit px-2 flex items-center gap-1 cursor-pointer"
                onClick={() => setAddNewModuleOpen(true)}
              >
                <span className="text-xl font-bold p-0.5 rounded-full  ">
                  <BsPlusCircleDotted />
                </span>{" "}
                Add
              </div>
            </div>
          </div>
        )}
        </>
    );
};

export default SelectAndAddModuleName;