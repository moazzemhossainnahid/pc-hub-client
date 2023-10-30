import React from "react";

const ContactUsApplyNowForm = () => {
  return (
    <form className="pt-6">
      <input
        className="block w-full h-10 pl-2 border-b-2 border-[#d8dada] my-5"
        type="text"
        name=""
        id=""
        placeholder="Your Name"
        autoComplete="off"
      />
      <input
        className="block w-full h-10 pl-2 border-b-2 border-[#d8dada] mb-5"
        type="email"
        name=""
        id=""
        placeholder="Email address"
      />
      <input
        className="block w-full h-10 pl-2 border-b-2 border-[#d8dada] mb-5"
        type="tel"
        name=""
        id=""
        placeholder="Phone number"
      />
      <input
        className="block h-10 px-7 bg-primary text-white uppercase mb-4 mt-8"
        type="submit"
        value="Send now"
      />
    </form>
  );
};

export default ContactUsApplyNowForm;
