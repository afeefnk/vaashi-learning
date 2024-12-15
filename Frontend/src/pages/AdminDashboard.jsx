import { useState } from "react";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast"; // Import react-hot-toast
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../Utils/Config"

const AdminDashboard = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    videoUrl: "",
    course: "",
    subject: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${BASE_URL}/api/courses/addcourse`,
        formData,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      toast.success("Course added successfully!"); // Show success toast
      setTimeout(() => {
        navigate("/admin/courses");
      }, 2000);
    } catch (error) {
      toast.error("Failed to add course!"); // Show error toast
      console.error("Error adding course:", error);
    }
  };

  return (
    <div className="flex justify-center h-screen bg-gray-100">
      <Toaster position="top-center" />
      <div className="container mx-auto p-4 sm:p-6 md:p-8 text-center bg-white rounded">
        <h2 className="text-2xl font-bold mb-4">Add Course</h2>
        <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-2xl mx-auto">
          <input
            type="text"
            placeholder="Course Title"
            className="border w-full p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            required
          />
          <textarea
            placeholder="Course Description"
            className="border w-full p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            required
          ></textarea>
          <input
            type="text"
            placeholder="Video URL"
            className="border w-full p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
            onChange={(e) =>
              setFormData({ ...formData, videoUrl: e.target.value })
            }
            required
          />

          <select
            className="border w-full p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
            onChange={(e) =>
              setFormData({ ...formData, course: e.target.value })
            }
            required
          >
            <option value="">Select Course</option>
            <option value="10th">10th</option>
            <option value="11th Science">11th Science</option>
            <option value="11th Commerce">11th Commerce</option>
            <option value="11th Humanities">11th Humanities</option>
            <option value="12th Science">12th Science</option>
            <option value="12th Commerce">12th Commerce</option>
            <option value="12th Humanities">12th Humanities</option>
          </select>

          <select
            className="border w-full p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
            onChange={(e) =>
              setFormData({ ...formData, subject: e.target.value })
            }
            required
          >
            <option value="">Select Subject</option>
            {formData.course === "12th Science" && (
              <>
                <option value="Maths">Maths</option>
                <option value="Physics">Physics</option>
                <option value="Chemistry">Chemistry</option>
                <option value="Biology">Biology</option>
                <option value="Computer Science">Computer Science</option>
              </>
            )}
            {formData.course === "12th Commerce" && (
              <>
                <option value="Accountancy">Accountancy</option>
                <option value="Business Studies">Business Studies</option>
                <option value="Economics">Economics</option>
              </>
            )}
            {formData.course === "12th Humanities" && (
              <>
                <option value="Geography">Geography</option>
                <option value="History">History</option>
                <option value="Political Science">Political Science</option>
                <option value="Sociology">Sociology</option>
              </>
            )}
            {formData.course === "10th" && (
              <>
                <option value="Maths">Maths</option>
                <option value="Biology">Biology</option>
                <option value="Chemistry">Chemistry</option>
                <option value="Physics">Physics</option>
              </>
            )}
            {formData.course === "11th Science" && (
              <>
                <option value="Maths">Maths</option>
                <option value="Physics">Physics</option>
                <option value="Chemistry">Chemistry</option>
                <option value="Biology">Biology</option>
              </>
            )}
            {formData.course === "11th Commerce" && (
              <>
                <option value="Accountancy">Accountancy</option>
                <option value="Business Studies">Business Studies</option>
                <option value="Economics">Economics</option>
              </>
            )}
            {formData.course === "11th Humanities" && (
              <>
                <option value="Geography">Geography</option>
                <option value="History">History</option>
                <option value="Political Science">Political Science</option>
                <option value="Sociology">Sociology</option>
              </>
            )}
          </select>

          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            Add Course
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminDashboard;
