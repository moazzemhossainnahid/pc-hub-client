"use client";

import React from "react";
import cookies from 'js-cookie';
import { useTranslation } from "react-i18next";
import Navbar from "@/components/global/Navbar/Navbar";
import Footer from "@/components/global/Footer/Footer";

const languages = [
  {
    code: 'en',
    name: 'English',
    flag: 'us'
  },
  {
    code: 'bn',
    name: 'Bangla',
    flag: 'bd'
  }

]


const HomeLayout = ({ children }) => {

    
  const currentLanguageCode = cookies.get('i18next') || 'en';
  const { t } = useTranslation();

  return (
    <>
      <Navbar languages={languages} currentLanguageCode={currentLanguageCode} />
      <div className="min-h-screen h-full w-full">{children}</div>
      <Footer />
    </>
  );
};

export default HomeLayout;
