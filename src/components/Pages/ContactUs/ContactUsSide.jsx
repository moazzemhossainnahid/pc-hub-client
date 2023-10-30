import React from "react";
import ContactUsSectionHeader from "./UI/ContactUsSectionHeader";
import ContactUsSectionText from "./UI/ContactUsSectionText";
import ContactUsAnimateUnderline from "./UI/ContactUsAnimateUnderline";
import ContactUsSectionTitle from "./UI/ContactUsSectionTitle";

const ContactUsSide = () => {
  return (
    <div>
      <ContactUsSectionHeader text={"Contact Us"} />
      <ContactUsAnimateUnderline />

      <ContactUsSectionTitle
        text={"Are You Interested In Online Learning? Contact Us."}
      />
      <ContactUsSectionText
        text=" Contact our top-notch educationalist in the UK that has huge expertise
        in providing futuristic solutions to all aspiring students coming for
        higher education."
      />
      <h5 className="font-semibold">Brayden Backham</h5>
      <p>Director</p>
    </div>
  );
};

export default ContactUsSide;
