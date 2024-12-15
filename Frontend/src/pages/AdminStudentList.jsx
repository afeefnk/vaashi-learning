import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../Utils/Config";

const AdminStudentList = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/courses/students`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Use the admin token
          },
        });

        setStudents(response.data); // Set students data in state
      } catch (error) {
        setError("Error fetching student data.");
        console.error("Error fetching students:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  const downloadCSV = () => {
    const csvHeader = "Name,Email,Class\n";
    const csvRows = students
      .map(student => `${student.username},${student.email},${student.course}`)
      .join("\n");
    const csvContent = csvHeader + csvRows;

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "Students List.csv";
    link.click();

    URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="text-primary text-lg font-medium">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md shadow-md">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 bg-white min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h2 className="sm:text-3xl font-bold sm:text-start">Registered Student List</h2>
        <button
          onClick={downloadCSV}
          className="bg-blue-500 text-white px-4 py-2 rounded-md duration-200 hover:bg-blue-600"
        >
          Download CSV
        </button>
      </div>
      <div className="overflow-x-auto border rounded-md">
        <table className="table-auto w-full bg-white rounded-lg">
          <thead>
            <tr className="bg-gray-300 text-black">
              <th className="px-4 py-3 text-sm font-medium uppercase text-left">Name</th>
              <th className="px-4 py-3 text-sm font-medium uppercase text-left">Email</th>
              <th className="px-4 py-3 text-sm font-medium uppercase text-left">Class</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr
                key={student._id}
                className='border-t hover:bg-gray-100 cursor-pointer'
              >
                <td className="px-4 py-4 text-sm text-gray-700 capitalize">{student.username}</td>
                <td className="px-4 py-4 text-sm text-gray-700">{student.email}</td>
                <td className="px-4 py-4 text-sm text-gray-700">{student.course}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminStudentList;
