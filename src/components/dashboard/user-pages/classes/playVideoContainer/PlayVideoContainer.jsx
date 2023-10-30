import React, { useEffect } from "react";
import { BsPauseCircle } from "react-icons/bs";
import ReactPlayer from "react-player/youtube";

const PlayVideoContainer = ({ selectVideo }) => {
  const url = selectVideo?.url || selectVideo?.vurl;

  // console.log(selectVideo);
  useEffect(() => {
    // document.getElementsByClassName("ytp-watch-later-button ytp-button ytp-show-watch-later-title")[0].style?.display = 'none'
    // const copyIcon = document.getElementsByClassName("ytp-button ytp-copylink-button ytp-show-copylink-title ytp-copylink-button-visible");
    // // console.log(copyIcon)
    // const iframe = document.getElementById('ytplayer');
    // iframe.onload = function() {
    //   let innerDoc = iframe.contentDocument || iframe.contentWindow.document;
    //   console.log(innerDoc)
    //   console.log("first")
    //   // Access the content within the iframe
    //   const iframeContent = iframe.contentDocument || iframe.contentWindow.document;

    //   // Find the element with class name 'ytp-gradient-top' inside the iframe content
    //   const gradientTopElement = iframe.querySelector('.ytp-gradient-top');
    //   console.log(gradientTopElement)

    //   // if (gradientTopElement) {
    //   //   // You have successfully found the element
    //   //   // console.log(gradientTopElement);
    //   // } else {
    //   //   console.error("Element with class 'ytp-gradient-top' not found inside the iframe.");
    //   // }
    // };
  }, [selectVideo]);
  
  return (
    <div className="w-full h-96 py-2 md:p-5 order-1 md:order-2 ">
      <div className="w-full h-full relative overflow-x-hidden">
        {/* <iframe
        id="ytplayer"
          width="100%"
          height="100%"
          className="w-full h-[250px] sm:h-[350px] xl:h-[460px] 2xl:h-[500px] rounded-md z-40"
          src={url+"?controls=0&rel=0&showinfo=0&modestbranding=0"}
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;"
          allowFullScreen
          loading='eager'
        ></iframe> */}
        <ReactPlayer
          url={url}
          className='react-player'
          width='100%'
          height='100%'
          playing={true}
          onContextMenu={(e) => e.preventDefault()}
          config={{
            youtube: {
              playerVars: {
                controls: 1, // 1 to display the YouTube player controls
                modestbranding: 1, // 1 to enable modest branding
                showinfo: 0, // 0 to hide video title and other information
                disablekb: 1 //1 for disable all keys
              },
            },
          }}
        />
        <div className="w-full absolute top-0 right-0 left-0 h-16 bg-transparent z-50"></div>
        <div className="w-full absolute bottom-0 right-0 left-[93%] h-16 bg-transparent z-50"></div>
      </div>
      <div className="mt-4 lg:mt-5 w-full bg-secondary py-4 px-3 lg:px-5 rounded-md bg-opacity-70">
        <h1 className="text-lg lg:text-xl font-medium text-white  flex items-center gap-2.5">
          <BsPauseCircle /> {selectVideo?.title}
        </h1>
      </div>
    </div>
  );
};

export default PlayVideoContainer;
