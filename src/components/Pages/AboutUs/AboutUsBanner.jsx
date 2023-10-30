// import from ""

const AboutUsBanner = () => {
  return (
    <div
      className="bg-cover bg-no-repeat aspect-auto"
      style={{
        backgroundImage: `url("./images/aboutUs/AboutUs-Banner.jpg")`,
      }}
    >
      <div className="bg-gradient-to-t from-black h-72 md:h-full">
        <div className=" text-white text-center lg:text-left  pt-[120px] lg:pt-[550px] pb-[10px]  lg:pb-[60px] max-width flex flex-col gap-y-4 lg:gap-y-8">
          <h3 className="text-xl text-semibold">Know Us Better</h3>
          <h1 className="text-5xl font-bold">About Us</h1>
        </div>
      </div>
    </div>
  );
};

export default AboutUsBanner;
