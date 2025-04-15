import React, { useState } from "react";
import { PlayCircleIcon, EyeIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

const ProjectCard = ({ image_url, title, description, gitUrl, previewUrl }) => {
  const [showModal, setShowModal] = useState(false);

  const openModal = (event) => {
    event.preventDefault();
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  // Function to check if media is a video
  const isVideo = (url) => {
    return url?.match(/\.(mp4|webm|ogg)$/i);
  };

  return (
    <div>
      <div
        className="h-52 md:h-72 rounded-t-xl relative group"
        onClick={openModal}
      >
        {isVideo(image_url) ? (
          <video
            src={image_url}
            className="h-full w-full rounded-t-xl object-cover"
            poster={image_url} // Show preview image before playing
            muted
            loop
            playsInline
            onMouseEnter={(e) => e.target.play()} // Play on hover (PC)
            onMouseLeave={(e) => e.target.pause()} // Pause when not hovering
            onFocus={(e) => e.target.play()} // Play on focus (Mobile)
            onBlur={(e) => e.target.pause()} // Pause when unfocused
            controls
            controlsList="nodownload" // Remove download option
            // disablePictureInPicture // Optional: Disable Picture-in-Picture mode
          />
        ) : (
          
          <img src={image_url} alt={title} className="h-full w-full rounded-t-xl" style={{
              
              backgroundSize: "cover",
            }}/>
        )}
        <div className={isVideo(image_url) ? ("overlay items-center justify-center absolute top-0 left-0 w-full h-full  bg-[#181818] bg-opacity-0 flex transition-all duration-500 group-hover:opacity-0 group-hover:hidden") : ("overlay items-center justify-center absolute top-0 left-0 w-full h-full bg-[#181818] bg-opacity-0 hidden group-hover:flex group-hover:bg-opacity-80 transition-all duration-500")}>
          <Link
            href={image_url}
            className="h-14 w-14 border-2 relative rounded-full border-[#ADB7BE] hover:border-white group/link"
            onClick={openModal}
          >
            {isVideo(image_url) ? (

              <PlayCircleIcon className="h-10 w-10 text-[#ADB7BE] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group-hover/link:text-white" />
            ) : (
              <EyeIcon className="h-10 w-10 text-[#ADB7BE] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group-hover/link:text-white" />
            )}
          </Link>
        </div>
      </div>
      <div className="text-white rounded-b-xl mt-3 bg-[#181818] py-6 px-4">
        <h5 className="text-xl font-semibold mb-2">{title}</h5>
      </div>

      {/* Modal */}
      {showModal && (
  <div className="fixed z-10 inset-0 overflow-y-auto">
    <div className="flex items-center justify-center min-h-screen">
      {/* Dark background */}
      <div className="fixed inset-0 bg-black opacity-50"></div>

      {/* Modal Content */}
      <div className="relative z-20 bg-white p-4 sm:p-6 md:p-8 rounded-xl w-[90vw] max-w-[800px] h-auto">
        {/* Close Button */}
        <button
          className="absolute top-2 right-2 text-black cursor-pointer border border-gray-300 rounded-full bg-white bg-opacity-80 p-2"
          onClick={closeModal}
        >
          X
        </button>

        {/* Media Box */}
        <div className="w-full h-[60vh] sm:h-[70vh] flex items-center justify-center">
          {isVideo(image_url) ? (
            <video
              src={image_url}
              controls
              className="max-w-full max-h-full bg-cover"
            />
          ) : (
            <img
              src={image_url}
              alt={title}
              className="w-full h-full bg-cover"
            />
          )}
        </div>
      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default ProjectCard;