import ContactUsAddressItem from "./UI/ContactUsAddressItem";
import ContactUsAnimateUnderline from "./UI/ContactUsAnimateUnderline";
import ContactUsSectionText from "./UI/ContactUsSectionText";
import ContactUsSectionTitle from "./UI/ContactUsSectionTitle";
import { PiMapPinBold } from "react-icons/pi";
import { AiOutlinePhone } from "react-icons/ai";
import { BsClock } from "react-icons/bs";
import ContactUsApplyNowForm from "./UI/ContactUsApplyNowForm";
import Image from "next/image";
const GetInTouch = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-28 my-24 mx-6 max-width">
      {/* ......................Get in touch...................  */}

      <div>
        <ContactUsSectionTitle text={"Get in touch"} />
        <ContactUsAnimateUnderline />
        <ContactUsSectionText
          text={
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, do eiusmod tempor incididunt ut labore et dolore"
          }
        />
        <div>
          <ContactUsAddressItem
            icon={<PiMapPinBold className="text-[#ff2d55] font-bold" />}
            text={"457 BIgBlue Street, NY 10013"}
          />
        </div>
        <div>
          <ContactUsAddressItem
            icon={<PiMapPinBold className="text-[#ff2d55] font-bold" />}
            text={"998 Some Street, LA 10013"}
          />
        </div>
        <div>
          <ContactUsAddressItem
            icon={<PiMapPinBold className="text-[#ff2d55] font-bold" />}
            text={"457 BIgBlue Street, NY 10013"}
          />
        </div>
        <div>
          <ContactUsAddressItem
            icon={<AiOutlinePhone className="text-[#ff2d55] font-bold" />}
            text={"+44 300 303 0266"}
          />
        </div>
        <div>
          <ContactUsAddressItem
            icon={<BsClock className="text-[#ff2d55] font-bold" />}
            text={"Mon - Sat 8.00 - 18.00"}
          />
        </div>
      </div>
      {/* ......................Apply now Form...................  */}
      <div>
        {/* <ContactUsSectionTitle text={"Apply now"} />
        <ContactUsApplyNowForm /> */}

        <Image
          src={"https://i.ibb.co/6vWz45r/Support.png"}
          alt="sideimg"
          width={800}
          height={600}
          className="w-full h-full max-h-[530px] max-w-[624px]"
        ></Image>
      </div>
    </div>
  );
};

export default GetInTouch;
