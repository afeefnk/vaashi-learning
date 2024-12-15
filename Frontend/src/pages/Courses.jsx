import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../Utils/Config";
import CourseCard from "../components/Course Card/CourseCard";
import Footer2 from "../Footer2";

const Courses = () => {
  const [groupedCourses, setGroupedCourses] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [videoToRemove, setVideoToRemove] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/courses/getcoursevideos`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        const fetchedCourses = response.data;

        const grouped = fetchedCourses.reduce((acc, course) => {
          const { course: courseName, subject } = course;
          if (!acc[courseName]) acc[courseName] = {};
          if (!acc[courseName][subject]) acc[courseName][subject] = [];
          acc[courseName][subject].push(course);
          return acc;
        }, {});

        setGroupedCourses(grouped);
      } catch (error) {
        console.error("Error fetching courses:", error);
        setError("Failed to fetch courses. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  const handleRemoveVideo = async () => {
    try {
      await axios.delete(`${BASE_URL}/api/courses/${videoToRemove}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      setGroupedCourses((prevGroupedCourses) => {
        const updatedCourses = { ...prevGroupedCourses };

        Object.entries(updatedCourses).forEach(([courseName, subjects]) => {
          Object.entries(subjects).forEach(([subject, videos]) => {
            updatedCourses[courseName][subject] = videos.filter(
              (video) => video._id !== videoToRemove
            );
          });
        });

        return updatedCourses;
      });

      setShowModal(false); // Close the modal after removing the video
    } catch (error) {
      console.error("Error removing video:", error);
    }
  };

  const confirmRemove = (videoId) => {
    setVideoToRemove(videoId);
    setShowModal(true); // Show the modal
  };

  const closeModal = () => {
    setShowModal(false);
    setVideoToRemove(null); // Reset selected video
  };

  if (loading) {
    return <div className="text-center py-10 text-xl font-medium">Loading courses...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-600">{error}</div>;
  }

  return (
    <>
      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-bold text-center mb-8 text-gray-800">Available Course</h1>
        {Object.entries(groupedCourses).length === 0 ? (
          <div className="text-center text-gray-600">
            No courses are currently available. Please check back later.
          </div>
        ) : (
          Object.entries(groupedCourses).map(([courseName, subjects]) => (
            <div key={courseName} className="mb-12">
              <h2 className="text-2xl font-semibold mb-6 text-indigo-800">{courseName}</h2>
              {Object.entries(subjects).map(([subject, courses]) => (
                <div key={subject} className="mb-10">
                  <h3 className="text-xl font-bold mb-4 text-gray-700">{subject}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {courses.map((course) => (
                      <CourseCard
                        key={course._id}
                        course={course}
                        onRemove={() => confirmRemove(course._id)}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ))
        )}
      </div>

      <Footer2 />

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96 text-center">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">
              Are you sure you want to remove this video?
            </h3>
            <div className="flex justify-between gap-4">
              <button
                onClick={closeModal}
                className="w-full py-2 px-4 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 duration-200"
              >
                No
              </button>
              <button
                onClick={handleRemoveVideo}
                className="w-full py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600 duration-200"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Courses;
