import { aboutUsSuccessdata } from "@/temp-data/aboutUs";
import AboutUsSuccessCard from "./UI/AboutUsSuccessCard";

const OurPrinciple = () => {
  return (
    <div
      className="bg-cover bg-no-repeat aspect-auto bg-center "
      style={{
        backgroundImage: `url("./images/aboutUs/Our-Philosophy.jpg")`,
      }}
    >
      <div className="bg-[#192f59] bg-opacity-90">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 my-20 max-width  text-white">
          {aboutUsSuccessdata?.map((data) => (
            <AboutUsSuccessCard key={data.id} data={data} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default OurPrinciple;
