import AboutUsSectionText from "./AboutUsSectionText";

const AboutUsSuccessCard = ({ data }) => {
  const { icon, title, description } = data;
  return (
    <div className="py-20 space-y-7">
      <p className="text-5xl  text-[#4db276]"> {icon}</p>

      <h3 className="text-xl font-semibold leading-relaxed mb">{title}</h3>

      <AboutUsSectionText text={description} />
    </div>
  );
};

export default AboutUsSuccessCard;
