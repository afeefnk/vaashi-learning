import React, { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import icons
import axios from "axios";
import { BASE_URL } from "../../Utils/Config"
import { useNavigate } from "react-router-dom"; // Import useNavigate
import sideimg from "../../assets/sideimg.png";

export default function Login() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${BASE_URL}/api/auth/login`,
        formData
      );

      // Show a success toast
      toast.success("Login successful!");

      const { token, role } = response.data;

      // Store token in local storage or state (if needed)
      localStorage.setItem("token", token);

      // Navigate based on role
      setTimeout(() => {
        if (role === "admin") {
          navigate("/admin/courses"); // Redirect to Admin page
        } else if (role === "student") {
          navigate("/user/home"); // Redirect to Student page
        } else {
          toast.error("Role not recognized!");
        }
      }, 2000); // 2-second delay
    } catch (error) {
      // Show an error toast
      toast.error(
        error.response?.data?.message || "Login failed. Please try again!"
      );
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible((prevState) => !prevState);
  };

  return (
    <section className="min-h-screen flex items-center justify-center px-4 md:px-20 lg:px-40">
      {/* Hot Toast container */}
      <Toaster position="top-center" reverseOrder={false} />

      <div className="flex flex-col md:flex-row md:justify-center items-center w-full md:w-10/12 lg:w-8/12">
        {/* Left column container with background */}
        <div className="w-1/2 md:w-1/2 mb-6 md:mb-0 flex justify-center">
          <img
            src={sideimg}
            className="w-full max-w-xs md:max-w-full"
            alt="Sample"
          />
        </div>

        {/* Right column container */}
        <div className="w-full md:w-1/2">
          <form onSubmit={handleSubmit}>
            {/* Sign in section */}
            <div className="flex items-center justify-center md:justify-start mb-6">
              <p className="text-2xl text-center md:text-left">
                Welcome back - <span className="font-bodoni">VAASHI</span>
              </p>
            </div>

            {/* Username input */}
            <div className="mb-6">
              <label htmlFor="email" className="block text-sm font-medium">
                Username
              </label>
              <input
                type="text"
                className="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500"
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
              />
            </div>

            {/* Password input */}
            <div className="mb-6 relative">
              <label htmlFor="password" className="block text-sm font-medium">
                Password
              </label>
              <input
                type={passwordVisible ? "text" : "password"}
                className="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500"
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
              {/* Password visibility toggle */}
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 pt-4"
              >
                {passwordVisible ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            {/* Login button */}
            <div className="text-center md:text-left">
              <button
                type="submit"
                className="w-1/3 py-2 rounded bg-blue-600 text-white font-medium hover:bg-blue-700 focus:outline-none transition"
              >
                Sign In
              </button>

              {/* Separator */}
              <div className="my-4 flex items-center">
                <div className="flex-1 border-t border-neutral-300"></div>
                <p className="mx-4 text-center font-semibold">Or</p>
                <div className="flex-1 border-t border-neutral-300"></div>
              </div>

              {/* Register link */}
              <p className="mt-4 text-sm">
                Don't have an account?{" "}
                <a href="/register" className="text-blue-600 hover:underline">
                  Sign Up
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
}
