import { imageTextLayoutData } from "@/temp-data/aboutUs";
import ImageTextLayoutCard from "./UI/ImageTextLayoutCard";

const ImageTextLayout = () => {
  return (
    <div className="  bg-[#f2f2f2]">
      {imageTextLayoutData?.map((data) => (
        <ImageTextLayoutCard key={data.id} data={data} />
      ))}
    </div>
  );
};

export default ImageTextLayout;
