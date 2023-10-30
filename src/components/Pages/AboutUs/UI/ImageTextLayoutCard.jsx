import Image from "next/image";
import AboutUsSectionText from "./AboutUsSectionText";

const ImageTextLayoutCard = ({ data }) => {
  // Determine the CSS classes based on data.imageSideClass
  const imageClasses = data.imageSideClass === "right" ? "order-2" : "order-1";
  const textClasses = data.imageSideClass === "right" ? "order-1" : "order-2";

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 max-w-[1480px] mx-auto">
      <div className={`py-20 space-y-7 px-5 md:px-20 border border-slate-50 ${textClasses}`}>
        <p className="text-5xl"> {data.icon}</p>

        <h3 className="text-2xl font-bold leading-relaxed text-[#161616]">
          {data.title}
        </h3>
        <p className="text-justify leading-relaxed text-[#6B6B6B]">
          {data.description}
        </p>
      </div>
      <div className={`${imageClasses}`}>
        <Image
          className=""
          src={data?.image}
          layout="responsive"
          width={700}
          height={500}
          alt={data.title}
        />
      </div>
    </div>
  );
};

export default ImageTextLayoutCard;
