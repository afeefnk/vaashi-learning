import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../Utils/Config"
import Footer2 from "../Footer2";
import CourseCard2 from "../components/Course Card/CourseCard2";

const Course2 = () => {
  const [groupedCourses, setGroupedCourses] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (loading) {
    return <div className="text-center py-10 text-xl font-medium">Loading courses...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-600">{error}</div>;
  }

  return (
    <>
      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-bold text-center mb-8 text-gray-800">Available Courses</h1>
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
                      <CourseCard2
                        key={course._id}
                        course={course}
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
    </>
  );
};

export default Course2;
