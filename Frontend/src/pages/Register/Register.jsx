import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import { BASE_URL } from "../../Utils/Config"
import { useNavigate } from "react-router-dom";
import sideimg from "../../assets/sideimg.png";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    course: "",
  });
  const [passwordMismatch, setPasswordMismatch] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPasswordMismatch(false);

    // Directly compare the password and confirmPassword before submission
    const confirmPassword = formData.confirmPassword;
    if (formData.password !== confirmPassword) {
      setPasswordMismatch(true);
      toast.error("Passwords do not match!");
      return;
    }

    try {
      await axios.post(`${BASE_URL}/api/auth/register`, formData);
      toast.success("Successfully Registered!");
      setFormData({ email: "", username: "", password: "", course: "" });
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      if (error.response && error.response.status === 409) {
        toast.error("Username already exists. Please choose another.");
      } else {
        toast.error("Registration failed!");
      }
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center px-4 md:px-20 lg:px-40">
      <div className="flex flex-col md:flex-row md:justify-center items-center w-full md:w-10/12 lg:w-8/12">
        <div className="w-1/2 md:w-1/2 mb-2 md:mb-0 flex justify-center">
          <img
            src={sideimg}
            className="w-full max-w-xs md:max-w-full"
            alt="Sample"
          />
        </div>
        <div className="w-full md:w-1/2">
          <form onSubmit={handleSubmit}>
            <div className="flex items-center justify-center md:justify-start mb-6">
              <p className="text-2xl text-center md:text-left">
                Join with us - <span className="font-bodoni">VAASHI</span>
              </p>
            </div>

            <div className="mb-6">
              <label htmlFor="email" className="block text-sm font-medium">Email</label>
              <input
                type="email"
                className="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            <div className="mb-6">
              <label htmlFor="username" className="block text-sm font-medium">Username</label>
              <input
                type="text"
                className="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              />
            </div>

            <div className="mb-6 relative">
              <label htmlFor="password" className="block text-sm font-medium">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500 pr-10"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <div
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer text-gray-500"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </div>
              </div>
            </div>

            <div className="mb-6 relative">
              <label htmlFor="confirmPassword" className="block text-sm font-medium">Confirm Password</label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  className="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500 pr-10"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                />
                <div
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer text-gray-500"
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </div>
              </div>
            </div>

            <div className="mb-6">
              <label htmlFor="course" className="block text-sm font-medium">Select Class</label>
              <select
                className="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500"
                value={formData.course}
                onChange={(e) => setFormData({ ...formData, course: e.target.value })}
              >
                <option value="">Select Your Class</option>
                <option value="10th">10th</option>
                <option value="11th Science">11th Science</option>
                <option value="11th Commerce">11th Commerce</option>
                <option value="11th Humanities">11th Humanities</option>
                <option value="12th Science">12th Science</option>
                <option value="12th Commerce">12th Commerce</option>
                <option value="12th Humanities">12th Humanities</option>
              </select>
            </div>

            <div className="text-center">
              <button type="submit" className="w-1/3 px-4 py-2 font-semibold bg-blue-600 text-white rounded hover:bg-blue-700">Sign Up</button>

              <div className="my-3 flex items-center">
                <div className="flex-1 border-t border-neutral-300"></div>
                <p className="mx-4 text-center font-semibold">Or</p>
                <div className="flex-1 border-t border-neutral-300"></div>
              </div>

              <p className=" text-sm">
                Already have an account?{" "}
                <a href="/login" className="text-blue-600 hover:underline">
                  Sign In
                </a>
              </p>
              <a href="/" className="text-blue-600 hover:underline text-sm">
                Home
              </a>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Register;
