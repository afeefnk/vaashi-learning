import React, { useState } from "react";
import ReactPlayer from "react-player";
import { FiMoreVertical } from "react-icons/fi";

const CourseCard = ({ course, onRemove }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  return (
    <div className="border rounded-lg shadow p-4 relative">
      {/* Video Player */}
      <div className="mt-4">
        <ReactPlayer url={course.videoUrl} controls width="100%" height="200px" />
      </div>

      {/* Course Title and Description */}
      <h3 className="text-lg font-bold mt-2">{course.title}</h3>
      <p className="text-gray-700">{course.description}</p>

      {/* Options Dropdown Trigger */}
      <div className="absolute top-2 right-2">
        <button
          onClick={toggleDropdown}
          className="p-2 rounded-full hover:bg-gray-200"
        >
          <FiMoreVertical size={20} />
        </button>

        {/* Dropdown Menu */}
        {showDropdown && (
          <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md z-10">
            <button
              onClick={onRemove}
              className="block w-full px-4 py-2 text-left text-red-600 hover:bg-gray-100"
          >
              Remove Video
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseCard;
