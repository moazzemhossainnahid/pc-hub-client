
const Subscribe = () => {
  return (
    <div className="h-[170px] my-12 md:my-14 lg:my-20 relative">
      <div className="max-width flex flex-col md:flex-row  justify-around items-center h-full ">
        <div>
          <h1 className="text-lg lg:text-2xl font-bold text-secondary">
            Subscribe
          </h1>
          <p className="text-lg lg:text-2xl text-secondary mt-2">For The Next Course Update</p>
        </div>
        <div className="h-[30%] w-full md:min-w-[348px] md:w-[30%] rounded bg-white flex items-center p-1 ">
            <input type="email" className=" h-full outline-none grow px-3 w-full" placeholder="Your E-mail"></input>
            <button className="text-sm h-full px-3.5 font-medium text-white rounded bg-gradient-to-r from-primary via-secondary to-accent hover:bg-gradient-to-l duration-500 transition-all">Subscribe</button>
        </div>
      </div>
      {/* background */}
      <div className="w-full h-full absolute bg-secondary bg-opacity-5 top-0 -z-[1] overflow-hidden">
        {/* shape */}
        <div className="hidden md:inline-block absolute top-0 left-0 -translate-y-1/3 translate-x-1/3 border border-[#6275FF4D] h-[300px] w-[300px] rounded-full"></div>
        <div className="hidden md:inline-block absolute top-0 left-14 -translate-y-1/3 translate-x-1/2  border border-[#6275FF4D] h-[150px] w-[150px] rounded-full"></div>
        <div className="absolute top-0 right-[20%] -translate-y-1/3  border border-[#6275FF4D] h-[180px] w-[180px] rounded-full"></div>
        <div className="absolute bottom-0 right-[7%] translate-y-2/3  border border-[#6275FF4D] h-[300px] w-[300px] rounded-full"></div>
      </div>
    </div>
  );
};

export default Subscribe;
