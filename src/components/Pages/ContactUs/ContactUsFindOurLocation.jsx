import ContactUsSectionHeader from "./UI/ContactUsSectionHeader";
import ContactUsSectionText from "./UI/ContactUsSectionText";
import ContactUsSectionTitle from "./UI/ContactUsSectionTitle";

const ContactUsFindOurLocation = () => {
  return (
    <div className="text-center">
      <ContactUsSectionHeader text={"MAPS & DIRECTIONS"} />
      <ContactUsSectionTitle text={"Find Our Location In Town"} />
      <ContactUsSectionText
        text={
          "Search for our exact location and office address through this exclusive map listing provided below."
        }
      />
    </div>
  );
};

export default ContactUsFindOurLocation;
