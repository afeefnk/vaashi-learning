import React from "react";
import ReactPlayer from "react-player";

const CourseCard2 = ({ course }) => {


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
     
    </div>
  );
};

export default CourseCard2;
