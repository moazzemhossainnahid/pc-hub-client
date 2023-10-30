"use client";
import React from "react";
import { Fragment } from "react";
import { Tab } from "@headlessui/react";
import ProfilePanel from "./tabsPanel/ProfilePanel";
import PasswordPanel from "./tabsPanel/PasswordPanel";
import SocialPanel from "./tabsPanel/SocialPanel";

const options = ["Profile", "Password", "Social Share"];

const SettingsTabs = () => {
  return (
    <div className="mt-5 md:mt-8">
      <Tab.Group>
        <Tab.List>
          {options?.map((option) => (
            <Tab as={Fragment} key={option}>
              {({ selected }) => (
                /* Use the `selected` state to conditionally style the selected tab. */
                <button
                  className={
                    selected
                      ? "bg-transparent text-secondary border-secondary focus:outline-none text-lg font-semibold px-5 lg:px-10 border-b-2 pb-1"
                      : "bg-transparent text-gray-500 hover:text-secondary text-lg font-semibold px-5 lg:px-10 border-b-2  pb-1"
                  }
                >
                  {option}
                </button>
              )}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel>
            <ProfilePanel/>
          </Tab.Panel>
          <Tab.Panel>
            <PasswordPanel/>
          </Tab.Panel>
          <Tab.Panel>
            <SocialPanel/>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default SettingsTabs;
